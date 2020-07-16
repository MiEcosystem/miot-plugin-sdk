
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Checkbox from '../Checkbox';

configure({ adapter: new Adapter() });

describe('Checkbox', () => {
  describe('render', () => {
    it('render Checkbox', () => {
      const tree = renderer.create(
        <Checkbox checked={false} onValueChange={(checked) => { console.log(checked); }} />,
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Interaction', () => {
    describe('onValueChange', () => {
      const mockOnPress = jest.fn();
      let instance1;
      beforeEach(() => {
        instance1 = shallow(<Checkbox
          value={false}
          onValueChange={mockOnPress}
        />).instance();
        jest.clearAllMocks();
      });
      it('should call onValueChange', () => {
        instance1.onValueChange();
        expect(mockOnPress).toHaveBeenCalled();
        expect(mockOnPress).toHaveBeenCalledTimes(1);
      });
      it('should toggle state', () => {
        instance1.onValueChange();
        expect(mockOnPress.mock.calls[0][0]).toBe(true);
        expect(instance1.state.checked).toBe(true);
      });
    });
  });
});
