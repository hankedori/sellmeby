import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import ItemActions from '../Redux/ItemRedux'
import {
  Button,
  Text,
  Icon,
  TextInput,
  Row,
  View,
  Subtitle,
  Divider,
  TouchableOpacity,
  Image
} from '@shoutem/ui'

import styles from './Styles/AddItemScreenStyle'

class AddItemScreen extends Component {
  state = {
    name: '',
    description: '',
    price: '',
    unit: '',
    quantity: '',
    image: require('../Images/press_to_upload.png')
  }

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

      var image = {
        uri: source.uri,
        type: 'image/jpeg',
        name: response.fileName
      }

      this.setState({
        image: image
      });
    });
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Row>
            <View styleName="vertical">
              <Subtitle>Name</Subtitle>
              <Divider styleName="line" />
              <TextInput
                placeholder={'Item name'}
                onChangeText={(name) => this.setState({name}) }
                value={this.state.name}
              />
            </View>
          </Row>
          <Row>
            <View styleName="vertical">
              <Subtitle>Quantity available</Subtitle>
              <Divider styleName="line" />
              <TextInput
                placeholder={'Quantity'}
                onChangeText={(quantity) => this.setState({quantity}) }
                value={this.state.quantity}
              />
            </View>
          </Row>
          <Row>
            <View styleName="vertical">
              <Subtitle>Price / unit</Subtitle>
              <Divider styleName="line" />
              <Row styleName="small">
                <TextInput
                  placeholder={'price (eg. 5.73)'}
                  onChangeText={(price) => this.setState({price}) }
                  value={this.state.price}
                />
                <TextInput
                  placeholder={'unit (eg. each or 12 oz)'}
                  onChangeText={(unit) => this.setState({unit}) }
                  value={this.state.unit}
                />
              </Row>
            </View>
          </Row>
          <Row>
            <View styleName="vertical">
              <Subtitle>Description</Subtitle>
              <Divider styleName="line" />
              <TextInput
                placeholder={'Item description..'}
                editable = {true}
                multiline = {true}
                numberOfLines = {5}
                onChangeText={(description) => this.setState( {description} )}
                value={this.state.description}
                style={{ height: 100 }}
              />
            </View>
          </Row>
          <Row>
            <View styleName="vertical">
              <Subtitle>Image</Subtitle>
              <Divider styleName="line" />
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <Row>
                  <Image
                    styleName="medium rounded-corners"
                    source={this.state.image}
                  />
                </Row>
              </TouchableOpacity>
            </View>
          </Row>
          <Button onPress={this.props.add.bind(this, this.state)}>
            <Icon name="plus-button" />
            <Text>ADD</Text>
          </Button>
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
  add: (data) => dispatch(ItemActions.createRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen)
