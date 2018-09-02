/**
 * Created by sww on 2016/10/21.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions,
  Image,
  AsyncStorage,
} from 'react-native';
const {width,height}=Dimensions.get('window')
const dateKey = 'SwRefresh_date'
const ArrowImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABQBAMAAAD8TNiNAAAAJ1BMVEUAAACqqqplZWVnZ2doaGhqampoaGhpaWlnZ2dmZmZlZWVmZmZnZ2duD78kAAAADHRSTlMAA6CYqZOlnI+Kg/B86E+1AAAAhklEQVQ4y+2LvQ3CQAxGLSHEBSg8AAX0jECTnhFosgcjZKr8StE3VHz5EkeRMkF0rzk/P58k9rgOW78j+TE99OoeKpEbCvcPVDJ0OvsJ9bQs6Jxs26h5HCrlr9w8vi8zHphfmI0fcvO/ZXJG8wDzcvDFO2Y/AJj9ADE7gXmlxFMIyVpJ7DECzC9J2EC2ECAAAAAASUVORK5CYII=';
/**
 * 下拉刷新默认状态文字
 * @type {{pullToRefresh: string, releaseToRefresh: string, refreshing: string}}
 */
export const RefreshTitle={
  pullToRefresh:'下拉以刷新',
  releaseToRefresh:'松开以刷新',
  refreshing:'正在刷新数据'
}

/**
 * 下拉刷新状态//0 下拉以刷新 1 松开以刷新 2 刷新中
 * @type {{pullToRefresh: number, releaseToRefresh: number, refreshing: number}}
 */

export const RefreshStatus={
  pullToRefresh:0,
  releaseToRefresh:1,
  refreshing:2
}

import dateFormat from './Tools'
/**
 * ======================================SwRefreshScrollView===================================
 */

export class SwRefreshScrollView extends ScrollView{
  _offsetY=0
  _isRefreshing=false
  _dragFlag = false; //scrollview是否处于拖动状态的标志
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      arrowAngle:new Animated.Value(0),
      refresStatus:RefreshStatus.pullToRefresh,
      refreshTitle:RefreshTitle.pullToRefresh,
      date:'暂无更新',
    };
  }

  static propTypes={

    //-----------------下拉刷新-------------------------------------
    /**
     * 刷新数据时的操作, 参数 end:function 操作结束时执行end() 以结束刷新状态
     */
    onRefresh:PropTypes.func,
    /**
     * 需要返回一个自定义的刷新视图,
     * 参数:
     *  refresStatus:RefreshStatus, 0 下拉以刷新 1 松开以刷新 2 刷新中
     *  offsetY:number 下拉的距离 用于自定义刷新
     */
    customRefreshView:PropTypes.func,
    /**
     * 如果自定义刷新视图 需要传递这个视图的高度 默认视图情况下 此属性无效
     */
    customRefreshViewHeight:PropTypes.number,

  }

  static defaultProps={


  }
//--------------------1.0.7新增公开方法------------------
  /**
   * 手动调用刷新
   */
  beginRefresh(){
    let height = this.props.customRefreshView ? this.props.customRefreshViewHeight:70
    if (!this._isRefreshing){
      this._isRefreshing=true
      this.setState({
        refresStatus:RefreshStatus.refreshing,
        refreshTitle:RefreshTitle.refreshing
      })
      this.refs.scrollView.scrollTo({x:0,y:-height,animated:true});
      if(this.props.onRefresh){
        this.props.onRefresh(()=>{
          this._onRefreshEnd()
        })
      }else {
        this._onRefreshEnd()
      }
    }
  }

  /**
   * 手动结束 不推荐 推荐end()回调
   */
  endRefresh(){
    this._onRefreshEnd()
  }


//---------------------------------------------------------
  render(){
    return(
      <ScrollView
        ref="scrollView"
        {...this.props}
        scrollEventThrottle={16}
        onScroll={this._onscroll.bind(this)}
        onScrollEndDrag={(event)=>this._onScrollEndDrag(event)}
        onScrollBeginDrag={(event)=>this._onScrollBeginDrag(event)}
      >
        {this._rendRefreshheader()}
        {this.props.children}
      </ScrollView>
    )
  }
  componentDidMount(){

    AsyncStorage.getItem(dateKey, (error, result) => {


      if (result) {
        result = parseInt(result);

        //将时间传入下拉刷新的state
        this.setState({
          date:dateFormat(new Date(result),'yyyy-MM-dd hh:mm'),
        });

      }


    });
  }
  //------------------下拉刷新部分-----------------------------
  /**
   * 渲染头部刷新组件
   * @private
   */
  _rendRefreshheader(){
    if (this.props.customRefreshView) {
      return this._renderCustomHeader()

    }else {
      return this._renderDefaultHeader()
    }

  }

  /**
   * 渲染自定义的刷新视图
   * @returns {*}
   * @private
   */
  _renderCustomHeader(){

    return(
      <View style={{
        position:'absolute',
        top:-this.props.customRefreshViewHeight+0.5,
        left:0,
        right:0,
        height:this.props.customRefreshViewHeight,
      }}>
        {this.props.customRefreshView(this.state.refresStatus,this._offsetY)}
      </View>
    )

  }
  /**
   * 渲染默认的刷新视图
   * @returns {XML}
   * @private
   */
  _renderDefaultHeader(){
    return(
      <View style={defaultHeaderStyles.background}>
        <View style={defaultHeaderStyles.status}>
          {this._rendArrowOrActivity()}
          <Text style={defaultHeaderStyles.statusTitle}>{this.state.refreshTitle}</Text>
        </View>
        <Text style={defaultHeaderStyles.date}>{'上次更新时间:'+this.state.date}</Text>
      </View>
    )
  }

  /**
   * 渲染菊花或者箭头
   * @returns {XML}
   * @private
   */
  _rendArrowOrActivity(){
    if (this.state.refresStatus == RefreshStatus.refreshing){
      return (
        <ActivityIndicator style={{marginRight:10}}>
        </ActivityIndicator>
      )
    }else {
      return(
        <Animated.Image
          source={{uri:ArrowImage}}
          resizeMode={'contain'}
          style={[defaultHeaderStyles.arrow,
            {transform:[{
              rotateZ:this.state.arrowAngle.interpolate({
                inputRange:[0,1],
                outputRange:['0deg','-180deg']
              })
            }]
            }]}
        ></Animated.Image>
      )
    }
  }

  /**
   * 滑动中
   * @param event
   * @private
   */
  _onscroll(event){
    let y = event.nativeEvent.contentOffset.y
    this._offsetY = y
    if (this._dragFlag){
      let height = this.props.customRefreshView ? this.props.customRefreshViewHeight:70
      if (!this._isRefreshing){
        if (y <= -height){
          //松开以刷新
          this.setState({
            refresStatus:RefreshStatus.releaseToRefresh,
            refreshTitle:RefreshTitle.releaseToRefresh
          })
          Animated.timing(this.state.arrowAngle, {
            toValue: 1,
            duration: 50,
            easing: Easing.inOut(Easing.quad)
          }).start();
        }else {
          //下拉以刷新
          this.setState({
            refresStatus:RefreshStatus.pullToRefresh,
            refreshTitle:RefreshTitle.pullToRefresh
          })
          Animated.timing(this.state.arrowAngle, {
            toValue:0,
            duration: 100,
            easing: Easing.inOut(Easing.quad)
          }).start();
        }
      }

    }
    if(this.props.onScroll){
      this.props.onScroll(event)
    }

  }

  /**
   * 拖拽
   * @private
   */
  _onScrollEndDrag(event){
    this._dragFlag = false
    let y = event.nativeEvent.contentOffset.y
    this._offsetY = y
    let height = this.props.customRefreshView ? this.props.customRefreshViewHeight:70
    if (!this._isRefreshing){
      if (this.state.refresStatus == RefreshStatus.releaseToRefresh){
        this._isRefreshing=true
        this.setState({
          refresStatus:RefreshStatus.refreshing,
          refreshTitle:RefreshTitle.refreshing
        })
        this.refs.scrollView.scrollTo({x:0,y:-height,animated:true});
        if(this.props.onRefresh){
          this.props.onRefresh(()=>{
            this._onRefreshEnd()
          })
        }else {
          this._onRefreshEnd()
        }
      }
    }else {

      if (y <= 0) {
        this.refs.scrollView.scrollTo({x:0,y:-height,animated:true});
      }
    }
    if(this.props.onScrollEndDrag){
      this.props.onScrollEndDrag(event)
    }


  }
  _onScrollBeginDrag(event){
    this._dragFlag = true
    this._offsetY = event.nativeEvent.contentOffset.y
    if (this.props.onScrollBeginDrag){
      this.props.onScrollBeginDrag(event)
    }
  }

  /**
   * 刷新结束
   * @private
   */
  _onRefreshEnd(){
    this._isRefreshing = false
    let now = new Date().getTime();
    //下拉以刷新
    this.setState({
      refresStatus:RefreshStatus.pullToRefresh,
      refreshTitle:RefreshTitle.pullToRefresh,
      date:dateFormat(now,'yyyy-MM-dd hh:mm')
    })
    // 存一下刷新时间
    AsyncStorage.setItem(dateKey, now.toString());
    Animated.timing(this.state.arrowAngle, {
      toValue:0,
      duration: 100,
      easing: Easing.inOut(Easing.quad)
    }).start();
    this.refs.scrollView.scrollTo({x:0,y:0,animated:true});
  }



}

//-------------------------样式-------------------------------
/**
 * 默认头部
 */
const defaultHeaderStyles=StyleSheet.create({
  background:{
    alignItems:'center',
    position:'absolute',
    top:-69.5,
    left:0,
    right:0,
    height:70,
    justifyContent:'center',
  },
  status:{
    flexDirection:'row',
    alignItems:'center'
  },
  arrow:{
    width:14,
    height:23,
    marginRight:10
  },
  statusTitle:{
    fontSize:13,
    color:'#333333'
  },
  date:{
    fontSize:11,
    color:'#333333',
    marginTop:5
  }

})

