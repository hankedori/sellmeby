import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, StyleSheet, PixelRatio } from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../Redux/AuthRedux'
import ImagePicker from 'react-native-image-picker'

class MainScreen extends Component {
  handleLoginSubmit = (values) => {
    this.props.register(values)
  }

  state = {
    avatarSource: null,
    videoSource: null
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
      console.tron.log('Response = ', response);

      if (response.didCancel) {
        console.tron.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.tron.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.tron.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render () {
    return (
      <View>
        <Text>Logged in!</Text>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
