import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import {
  Screen,
  ScrollView,
  GridRow,
  TouchableOpacity,
  DropDownMenu,
  Image,
  Title,
  Subtitle,
  Card,
  View,
  Caption,
  ListView,
  Tile,
  Button,
  Heading,
  Text,
  Icon
} from '@shoutem/ui';

class ItemDetailsScreen extends Component {

  render () {
    const item = this.props.item

    return (
      <View>
        <ScrollView>
          <Tile>
            <Image
              styleName="featured"
              source={{ uri: item.image_file_src }}
              >
            </Image>
          </Tile>
          <View styleName="content">
            <Tile>
              <Title>{item.name}</Title>
              <Caption styleName="md-gutter-top">{item.description}</Caption>
              <View styleName="horizontal sm-gutter-top">
                <Title>${item.price}</Title>
              </View>
              <View styleName="horizontal sm-gutter-top">
                <Text>Quantity: {item.quantity}</Text>
              </View>
            </Tile>
            <Button onPress={this.props.editItem.bind(this, item)} styleName="md-gutter-top">
              <Icon name="edit" />
              <Text>EDIT</Text>
            </Button>
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
