import { Component } from 'react';

class DialogTest2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { messageDialog } = this.props.navigation.state.params;

    return (messageDialog);
  }
}

DialogTest2.defaultProps = {
};

DialogTest2.propTypes = {
};

export default DialogTest2;