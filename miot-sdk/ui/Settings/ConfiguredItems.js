import React, { Fragment, useState, useEffect } from 'react';
import SpecItem from './SpecItem';
import { DialogComponent } from '../../utils/dialog-manager';
import getCustomSettings from '../../utils/get-custom-settings';
const DialogCustomKey = 'Settings.FeatureSettings.ConfiguredItems';
export default function ConfiguredItems() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getCustomSettings().then((settings) => {
      const parsedSettings = JSON.parse(
        JSON.stringify(settings || [])
          .replace(/\"item_name\"/g, '"title"')
          .replace(/\"parent_note\"/g, '"subtitle"')
          .replace(/\"children_notes\"/g, '"selectorSubtitles"')
          .replace(/\"children_set\"/g, '"items"')
          .replace(/\"icon\"/g, '"image"')
      );
      setItems(parsedSettings);
    }).catch(() => {});
  }, []);
  return (
    <Fragment>
      {items.map((item, index) => {
        return (
          <SpecItem key={index} dialogCustomKey={DialogCustomKey} {...item} />
        );
      })}
      <DialogComponent customKey={DialogCustomKey} />
    </Fragment>
  );
}