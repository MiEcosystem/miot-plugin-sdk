var MHGlobal = {}
var MHPluginSDK = require('NativeModules').MHPluginSDK;
MHGlobal.deviceName = MHPluginSDK.deviceName;
module.exports = MHGlobal
