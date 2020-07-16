import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Radio from '../Radio';

configure({ adapter: new Adapter() });

describe('render', () => {
  it('render Radio', () => {
    const tree = renderer.create(
      <Radio />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Name of the group', () => {
  describe('Interaction', () => {
    describe('changeCheck', () => {
      const mockOnPress = jest.fn();
      let instance1;
      beforeEach(() => {
        instance1 = shallow(<Radio
          id={10}
          changeCheck={mockOnPress}
        />).instance();
        jest.clearAllMocks();
      });
      it('should call changeCheck and return value of id', () => {
        instance1.changeRadioCheck();
        expect(mockOnPress).toHaveBeenCalled();
        expect(mockOnPress).toHaveBeenCalledTimes(1);
        expect(mockOnPress.mock.calls[0][0]).toBe(10);
      });
    });
  });
});
