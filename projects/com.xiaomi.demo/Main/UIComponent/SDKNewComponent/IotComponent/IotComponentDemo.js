'use strict';

import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { dynamicStyleSheet } from 'miot/ui';
import { colorToken, ListCard, ListItem } from 'miot/ui/hyperOSUI';

const IotComponentDemo = ({ navigation }) => {
  const navigateToScreen = useCallback((routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  }, [navigation]);

  const commonItems = [
    { title: 'CardHeader', router: 'TitleContainerDemo' },
    { title: 'LargeListEntrance', router: 'LargeEntranceDemo' },
    { title: 'SmallGridEntrance', router: 'SmallEntranceDemo' },
    { title: 'LargeListToggle', router: 'LargeVariantSwitchDemo' },
    { title: 'MediumListToggle', router: 'MiddleVariantSwitchDemo' },
    { title: 'SmallGridToggle', router: 'SmallVariantSwitchDemo' },
    { title: 'CircularButton', router: 'CircularButtonConfigDemo' },
    { title: 'ParamStepper', router: 'StepperDemo' },
    { title: 'Slider', router: 'IotSliderDemo' },
    { title: 'SliderWithToggle', router: 'IotSliderWithToggleDemo' },
    // { title: 'ActionBlock', router: 'ActionBlockDemo' },
    // { title: 'LargeTriggerSelect', router: 'FlatSelectDemo' },
  ];

  const layoutItems = [
    { title: 'CardContainer', router: 'CardContainerDemo' },
    { title: 'ContainerWithGap', router: 'GroupContainerDemo' },
    { title: 'SmallGridContainer', router: 'SmallGridContainerDemo' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ListCard title="常规组件">
        {commonItems.map((item) => (
          <ListItem key={item.router} title={item.title} onPress={() => navigateToScreen(item.router, item.title)} />
        ))}
      </ListCard>
      <ListCard title="容器组件">
        {layoutItems.map((item) => (
          <ListItem key={item.router} title={item.title} onPress={() => navigateToScreen(item.router, item.title)} />
        ))}
      </ListCard>
    </ScrollView>
  );
};

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: colorToken.surfacePageLow,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 28,
  },
});

export default IotComponentDemo;
