import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  Dimensions,
  ImageBackground
} from 'react-native';
import { LibPagView } from './PanResponderDemo';
import {Host} from "miot";
import Device from 'miot/Device';
const did = Device.deviceID;
const MODES = ['gesturex', 'snapx', 'autox', 'gesturey', 'snapy', 'autoy'];
const SNAP_VALUES = [-1, -0.5, 0, 0.5, 1];
const findNearest = (val) => SNAP_VALUES.reduce((prev, curr) => Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);

/**
 * GesturePagView - 手势控制的 PAG 动画组件
 *
 * Props:
 *   source        - PAG 资源文件名
 *   maxAngleX     - X轴最大角度 (默认 40)
 *   maxAngleY     - Y轴最大角度 (默认 60)
 *   range         - 手势拖拽映射范围 (默认 150)
 *   autoDuration  - 自动动画单程时长 ms (默认 2000)
 *   fadeDuration  - PAG 淡入时长 ms (默认 1000)
 *   defaultModeX  - X轴初始模式 (默认 'gesturex')
 *   defaultModeY  - Y轴初始模式 (默认 null)
 *   showDebugInfo - 是否显示调试信息 (默认 false)
 *   style         - 容器样式
 *   onProgressChange - 进度回调 ({ progressX, progressY, angleX, angleY })
 */
export function GesturePagView({
  source,
  maxAngleX = 40,
  maxAngleY = 60,
  range = 150,
  autoDuration = 2000,
  fadeDuration = 1000,
  defaultModeX = 'gesturex',
  defaultModeY = null,
  showDebugInfo = false,
  style,
  onProgressChange,
  rotation = 0,
}) {
  const rotationRef = useRef(rotation);
  useEffect(() => { rotationRef.current = rotation; }, [rotation]);
  const [modeX, setModeX] = useState(defaultModeX);
  const [modeY, setModeY] = useState(defaultModeY);
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

  useEffect(() => {
    onProgressChange?.({
      progressX,
      progressY,
      angleX: progressX * maxAngleX,
      angleY: progressY * maxAngleY,
    });
  }, [progressX, progressY]);

  const autoAnimX = useRef(new Animated.Value(0)).current;
  const autoAnimY = useRef(new Animated.Value(0)).current;
  const autoDirectionX = useRef(1);
  const autoDirectionY = useRef(1);
  const baseProgressRefX = useRef(0);
  const baseProgressRefY = useRef(0);
  const [dotVisible, setDotVisible] = useState(false);

  const stopAutoAxis = useCallback((axis) => {
    (axis === 'x' ? autoAnimX : autoAnimY).stopAnimation();
  }, [autoAnimX, autoAnimY]);

  const snapToNearest = useCallback((axis) => {
    if (axis === 'x') {
      setProgressX(findNearest(progressRefX.current));
      autoDirectionX.current = undefined;
    } else {
      setProgressY(findNearest(progressRefY.current));
      autoDirectionY.current = undefined;
    }
  }, []);

  const startAuto = useCallback((axis) => {
    const animValue = axis === 'x' ? autoAnimX : autoAnimY;
    const setProgress = axis === 'x' ? setProgressX : setProgressY;
    const directionRef = axis === 'x' ? autoDirectionX : autoDirectionY;
    const progressRef = axis === 'x' ? progressRefX : progressRefY;

    animValue.stopAnimation();
    animValue.setValue(progressRef.current);

    if (directionRef.current === undefined) {
      directionRef.current = progressRef.current >= 0.5 ? 1 : -1;
    }

    const animate = (toValue) => {
      Animated.timing(animValue, {
        toValue,
        duration: autoDuration * Math.abs((toValue - progressRef.current) / 2),
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (!finished) return;
        const isAuto = axis === 'x' ? modeXRef.current === 'autox' : modeYRef.current === 'autoy';
        if (!isAuto) {
          snapToNearest(axis);
        } else {
          directionRef.current = toValue === 1 ? -1 : 1;
          animate(directionRef.current === 1 ? 1 : -1);
        }
      });
    };

    animate(directionRef.current === 1 ? 1 : -1);
    animValue.addListener(({ value }) => setProgress(value));
  }, [autoAnimX, autoAnimY, autoDuration, snapToNearest]);

  useEffect(() => {
    stopAutoAxis('x');
    if (modeX === 'autox') startAuto('x');
    if (modeX === 'snapx') snapToNearest('x');
    stopAutoAxis('y');
    if (modeY === 'autoy') startAuto('y');
    if (modeY === 'snapy') snapToNearest('y');
  }, [modeX, modeY, stopAutoAxis, startAuto, snapToNearest]);

  const isGestureActive = useCallback(() => {
    return [modeXRef.current, modeYRef.current].some((m) => m && (m.startsWith('gesture') || m.startsWith('snap')));
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isGestureActive(),
      onPanResponderGrant: () => {
        if (modeXRef.current?.startsWith('gesture') || modeXRef.current?.startsWith('snap')) stopAutoAxis('x');
        if (modeYRef.current?.startsWith('gesture') || modeYRef.current?.startsWith('snap')) stopAutoAxis('y');
        baseProgressRefX.current = progressRefX.current;
        baseProgressRefY.current = progressRefY.current;
        setDotVisible(true);
      },
      onPanResponderMove: (_, g) => {
        let deltaX, deltaY;
        const r = rotationRef.current;
        if (r === 90) {
          // 顺时针90°
          deltaX = g.dy / range;
          deltaY = -g.dx / range;
        } else if (r === -90) {
          // 逆时针90°
          deltaX = -g.dy / range;
          deltaY = g.dx / range;
        } else {
          deltaX = g.dx / range;
          deltaY = g.dy / range;
        }
        if (modeXRef.current === 'gesturex' || modeXRef.current === 'snapx') {
          setProgressX(Math.max(-1, Math.min(1, baseProgressRefX.current + deltaX)));
        }
        if (modeYRef.current === 'gesturey' || modeYRef.current === 'snapy') {
          setProgressY(Math.max(-1, Math.min(1, baseProgressRefY.current + deltaY)));
        }
      },
      onPanResponderRelease: () => {
        if (modeXRef.current === 'snapx') snapToNearest('x');
        if (modeYRef.current === 'snapy') snapToNearest('y');
        setDotVisible(false);
      },
    })
  ).current;

  const handlePress = (m) => {
    if (m.endsWith('x')) setModeX((prev) => (prev === m ? null : m));
    else setModeY((prev) => (prev === m ? null : m));
  };

  return (
    <View style={[styles.root, style]}>
      {/* 手势 + PAG 区域 */}
      <View
        style={styles.gestureContainer}
        {...(isGestureActive() ? panResponder.panHandlers : {})}
      >
        {dotVisible && (
          <Animated.View
            style={[styles.dot, {
              transform: [
                { translateX: progressX * range },
                { translateY: progressY * range },
              ],
            }]}
          />
        )}
        <View style={{ flex: 1, transform: [{ scale: 1 }] }}>
          <LibPagView
            did={did}
            source={source}
            style={{ width: '100%', height: '100%' }}
            progressX={progressX}
            angleX={maxAngleX}
            progressY={progressY}
            angleY={maxAngleY}
            fadeDuration={fadeDuration}
            pagWidth={340}
            pagHeight={280}
          />
        </View>
      </View>
      {/* 模式按钮 */}
      <View style={styles.buttonRow}>
        {MODES.map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.button, (m.endsWith('x') ? modeX : modeY) === m && styles.activeButton]}
            onPress={() => handlePress(m)}
          >
            <Text style={styles.buttonText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ---- 页面组件 ----
export default function CabinetAirConditioner() {
  const [isCold, setIsCold] = useState(true);
  const pagSource = isCold ? '挂机空调风VFX_制冷.pag' : '挂机空调风VFX_制热.pag';
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const offsetX = screenWidth * 0.25;
  const offsetY = screenHeight * 0.115;
  return (
    <ImageBackground
      source={require('../../../../Resources/Images/Cabinet.png')}
      style={{flex:1}}
      imageStyle={{transform:[{scale:0.7}]}}
      resizeMode="cover"
    >
      {/* 冷暖切换按钮 */}
      <TouchableOpacity
        style={{position:'absolute', top:50, alignSelf:'center', zIndex:10, paddingVertical:10, paddingHorizontal:24, backgroundColor: isCold ? '#4a90e2' : '#e25c4a', borderRadius:20}}
        onPress={() => setIsCold(prev => !prev)}
      >
        <Text style={{color:'#fff', fontWeight:'700', fontSize:16}}>{isCold ? '制冷' : '制热'}</Text>
      </TouchableOpacity>
      {/* 左上 - 顺时针90° */}
      <View style={{position:'absolute', left:0, top:0, width:'100%', height:'50%', overflow:'hidden', transform:[{translateX: -offsetX},{translateY: offsetY},{rotate:'90deg'},{scale:0.5}]}}>
        <GesturePagView source={pagSource} rotation={90} />
      </View>
      {/* 左下 - 顺时针90° */}
      <View style={{position:'absolute', left:0, bottom:0, width:'100%', height:'50%', overflow:'hidden', transform:[{translateX: -offsetX},{translateY: -offsetY},{rotate:'90deg'},{scale:0.5}]}}>
        <GesturePagView source={pagSource} rotation={90} />
      </View>
      {/* 右上 - 逆时针90° */}
      <View style={{position:'absolute', right:0, top:0, width:'100%', height:'50%', overflow:'hidden', transform:[{translateX: offsetX},{translateY: offsetY},{rotate:'-90deg'},{scale:0.5}]}}>
        <GesturePagView source={pagSource} rotation={-90} />
      </View>
      {/* 右下 - 逆时针90° */}
      <View style={{position:'absolute', right:0, bottom:0, width:'100%', height:'50%', overflow:'hidden', transform:[{translateX: offsetX},{translateY: -offsetY},{rotate:'-90deg'},{scale:0.5}]}}>
        <GesturePagView source={pagSource} rotation={-90} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: { flex:1 },
  gestureContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 10,
  },
  dot: { position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: 'transparent', zIndex: 10 },
  info: { position: 'absolute', top: 10, left: 10, backgroundColor: 'transparent', padding: 6, borderRadius: 6, zIndex: 5 },
  buttonRow: { flexDirection: 'row', justifyContent: 'center', padding: 8, flexWrap: 'wrap' },
  button: { paddingVertical: 8, paddingHorizontal: 14, backgroundColor: '#888', borderRadius: 8, margin: 4 },
  activeButton: { backgroundColor: '#4a90e2' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
