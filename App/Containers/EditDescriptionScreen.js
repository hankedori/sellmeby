import React, { Component } from 'react'
import { KeyboardAvoidingView, ActivityIndicator } from 'react-native'
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
      description: this.props.description || ''
    },
    nextRoute: 'LogoUploadScreen'
  }

  render () {
    return (
      <ScrollView>
        <ScrollView>
          {
            this.props.failed &&
            <Text>Something went wrong, please try again</Text>
          }
          <Row styleName="large">
            <Icon name="social-wall" />
            <Text>Please enter a description for your shop</Text>
          </Row>
          <Divider styleName="line" />
          <TextInput
            placeholder={'Shop description..'}
            editable = {true}
            multiline = {true}
            numberOfLines = {10}
            onChangeText={(description) => this.setState({ params: {description} })}
            value={this.state.params.description}
            style={{ height: 300, textAlignVertical: 'top' }}
          />
          {
            this.props.uploading ?
              <ActivityIndicator size="large" color="#000000" />
            :
              <RoundedButton text={'Continue'} onPress={this.props.submit.bind(this, this.state.params, this.state.nextRoute)} styles={{marginTop: 10}} />
          }
        </ScrollView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    description: state.vendor.vendor.description,
    uploading: state.vendor.uploading,
    failed: state.vendor.failed
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit: (params, nextRoute) => {
    dispatch(VendorActions.update(params, nextRoute))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditDescriptionScreen)
