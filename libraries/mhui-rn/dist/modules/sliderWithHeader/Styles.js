import { StyleSheet } from 'react-native';
import { adjustSize } from "../../utils/sizes";
import { FontDefault } from "../utils/fonts";
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
  sliderContainer: {
    paddingVertical: adjustSize(60)
  },
  sliderContainerWithHeader: {
    paddingTop: 0
  }
});