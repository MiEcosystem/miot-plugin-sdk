/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


import { TitleBar } from 'miot/ui';
import React from 'react';
import { createStackNavigator } from 'react-navigation'; //
import { Package } from 'miot';
import Guide from './Guide';
import NormalBle from './NormalBle';
import StandardAuthBle from './XiaomiStandardAuthBle';
import SecurityChipBle from './XiaomiSecurityChipBle';
import MeshBle from './MeshBle';
import ClassicBle from './ClassicBle';
import BluetoothApiUnitCaseDemo from './BluetoothApiUnitCaseDemo';

const RootStack = createStackNavigator(
  {
    standardAuth: StandardAuthBle,
    securityChip: SecurityChipBle,
    normalble: NormalBle,
    meshble:MeshBle,
    classicBle:ClassicBle,
    BluetoothApiUnitCaseDemo:BluetoothApiUnitCaseDemo,
    guide: {
      screen: Guide,
      navigationOptions: ({ navigation }) => ({
        header: <TitleBar
          title="蓝牙Demo"
          onPressLeft={() => {
            Package.exit();
          }}
        />
      })
    }
  },
  {
    // ThirdPartyDemo
    initialRouteName: 'guide',
    navigationOptions: ({ navigation }) => ({
      header: <TitleBar
        title={navigation.state.params ? navigation.state.params.title : ''}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
    })
  }
);
export default class App extends React.Component {

  render() {
    return <RootStack />;
  }

}
