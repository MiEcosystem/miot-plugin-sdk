const fs = require('fs');
const path = require('path');
const { project_dir } = require('../../config/common');

const files = new Map([['node_modules/react-native/flag/flag.flag', 'flag']]);

files.set('node_modules/react-native/Libraries/react-native/react-native-implementation.js', 'reactNativeImplementation');

files.set('node_modules/react-native/Libraries/Geolocation/Geolocation.js', 'Geolocation');

files.set('node_modules/react-native/Libraries/Utilities/BackAndroid.js', 'BackAndroid');

files.set('node_modules/react-native/Libraries/Experimental/SwipeableRow/SwipeableFlatList.js', 'SwipeableFlatList');

files.set('node_modules/react-native/Libraries/Experimental/SwipeableRow/SwipeableRow.js', 'SwipeableRow');

files.set('node_modules/react-native/Libraries/Alert/AlertIOS.js', 'AlertIOS');

function action(filesForAdd) {
  const _files = Array.from(filesForAdd);

  // check flag
  if (fs.existsSync(path.join(project_dir, _files[0][0]))) {
    return;
  }
  _files.forEach(([key, value]) => {
    const directoryPath = key.split('/').slice(0, -1);
    if (!fs.existsSync(path.join(project_dir, ...directoryPath))) {
      // directoryPath not exist
      fs.mkdirSync(path.join(project_dir, ...directoryPath));
    }

    const context = fs.readFileSync(path.join(__dirname, value));
    fs.writeFileSync(path.join(project_dir, key), context);
  });
}

function AppendFilesToReactNativeSync() {
  action(files);
}

module.exports = {
  AppendFilesToReactNativeSync
};