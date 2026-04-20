import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native';
import { dynamicColor } from "../../../Style/DynamicColor";
import { Fonts } from 'miot/ui/hyperOSUI';
import { Styles } from "../../../../resources";
interface SimpleButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}
const SimpleButton: React.FC<SimpleButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        buttonStyle
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, disabled && styles.disabledText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: 336,
    height: 50,
    backgroundColor: dynamicColor("#0CCE94", '#00BA7C'),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  disabledButton: {
    backgroundColor: '#CCCCCC'
  },
  text: {
    ...Fonts.fontSystem17Medium,
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#666666'
  }
});
export default SimpleButton;