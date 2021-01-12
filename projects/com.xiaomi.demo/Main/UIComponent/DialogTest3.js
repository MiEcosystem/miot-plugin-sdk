import React, { Component } from 'react';
import StatisticsPage from 'mhui-rn/dist/modules/statistics/StatisticsPage';

class DialogTest3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      // statisticsData: [],
      statisticsData: [
        [
          [
            { "timestamp": 1608134400, "value": 15, "formatTime": 1608134400 },
            { "timestamp": 1608048000, "value": 10, "formatTime": 1608134400 },
            { "timestamp": 1607961600, "value": 6, "formatTime": 1608134400 },
            { "timestamp": 1607925600, "value": 13, "formatTime": 1608134400 },
            { "timestamp": 1607922000, "value": 100, "formatTime": 1608134400 },
            { "timestamp": 1607918400, "value": 9, "formatTime": 1608134400 },
            { "timestamp": 1607914800, "value": 9, "formatTime": 1608134400 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 20 },
            { "timestamp": 1608048000, "value": 22 },
            { "timestamp": 1607961600, "value": 24 },
            { "timestamp": 1607925600, "value": 89 },
            { "timestamp": 1607922000, "value": 120 },
            { "timestamp": 1607918400, "value": 259 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15 },
            { "timestamp": 1608048000, "value": 10 },
            { "timestamp": 1607961600, "value": 6 },
            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 100 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },

            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15 },
            { "timestamp": 1608048000, "value": 10 },
            { "timestamp": 1607961600, "value": 6 },
            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },


            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },



            { "timestamp": 1608134400, "value": 15, "formatTime": 1608134400 },
            { "timestamp": 1608048000, "value": 10, "formatTime": 1608134400 },
            { "timestamp": 1607961600, "value": 6, "formatTime": 1608134400 },
            { "timestamp": 1607925600, "value": 13, "formatTime": 1608134400 },
            { "timestamp": 1607922000, "value": 100, "formatTime": 1608134400 },
            { "timestamp": 1607918400, "value": 9, "formatTime": 1608134400 },
            { "timestamp": 1607914800, "value": 9, "formatTime": 1608134400 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 20 },
            { "timestamp": 1608048000, "value": 22 },
            { "timestamp": 1607961600, "value": 24 },
            { "timestamp": 1607925600, "value": 89 },
            { "timestamp": 1607922000, "value": 120 },
            { "timestamp": 1607918400, "value": 259 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15 },
            { "timestamp": 1608048000, "value": 10 },
            { "timestamp": 1607961600, "value": 6 },
            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 100 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },

            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15 },
            { "timestamp": 1608048000, "value": 10 },
            { "timestamp": 1607961600, "value": 6 },
            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },


            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15, "formatTime": 1608134400 },
            { "timestamp": 1608048000, "value": 10, "formatTime": 1608134400 },
            { "timestamp": 1607961600, "value": 6, "formatTime": 1608134400 },
            { "timestamp": 1607925600, "value": 13, "formatTime": 1608134400 },
            { "timestamp": 1607922000, "value": 100, "formatTime": 1608134400 },
            { "timestamp": 1607918400, "value": 9, "formatTime": 1608134400 },
            { "timestamp": 1607914800, "value": 9, "formatTime": 1608134400 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 20 },
            { "timestamp": 1608048000, "value": 22 },
            { "timestamp": 1607961600, "value": 24 },
            { "timestamp": 1607925600, "value": 89 },
            { "timestamp": 1607922000, "value": 120 },
            { "timestamp": 1607918400, "value": 259 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15 },
            { "timestamp": 1608048000, "value": 10 },
            { "timestamp": 1607961600, "value": 6 },
            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 100 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },

            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15 },
            { "timestamp": 1608048000, "value": 10 },
            { "timestamp": 1607961600, "value": 6 },
            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },


            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15, "formatTime": 1608134400 },
            { "timestamp": 1608048000, "value": 10, "formatTime": 1608134400 },
            { "timestamp": 1607961600, "value": 6, "formatTime": 1608134400 },
            { "timestamp": 1607925600, "value": 13, "formatTime": 1608134400 },
            { "timestamp": 1607922000, "value": 100, "formatTime": 1608134400 },
            { "timestamp": 1607918400, "value": 9, "formatTime": 1608134400 },
            { "timestamp": 1607914800, "value": 9, "formatTime": 1608134400 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 20 },
            { "timestamp": 1608048000, "value": 22 },
            { "timestamp": 1607961600, "value": 24 },
            { "timestamp": 1607925600, "value": 89 },
            { "timestamp": 1607922000, "value": 120 },
            { "timestamp": 1607918400, "value": 259 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15 },
            { "timestamp": 1608048000, "value": 10 },
            { "timestamp": 1607961600, "value": 6 },
            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 100 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },

            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15 },
            { "timestamp": 1608048000, "value": 10 },
            { "timestamp": 1607961600, "value": 6 },
            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 },


            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 10 },
            { "timestamp": 1607918400, "value": 9 },
            { "timestamp": 1607914800, "value": 9 },
            { "timestamp": 1607911200, "value": 13 }
          ]
        ],
        [
          [

            { "timestamp": 1607911200, "value": 13 },
            { "timestamp": 1608134400, "value": 15 },
            { "timestamp": 1608048000, "value": 70 },
            { "timestamp": 1607961600, "value": 26 },
            { "timestamp": 1607925600, "value": 13 },
            { "timestamp": 1607922000, "value": 200 },
            { "timestamp": 1607918400, "value": 59 },
            { "timestamp": 1607914800, "value": 125 },
            { "timestamp": 1607911200, "value": 11 }

            // { "timestamp": 1607925600, "value": 13 },
            // { "timestamp": 1607922000, "value": 10 },
            // { "timestamp": 12, "value": 9 },
            // { "timestamp": 1607914800, "value": 9 },
            // { "timestamp": 1608134400, "value": 15, "formatTime": 1608134400,  },
            // { "timestamp": 1608048000, "value": 10, "formatTime": 1608134400, },
            // { "timestamp": 1607961600, "value": 6, "formatTime": 1608134400, },
            //  { "timestamp": 1607925600, "value": 13, "formatTime": 1608134400, },
            //  { "timestamp": 1607922000, "value": 100, "formatTime": 1608134400, },
            //  { "timestamp": 1607918400, "value": 9, "formatTime": 1608134400, },
            //  { "timestamp": 1607914800, "value": 9, "formatTime": 1608134400, },


            //  { "timestamp": 1607911200, "value": 13 },
            //  { "timestamp": 1608134400, "value": 20 },
            //  { "timestamp": 1608048000, "value": 22 },
            //  { "timestamp": 1607961600, "value": 24 },
            //   { "timestamp": 1607925600, "value": 89 },
            //   { "timestamp": 1607922000, "value": 120 },
            //   { "timestamp": 1607918400, "value": 259 },
            //   { "timestamp": 1607914800, "value": 9 },
            // { "timestamp": 1607911200, "value": 13 },
            // { "timestamp": 1608134400, "value": 15 },
            // { "timestamp": 1608048000, "value": 10 },
            // { "timestamp": 1607961600, "value": 6 },
            //  { "timestamp": 1607925600, "value": 13 },
            //  { "timestamp": 1607922000, "value": 10 },
            //  { "timestamp": 1607918400, "value": 9 },
            //  { "timestamp": 1607914800, "value": 9 },
            //  { "timestamp": 1607911200, "value": 13 },


            //  { "timestamp": 1607925600, "value": 13 },
            //  { "timestamp": 1607922000, "value": 10 },
            //  { "timestamp": 1607918400, "value": 9 },
            //  { "timestamp": 1607914800, "value": 9 },
            //  { "timestamp": 1607911200, "value": 13 }
          ]
        ]
      ]
      // [
      //   [
      //     [
      //       { value: 38, formatTime: 'a', timestamp: 1546387200000 },
      //       { value: 120, formatTime: 'b', timestamp: 1569974400000 },
      //       { value: 0, formatTime: 'v', timestamp: 1580774400000 },
      //       { value: 30, formatTime: 'b', timestamp: 1608031168136 }],
      //     [{ value: 30, formatTime: 'b', timestamp: 1608031168136 },]
      //   ], [
      //     [
      //       { value: 20, formatTime: 'b', timestamp: 1546387200000, },
      //       { value: 55, formatTime: 'v', timestamp: 1556755200000 },
      //       { value: 65, formatTime: 'c', timestamp: 1580860800000 },
      //       { value: 85, formatTime: 'd', timestamp: 1608031168136 }
      //     ]
      //   ]
      // ]
    };
  }
  // [150, 80, 0, 30, 150, 60, 37]
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: false
      });
    }, 2000);
  }


  render() {
    // let { messageDialog } = this.props.navigation.state.params;

    return (<StatisticsPage
      dataSourceConfig={[
        {
          // key: 0,
          title: 'PM2.5',
          items: [{
            id: 0, type: 'day', value: '日', params: {}
          }, {
            id: 1, type: 'week', value: '周', params: {}
          }, {
            id: 2,
            type: 'month',
            value: '月',
            params: {}
          }
          ]
        },
        {
          title: 'VOC',
          items: [{
            // id: 0,
            type: 'day', value: '日', params: {}
          }, {
            // id: 1,
            type: 'week', value: '周', params: {}
          }, {
            // id: 2,
            type: 'month', value: '月', params: {}
          }]
        }
      ]}
      titleConfig={[
        {
          subtitleWithData: '有data中文',
          subtitleWithoutData: '人aaaxxxx',
          titleWithoutData: '问问'
        }
      ]}
      tabsConfig={
        {
          tabItems: [
            {
              key: 0,
              value: 'VOC2'
            },
            {
              key: 1,
              value: 'PM2.52'
            }
          ]
        }
      }
      chartType={'LineChart'} isLoading={this.state.value} showTabs={true} statisticsData={this.state.statisticsData} />);
  }
}

DialogTest3.defaultProps = {
};

DialogTest3.propTypes = {
};

export default DialogTest3;
