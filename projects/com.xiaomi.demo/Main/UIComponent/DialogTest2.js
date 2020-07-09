import React, { Component } from 'react';
import ConfigMode from '../../../../miot-plugin-prototype/modules/fix/ConfigMode';

class DialogTest2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { messageDialog } = this.props.navigation.state.params;

    return (
      <ConfigMode

      />
    );
  }
}

DialogTest2.defaultProps = {
};

DialogTest2.propTypes = {
};

export default DialogTest2;