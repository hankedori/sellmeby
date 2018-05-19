import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: Metrics.section,
  },
  button: {
    width: '40%',
    marginVertical: Metrics.section,
    backgroundColor: Colors.tertiary
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    margin: 10,
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.bold
  },
  message: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: Colors.steel
  },
  icon: {
    color: Colors.steel
  }
})
