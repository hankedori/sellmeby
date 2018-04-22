import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
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
    id: this.props.item.id,
    name: this.props.item.name,
    description: this.props.item.description,
    price: this.props.item.price,
    unit: this.props.item.unit,
    quantity: this.props.item.quantity.toString(),
    image: { uri: this.props.item.image_file_src }
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
        <ScrollView>
          {
            this.props.error &&
            <Text>Something went wrong, please try again</Text>
          }
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
              <Row>
                <Text style={{flex: 0.05}}>
                  $
                </Text>
                <TextInput
                  placeholder={'price (eg. 5.73)'}
                  onChangeText={(price) => this.setState({price}) }
                  value={this.state.price}
                  style={{flex: 0.4}}
                />
                <Text style={{flex: 0.05}}>
                  /
                </Text>
                <TextInput
                  placeholder={'unit (eg. each or 12 oz)'}
                  onChangeText={(unit) => this.setState({unit}) }
                  value={this.state.unit}
                  style={{flex: 0.5}}
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
                style={{ height: 100, textAlignVertical: 'top' }}
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
          <View>
          {
            this.props.fetching ?
              <ActivityIndicator size="large" color="#000000" />
            :
              <Button onPress={this.props.add.bind(this, this.state)} styleName="md-gutter-top">
                <Icon name="edit" />
                <Text>EDIT</Text>
              </Button>
          }
          </View>
        </ScrollView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props.navigation.state.params,
    fetching: state.item.fetching,
    error: state.item.error
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (data) => dispatch(ItemActions.updateRequest(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddItemScreen)
