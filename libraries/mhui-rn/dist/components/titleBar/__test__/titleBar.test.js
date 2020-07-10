
import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TitleBar from '../TitleBar';

configure({ adapter: new Adapter() });

describe('render', () => {
  it('render TitleBar', () => {
    const tree = renderer.create(
      <TitleBar
        type="dark"
        title="title"
        subTitle="subTitle"
        onPressLeft={() => { console.log('onPressLeft'); }}
        onPressLeft2={() => { console.log('onPressLeft2'); }}
        onPressRight={() => { console.log('onPressRight'); }}
        onPressRight2={() => { console.log('onPressRight2'); }}
        onPressTitle={() => { console.log('onPressTitle'); }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
