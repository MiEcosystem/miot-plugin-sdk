import React from "react";

import {
  View,
  ScrollView
} from "react-native";

import { Package } from "miot";
import { ListItem } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';
import Logger from '../Logger';

export default class PackageDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      package: Package
    };
    Logger.trace(this);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Separator />
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            this.state.package && [
              ['pluginID', this.state.package.pluginID],
              ['packageID', this.state.package.packageID],
              ['version', this.state.package.version],
              ['packageName', this.state.package.packageName],
              ['apiLevel', this.state.package.apiLevel],
              ['buildType', this.state.package.buildType],
              ['models', this.state.package.models]
            ].map((item, index) => {
              return <ListItem
                key={index}
                title={item[0]}
                value={item[1]}
                hideArrow={true}
              />;
            })
          }
        </ScrollView>
      </View>
    );
  }
}