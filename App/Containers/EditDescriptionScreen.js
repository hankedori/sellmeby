import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import VendorActions from '../Redux/VendorRedux'
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
    params: {
      description: 'Shop description..'
    },
    nextRoute: 'LogoUploadScreen'
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
            onChangeText={(description) => this.setState({ params: {description} })}
            value={this.state.params.description}
            style={{ height: 300 }}
          />
          <RoundedButton text={'Continue'} onPress={this.props.submit.bind(this, this.state.params, this.state.nextRoute)} styles={{marginTop: 10}} />
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
  submit: (params, nextRoute) => {
    dispatch(VendorActions.update(params, nextRoute))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditDescriptionScreen)
