import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import AuthActions from '../Redux/AuthRedux'
import RegistrationForm from '../Components/RegistrationForm.js'

// Styles
import styles from './Styles/LoginScreenStyle'

class RegistrationScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.register(values)
  }

  render () {
    return (
      <View style={styles.secondaryContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../Images/logo.png')} style={styles.logo} />
          </View>
          <RegistrationForm onSubmit={this.handleLoginSubmit} />
          <TouchableOpacity onPress={this.props.openLoginScreen.bind(this)}>
            <Text style={styles.subText}>Already a member?</Text>
            <Text style={styles.subText}>Click here to log in</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  openLoginScreen: () => dispatch(NavigationActions.navigate({ routeName: 'LoginScreen'})),
  register: (_) => {
    dispatch(AuthActions.registrationRequest(_.email, _.password, _.password_confirmation, _.name))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
