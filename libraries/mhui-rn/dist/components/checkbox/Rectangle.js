import React from 'react';
import PropTypes from 'prop-types';
import { ART, View } from 'react-native'; // @ts-ignore

const {
  Shape,
  Path,
  Transform
} = ART;

/**
 * 两端圆角的矩形
 */
class Rectangle extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    degree: PropTypes.number.isRequired
  };

  render() {
    const {
      width,
      height
    } = this.props;
    if (width < height) return <View />;
    const newWidth = width - height;
    const path = Path().moveTo(height / 2 - width / 2, height / 2).arc(0, -height, height / 2).line(newWidth, 0).arc(0, height, height / 2).line(-newWidth, 0).close();
    return <Shape // @ts-ignore
    transform={new Transform().rotate(this.props.degree)} // eslint-disable-next-line react/jsx-props-no-spreading
    {...this.props} d={path} />;
  }

}

export default Rectangle;