import { Component } from 'react';

class DialogTest3 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { messageDialog } = this.props.navigation.state.params;

    return (messageDialog);
  }
}

DialogTest3.defaultProps = {
};

DialogTest3.propTypes = {
};

export default DialogTest3;