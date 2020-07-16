import { StyleSheet } from 'react-native';
import { FontDefault } from "../utils/fonts";
import { adjustSize } from "../../utils/sizes";
export const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: adjustSize(60)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between' // borderBottomWidth: 1,
    // borderBottomColor: 'rgba(0, 0, 0, 0.15)'

  },
  titleContainer: {
    flex: 1,
    height: adjustSize(156),
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: adjustSize(42),
    fontFamily: FontDefault,
    color: '#000'
  },
  titleSeparator: {
    width: 1,
    height: adjustSize(42),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: adjustSize(18)
  },
  subtitle: {
    fontSize: adjustSize(36),
    fontFamily: FontDefault,
    color: 'rgba(0, 0, 0, 0.6)'
  },
  selectors: {
    paddingVertical: adjustSize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectorsWithHeader: {
    paddingTop: 0
  },
  selectorsPadding0: {
    paddingHorizontal: adjustSize(0)
  },
  selectorsPadding1: {
    paddingHorizontal: adjustSize(78)
  },
  selectorsPadding2: {
    paddingHorizontal: adjustSize(0)
  },
  selectorsPadding3: {
    paddingHorizontal: adjustSize(0)
  },
  selectorWithHeader: {
    paddingTop: 0
  },
  separator: {
    width: 1,
    height: adjustSize(120),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginHorizontal: adjustSize(60)
  }
});