import { StyleSheet } from 'react-native'
import { Metrics, Colors, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  imageContainer: {
    width: Metrics.screenWidth * 0.8,
    height: Metrics.screenWidth * 0.8,
    paddingTop: 20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  button: {
    width: '40%',
    marginVertical: 10,
    backgroundColor: Colors.secondary
  },
  buttonText: {
    margin: 10,
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.bold
  },
  cautionText: {
    margin: 10,
    textAlign: 'center',
    color: Colors.bloodOrange,
    fontSize: Fonts.size.small
  }
})
