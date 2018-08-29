# MIOT SDK 
A MIOT SDK for react-native plugin program of ios and android

## Usage


### Example
```js
import React from 'react'
import {StyleSheet, Text, View, Image} from "react-native";
import {Package, Device, Service, Host...} from 'miot'

class App extends React.Component{
    render(){
        return <View>
            <Text>device model is : {Device.model}</Text>
        </View>
    }
}

Package.entry(App)

```
 