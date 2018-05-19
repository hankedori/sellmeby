import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { View, TouchableOpacity, Text } from 'react-native'
import { TextInput } from '@shoutem/ui'

import styles from './Styles/AuthFormStyles'

const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput styleName='sm-gutter-vertical' placeholder={'EMAIL'} onChangeText={onChange} {...restInput} />
}

const renderSecureInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput styleName='sm-gutter-vertical' placeholder={'PASSWORD'} secureTextEntry onChangeText={onChange} {...restInput} />
}

class LoginForm extends React.Component {
  render () {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <Field name="email" component={renderInput} />
        <Field name="password" component={renderSecureInput} />

        <View style={styles.centered}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;
