import { StyleSheet } from 'react-native';
import { adjustSize } from "../utils/sizes";
export const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: adjustSize(249),
    paddingBottom: adjustSize(60)
  },
  bg: {
    position: 'absolute',
    left: '50%',
    marginLeft: adjustSize(-540),
    top: adjustSize(249),
    width: adjustSize(1080),
    height: adjustSize(879),
    resizeMode: 'contain'
  },
  pole: {
    width: adjustSize(882),
    height: adjustSize(21),
    resizeMode: 'contain'
  },
  curtains: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: adjustSize(858)
  },
  curtainWrap: {
    flex: 1,
    height: adjustSize(858)
  },
  curtain: {
    position: 'absolute',
    height: adjustSize(858),
    flexDirection: 'row',
    overflow: 'hidden'
  },
  curtainSingle: {
    flex: 1,
    height: adjustSize(858)
  },
  curtainLeft: {
    left: 0
  },
  curtainRight: {
    right: 0,
    transform: [{
      scaleX: -1
    }]
  },
  curtainBtn: {
    position: 'absolute',
    width: adjustSize(120),
    height: adjustSize(120),
    top: '50%',
    marginTop: adjustSize(-60),
    borderRadius: adjustSize(60),
    right: 0,
    marginRight: adjustSize(-60),
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  curtainBtnInner: {
    width: adjustSize(9),
    height: adjustSize(48),
    borderRadius: adjustSize(6),
    backgroundColor: '#5898FF',
    marginLeft: adjustSize(30)
  }
});