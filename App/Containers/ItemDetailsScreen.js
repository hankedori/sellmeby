import React, { Component } from 'react'
import { StyleSheet, Text, Image, ScrollView, View, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
  DropDownMenu,
  Title,
  Subtitle,
  Caption,
  Tile
} from '@shoutem/ui';

import styles from './Styles/ItemDetailsScreenStyle'

class ItemDetailsScreen extends Component {
  render () {
    const item = this.props.item
    const vendor = this.props.vendor

    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.centered}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: item.image_file_src }}
                >
              </Image>
            </View>
            <Subtitle styleName="md-gutter-top">{item.description}</Subtitle>
            <Title styleName="md-gutter-top">${item.price} / {item.unit}</Title>
            <Caption styleName="md-gutter-bottom">Quantity: {item.quantity}</Caption>
            <TouchableOpacity style={styles.button} onPress={this.props.editItem.bind(this, item)}>
              <Text style={styles.buttonText}>EDIT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props.navigation.state.params
  }
}

const mapDispatchToProps = (dispatch) => ({
  editItem: (item) => dispatch(NavigationActions.navigate({ routeName: 'EditItemScreen', params: { item: item }}))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetailsScreen)
