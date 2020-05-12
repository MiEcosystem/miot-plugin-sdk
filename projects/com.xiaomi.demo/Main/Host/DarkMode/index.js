import React, { useState } from "react";
import { View, Text, Image, Button } from 'react-native';
// import { useDarkMode, useDarkModeContext, DynamicValue, useDynamicValue, DynamicStyleSheet, useDynamicStyleSheet, DarkModeProvider, eventEmitter as DarkModeEventEmitter } from "react-native-dark-mode";
// import Extra from './Extra';

export default class DarkModeDemo extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {
  // }
	
  // render() {
  //   return <DarkModeFunctionCompont/>;
  // }
}

// // 监听系统是否更改了“深色模式”开关
// // 变更为浅色，newMode:light
// // 变更为深色，newMode：dark
// DarkModeEventEmitter.on('currentModeChanged', (newMode) => console.log(`收到通知，当前颜色模式：${ newMode }`));

// function DarkModeFunctionCompont() {

//   // useDarkModeContext(): 查询系统当前颜色模式，返回对应模式的字符串
//   // light:浅色 
//   // dark:深色
//   const mode = useDarkModeContext();
//   console.log(`current mode: ${ mode }`);

//   // useDarkMode(): 查询系统是否开启了“深色模式”
//   // false:当前是浅色模式 
//   // true:当前是深色模式
//   const isDarkMode = useDarkMode();
//   console.log(`useDarkMode: ${ isDarkMode ? "true" : "false" }`);
	
//   const styles = useDynamicStyleSheet(dynamicStyles);
//   const logo = useDynamicValue(require('./logoLight.png'), require('./logoDark.png'));

//   return (
//     <View style={styles.container}>
//       <Image source={require('./meme.png')} style={styles.meme} />

//       <Image source={logo} style={styles.image} />

//       <Text style={styles.initialStyle}>Current mode: {mode}</Text>

//       {/* will be rendered using current theme */}
//       <MyComponent />

//       {/* will be rendered using light theme */}
//       <DarkModeProvider mode="dark">
//         <Extra />
//       </DarkModeProvider>

//       {/* will be rendered using light theme */}
//       <DarkModeProvider mode="light">
//         <Extra />
//       </DarkModeProvider>

//       <Counter />
//     </View>
//   );
// }

// function MyComponent() {
//   const myStyles = useDynamicStyleSheet(dynamicStyles2);
//   return (
//     <View style={myStyles.container}>
//       <Text style={myStyles.text}>Rendered by using current theme</Text>
//     </View>
//   );
// }

// // 简单的计数按钮
// function Counter() {
//   const [counter, setCounter] = useState(0);
//   return <Button title={counter.toString()} onPress={() => setCounter((i) => i + 1)} />;
// }

// const dynamicStyles = new DynamicStyleSheet({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: new DynamicValue('#FFFFFF', '#000000')
//   },
//   initialStyle: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     color: new DynamicValue('#000000', '#FFFFFF')
//   },
//   image: {
//     borderWidth: 1,
//     borderColor: new DynamicValue('#000000', '#FFFFFF'),
//     width: 80,
//     height: 80
//   },
//   meme: {
//     width: '100%',
//     height: 200,
//     marginBottom: 20
//   },
//   text: {
//     textAlign: 'center',
//     color: new DynamicValue('black', 'white')
//   }
// });


// const dynamicStyles2 = new DynamicStyleSheet({
//   container: {
//     borderColor: 'red',
//     borderWidth: 1,
//     backgroundColor: new DynamicValue('white', 'black'),
//     width: 150,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   text: {
//     textAlign: 'center',
//     color: new DynamicValue('black', 'white')
//   }
// });
