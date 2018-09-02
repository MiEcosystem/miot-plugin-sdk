// MHTableView.js

var React = require('react-native');
var { requireNativeComponent,
      View, 
      TouchableOpacity, 
      Text,
      DeviceEventEmitter,
    } = React; 

class MHTableView extends React.Component {
  constructor(props) {
    super(props);
    var MHTableViewConsts = require('react-native').NativeModules.UIManager.MHWrapperTableView.Constants;
    this.consts = MHTableViewConsts;
    this.dataSource = this.props.dataSource;
  }

  // 刷新tableView，newDataSource可以省略，省略表明用当前dataSource刷
  reloadData(newDataSource) {
    if (newDataSource)
    {
      this.dataSource = newDataSource;
    }
    this._table.setNativeProps({dataSource:this.dataSource});
  }

  getDataSource() {
    return this.dataSource;
  }

  static createCell(title, subTitle, imageUri, height, bgColor, sepColor) {
    var cell = {};
    if (title)
    {
      cell.title = {"text":title};
    }
    if (subTitle)
    {
      cell.subTitle = {"text":subTitle};
    }
    if (imageUri)
    {
      cell.image = {"imageUri":imageUri};
    }
    if (height)
    {
      cell.height = height;
    }
    if (bgColor)
    {
      cell.backgroundColor = bgColor;
    }
    if (sepColor)
    {
      cell.extra = {"separatorColor":sepColor};
    }
    return cell;
  }

  static createSection(cells, headerInfo) {
    var section = {};
    if (headerInfo)
    {
      section.header = headerInfo;
    }
    if (cells)
    {
      section.cells = cells;
    }
    return section
  }

  static createDataSource(sections, indexInfo) {
    var dataSource = {};
    if (indexInfo)
    {
        dataSource.index = indexInfo;
    }
    if (sections)
    {
      dataSource.sections = sections;
    }
    return dataSource;
  }

  render() {
    return <MHWrapperTableView ref={component => {this._table = component;}} {...this.props} />;
  }
}

MHTableView.propTypes = {
  dataSource: React.PropTypes.object,
  hasIndex: React.PropTypes.bool,
  tableName: React.PropTypes.string,
};

var MHWrapperTableView = requireNativeComponent('MHWrapperTableView', MHTableView);

module.exports = MHTableView;
