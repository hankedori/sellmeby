import React, { Component } from 'react'
import { Image, TouchableOpacity, KeyboardAvoidingView, StyleSheet, PixelRatio } from 'react-native'
import { connect } from 'react-redux'
import VendorActions from '../Redux/VendorRedux'
import ImagePicker from 'react-native-image-picker'
import RoundedButton from '../Components/RoundedButton'
import {
  Heading,
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
  TextInput,
  View
} from '@shoutem/ui'

class LogoUploadScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.register(values)
  }

  state = {
    logo: this.props.logo_url ? {uri: this.props.logo_url} : require('../Images/press_to_upload.png'),
    nextRoute: 'MainTabNav'
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      let source = { uri: response.uri };

      var logo = {
        uri: source.uri,
        type: 'image/jpeg',
        name: response.fileName
      }

      this.setState({
        logo: logo
      });
    });
  }

  render () {
    return (
      <ScrollView>
        <ScrollView>
          <Row styleName="large">
            <Icon name="photo" />
            <Text>Please upload a logo</Text>
          </Row>
          <Divider styleName="line" />
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <Tile>
              <View styleName='center md-gutter-top md-gutter-bottom'>
              { this.state.logo === null ? <Text>Select a Photo</Text> :
                <Image style={styles.avatar} source={this.state.logo} />
              }
              </View>
            </Tile>
          </TouchableOpacity>
          <RoundedButton text={'Upload'} onPress={this.props.upload_logo.bind(this, this.state.logo, this.state.nextRoute)} styles={{marginTop: 10}} />
        </ScrollView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    logo_url: state.vendor.vendor.logo_url,
  }
}

const mapDispatchToProps = (dispatch) => ({
  upload_logo: (logo, nextRoute) => dispatch(VendorActions.logoRequest(logo, nextRoute))
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoUploadScreen)
