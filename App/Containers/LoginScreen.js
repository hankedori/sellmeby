import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import AuthActions from '../Redux/AuthRedux'
import LoginForm from '../Components/LoginForm.js'


// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.login(values)
  }

  render () {
    return (
      <View style={styles.secondaryContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../Images/logo.png')} style={styles.logo} />
          </View>
          <LoginForm onSubmit={this.handleLoginSubmit} />
          <TouchableOpacity onPress={this.props.openRegistrationScreen.bind(this)}>
            <Text style={styles.subText}>Not a member?</Text>
            <Text style={styles.subText}>Click here to Register</Text>
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
  openRegistrationScreen: () => dispatch(NavigationActions.navigate({ routeName: 'RegistrationScreen'})),
  login: (_) => {
    dispatch(AuthActions.loginRequest(_.email, _.password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
