import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class MainScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.register(values)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <Text>Logged in!</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
