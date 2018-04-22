import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import AuthActions from '../Redux/AuthRedux'
import LoginForm from '../Components/LoginForm'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LoginScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.login(values)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <LoginForm onSubmit={this.handleLoginSubmit} />
          <TouchableOpacity onPress={() => this.props.navigateRegistration()}>
            <Text style={styles.sectionText}>Already a member? Login Here</Text>
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
  login: (_) => {
    dispatch(AuthActions.loginRequest(_.email, _.password))
  },
  navigateRegistration: () => {
    dispatch(NavigationActions.navigate({ routeName: 'RegistrationScreen' }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
