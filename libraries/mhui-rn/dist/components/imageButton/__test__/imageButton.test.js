
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageButton from '../ImageButton';

configure({ adapter: new Adapter() });

describe('ImageButton', () => {
  describe('render', () => {
    it('render ImageButton', () => {
      const tree = renderer.create(
        <ImageButton
          style={{ width: 30, height: 30 }}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Interaction', () => {
    describe('onPress', () => {
      it('should call buttonPressIn', () => {
        const mockOnPress = jest.fn();
        const instance1 = shallow(<ImageButton
          style={{ width: 30, height: 30 }}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          onPress={mockOnPress}
        />).instance();
        instance1.buttonPressIn();
        instance1.handlePress();
        expect(mockOnPress).toHaveBeenCalled();
        expect(mockOnPress).toHaveBeenCalledTimes(1);
        expect(instance1.state.imageSource.uri).toBe('https://reactnative.dev/img/tiny_logo.png');
      });
      it('should call buttonPressIn and change image source', () => {
        const mockOnPress = jest.fn();
        const instance1 = shallow(<ImageButton
          style={{ width: 30, height: 30 }}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          highlightedSource={{ uri: 'https://reactnative.dev/img/header_logo.svg' }}
          onPress={mockOnPress}
        />).instance();
        instance1.buttonPressIn();
        instance1.handlePress();
        expect(mockOnPress).toHaveBeenCalled();
        expect(mockOnPress).toHaveBeenCalledTimes(1);
        expect(instance1.state.imageSource.uri).toBe('https://reactnative.dev/img/header_logo.svg');
        instance1.buttonPressOut();
        expect(instance1.state.imageSource.uri).toBe('https://reactnative.dev/img/tiny_logo.png');
      });
    });
  });
});
