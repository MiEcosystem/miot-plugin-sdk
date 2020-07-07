import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Switch from '../Switch';

configure({ adapter: new Adapter() });

const switchProps = {
  value: false,
  onValueChange(value: boolean): void {
    // eslint-disable-next-line no-console
    console.log(value);
  },
};

describe('Switch', () => {
  describe('render', () => {
    it('render Switch', () => {
      const tree = renderer.create(
        <Switch value={switchProps.value} onValueChange={switchProps.onValueChange} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Interaction', () => {
    describe('onValueChange', () => {
      const mockOnPress = jest.fn();
      let instance1;
      beforeEach(() => {
        instance1 = shallow(<Switch
          value={false}
          onValueChange={mockOnPress}
        />).instance();
        jest.clearAllMocks();
      });
      it('should call onValueChange', () => {
        instance1.handleValueChange();
        expect(mockOnPress).toHaveBeenCalled();
        expect(mockOnPress).toHaveBeenCalledTimes(1);
      });
      it('should toggle state', () => {
        instance1.handleValueChange();
        expect(instance1.state.value).toBe(true);
        instance1.handleValueChange();
        expect(instance1.state.value).toBe(false);
      });
    });
  });
});
