import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Field, reduxForm } from 'redux-form';
import { TextInput } from '@shoutem/ui'

import styles from './Styles/AuthFormStyles'

const renderInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput styleName='sm-gutter-vertical' placeholder={'EMAIL'} onChangeText={onChange} {...restInput} />
}

const renderNameInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput styleName='sm-gutter-vertical' placeholder={'NAME'} onChangeText={onChange} {...restInput} />
}

const renderSecureInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput styleName='sm-gutter-vertical' placeholder={'PASSWORD'} secureTextEntry onChangeText={onChange} {...restInput} />
}

const renderSecureConfirmationInput = ({ input: { onChange, ...restInput }}) => {
  return <TextInput styleName='sm-gutter-vertical' placeholder={'CONFIRM PASSWORD'} secureTextEntry onChangeText={onChange} {...restInput} />
}

class RegistrationForm extends React.Component {
  render () {
    const { handleSubmit } = this.props
    return (
      <View style={styles.container}>
        <Field name="name" component={renderNameInput} />
        <Field name="email" component={renderInput} />
        <Field name="password" component={renderSecureInput} />
        <Field name="password_confirmation" component={renderSecureConfirmationInput} />

        <View style={styles.centered}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

RegistrationForm = reduxForm({
  form: 'register'
})(RegistrationForm);

export default RegistrationForm;
