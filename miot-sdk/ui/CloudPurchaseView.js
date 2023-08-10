export default class CloudPurchaseView extends React.Component {
    static propTypes = {
        /**
           * 用户购买成功回调
           * @member {func}
           */
        onPurchaseComplete: PropTypes.func,
        ...ViewPropTypes
      };
    render() {
        let did = this.props.did || Device.deviceID;
        return <MHCameraCloudPurchaseView
          did={did}
          {...this.props} />;
      }
}