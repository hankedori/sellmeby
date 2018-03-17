import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import { NavigationActions } from 'react-navigation'
import {
  Heading,
  View,
  Tile,
  Text,
  Title,
  Subtitle,
  Caption,
  Icon,
  Overlay,
  Button,
  Row,
  Switch,
  Divider,
  ScrollView,
  TextInput
} from '@shoutem/ui'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditDescriptionScreenStyle'

class EditDescriptionScreen extends Component {
  state = {
    text: 'Shop description..'
  }

  render () {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior='position'>
          <Row styleName="large">
            <Icon name="social-wall" />
            <Text>Please enter a description for your shop</Text>
          </Row>
          <Divider styleName="line" />
          <TextInput // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable = {true}
            multiline = {true}
            numberOfLines = {10}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            style={{ height: 300 }}
          />
          <RoundedButton text={'Continue'} onPress={this.props.submit.bind(this)} styles={{marginTop: 10}} />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit: () => {
    dispatch(NavigationActions.navigate({ routeName: 'LogoUpload' }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditDescriptionScreen)
