import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  Text,
  requireNativeComponent,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  Image
} from 'react-native';

const LibPagView = requireNativeComponent('LibPagView');

export default function GestureArea() {
  const MAX_ANGLEX = 40;
  const MAX_ANGLEY = 60;
  const RANGE = 150;
  const AUTO_DURATION = 2000;

  const [modeX, setModeX] = useState('gesturex');
  const [modeY, setModeY] = useState(null);
  const modeXRef = useRef(modeX);
  const modeYRef = useRef(modeY);
  useEffect(() => { modeXRef.current = modeX; }, [modeX]);
  useEffect(() => { modeYRef.current = modeY; }, [modeY]);

  const [progressX, setProgressX] = useState(0);
  const [progressY, setProgressY] = useState(0);
  const progressRefX = useRef(0);
  const progressRefY = useRef(0);
  useEffect(() => { progressRefX.current = progressX; }, [progressX]);
  useEffect(() => { progressRefY.current = progressY; }, [progressY]);

  const autoAnimX = useRef(new Animated.Value(progressX)).current;
  const autoAnimY = useRef(new Animated.Value(progressY)).current;

  // 记录自动动画的方向：1表示向正方向（1），-1表示向负方向（-1）
  const autoDirectionX = useRef(1);
  const autoDirectionY = useRef(1);

  const baseProgressRefX = useRef(0);
  const baseProgressRefY = useRef(0);
  const [visible, setVisible] = useState(false);

  const [climateMode, setClimateMode] = useState('cool');
  const [airconditionerState, setAirconditionerState] = useState('close');
  const pagSource = climateMode === 'cool' ? 'airConditioner.pag' : 'airConditionerHot.pag';

  const startAuto = (axis) => {
    const animValue = axis === 'x' ? autoAnimX : autoAnimY;
    const setProgress = axis === 'x' ? setProgressX : setProgressY;
    const directionRef = axis === 'x' ? autoDirectionX : autoDirectionY;

    animValue.stopAnimation();
    const currentValue = axis === 'x' ? progressRefX.current : progressRefY.current;
    animValue.setValue(currentValue);

    // 根据当前值确定方向：如果当前值 >= 0.5，向1动画；如果当前值 < 0.5，向-1动画
    // 但如果是从暂停恢复，使用之前记录的方向
    if (directionRef.current === undefined) {
      directionRef.current = currentValue >= 0.5 ? 1 : -1;
    }

    const animate = (toValue) => {
      const startValue = axis === 'x' ? progressRefX.current : progressRefY.current;
      Animated.timing(animValue, {
        toValue,
        duration: AUTO_DURATION * Math.abs((toValue - startValue) / 2),
        easing: Easing.linear,
        useNativeDriver: false
      }).start(({ finished }) => {
        if (finished) {
          const isAuto = axis === 'x' ? modeXRef.current === 'autox' : modeYRef.current === 'autoy';
          if (!isAuto) snapToNearest(axis);
          else {
            // 到达终点后，更新方向并继续向相反方向动画
            directionRef.current = toValue === 1 ? -1 : 1;
            animate(directionRef.current === 1 ? 1 : -1);
          }
        }
      });
    };

    // 从当前值开始，向记录的方向动画
    animate(directionRef.current === 1 ? 1 : -1);
    animValue.addListener(({ value }) => setProgress(value));
  };

  const stopAutoAxis = (axis) => {
    if (axis === 'x') {
      autoAnimX.stopAnimation();
      // 暂停时保留当前方向，不清除
    }
    if (axis === 'y') {
      autoAnimY.stopAnimation();
      // 暂停时保留当前方向，不清除
    }
  };

  const snapToNearest = (axis) => {
    const snapValues = [-1, -0.5, 0, 0.5, 1];
    const findNearest = (val) => snapValues.reduce((prev, curr) => Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
    if (axis === 'x') {
      setProgressX(findNearest(progressRefX.current));
      // 吸附时重置方向，下次启动时重新判断
      autoDirectionX.current = undefined;
    }
    if (axis === 'y') {
      setProgressY(findNearest(progressRefY.current));
      // 吸附时重置方向，下次启动时重新判断
      autoDirectionY.current = undefined;
    }
  };

  useEffect(() => {
    stopAutoAxis('x'); if (modeX === 'autox' && airconditionerState === 'open') startAuto('x'); if (modeX === 'snapx') snapToNearest('x');
    stopAutoAxis('y'); if (modeY === 'autoy' && airconditionerState === 'open') startAuto('y'); if (modeY === 'snapy') snapToNearest('y');
  }, [modeX, modeY, airconditionerState]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => [modeXRef.current, modeYRef.current].some((m) => m && (m.startsWith('gesture') || m.startsWith('snap'))),
      onPanResponderGrant: () => {
        if (modeXRef.current?.startsWith('gesture') || modeXRef.current?.startsWith('snap')) stopAutoAxis('x');
        if (modeYRef.current?.startsWith('gesture') || modeYRef.current?.startsWith('snap')) stopAutoAxis('y');
        baseProgressRefX.current = progressRefX.current;
        baseProgressRefY.current = progressRefY.current;
        setVisible(true);
      },
      onPanResponderMove: (_, g) => {
        const deltaX = g.dx / RANGE;
        const deltaY = g.dy / RANGE;
        if (modeXRef.current === 'gesturex' || modeXRef.current === 'snapx') {
          let newX = baseProgressRefX.current + deltaX;
          newX = Math.max(-1, Math.min(1, newX));
          setProgressX(newX);
        }
        if (modeYRef.current === 'gesturey' || modeYRef.current === 'snapy') {
          let newY = baseProgressRefY.current + deltaY;
          newY = Math.max(-1, Math.min(1, newY));
          setProgressY(newY);
        }
      },
      onPanResponderRelease: () => {
        if (modeXRef.current === 'snapx') snapToNearest('x');
        if (modeYRef.current === 'snapy') snapToNearest('y');
        setVisible(false);
      }
    })
  ).current;

  const angleX = progressX * MAX_ANGLEX;
  const angleY = progressY * MAX_ANGLEY;

  const handlePress = (m) => {
    if (m.endsWith('x')) setModeX((prev) => prev === m ? null : m);
    else setModeY((prev) => prev === m ? null : m);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* 模式按钮 */}
      <View style={styles.buttonRow}>
        {['gesturex', 'snapx', 'autox', 'gesturey', 'snapy', 'autoy'].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.button, (m.endsWith('x') ? modeX : modeY) === m && styles.activeButton]}
            onPress={() => handlePress(m)}
          >
            <Text style={styles.buttonText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* 制冷制热 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, climateMode === 'cool' && styles.activeButton]} onPress={() => setClimateMode('cool')}>
          <Text style={styles.buttonText}>制冷</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, climateMode === 'heat' && styles.activeButton]} onPress={() => setClimateMode('heat')}>
          <Text style={styles.buttonText}>制热</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setAirconditionerState((prev) =>
              prev === 'close' ? 'open' : 'close'
            )
          }
        >
          <Text style={styles.buttonText}>
            {airconditionerState === 'close' ? '打开' : '关闭'}
          </Text>
        </TouchableOpacity>
      </View>
      <Image style={{
        width: '80%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center'
      }} resizeMode="contain" source={airconditionerState === 'close' ? require('miot-workspace/projects/com.xiaomi.demo/Resources/Images/AirConditionerClose.png') : require('miot-workspace/projects/com.xiaomi.demo/Resources/Images/AirConditionerOpen.png')} />
      {/* 手势区域 - 关闭时隐藏但保留progress值 */}
      {airconditionerState === 'open' && (
        <View style={{ position: 'absolute', top: 295, left: 0, bottom: 0, right: 0 }}>
          <View style={styles.container} {...[modeX, modeY].some((m) => m && (m.startsWith('gesture') || m.startsWith('snap'))) ? panResponder.panHandlers : {}}>
            {/* 红点跟随手 */}
            {visible && (
              <Animated.View
                style={[styles.dot, {
                  transform: [
                    { translateX: progressX * RANGE },
                    { translateY: progressY * RANGE }
                  ]
                }]}
              />
            )}

            <View style={styles.info}>
              <Text>modeX: {modeX || 'none'}</Text>
              <Text>progressX: {progressX.toFixed(2)}</Text>
              <Text>angleX: {angleX.toFixed(1)}°</Text>
              <Text>modeY: {modeY || 'none'}</Text>
              <Text>progressY: {progressY.toFixed(2)}</Text>
              <Text>angleY: {angleY.toFixed(1)}°</Text>
              <Text>climate: {climateMode}</Text>
            </View>

            <LibPagView
              source={pagSource}
              style={{ width: '100%', height: '100%' }}
              progressX={progressX}
              angleX={MAX_ANGLEX}
              progressY={progressY}
              angleY={MAX_ANGLEY}
              fadeDuration={1000}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 300, backgroundColor: 'transparent', borderRadius: 12, overflow: 'hidden', margin: 10 },
  dot: { position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: 'transparent', zIndex: 10 },
  info: { position: 'absolute', top: 10, left: 10, backgroundColor: 'transparent', padding: 6, borderRadius: 6 },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', padding: 8, flexWrap: 'wrap' },
  button: { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#888', borderRadius: 8, margin: 4 },
  activeButton: { backgroundColor: '#4a90e2' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
