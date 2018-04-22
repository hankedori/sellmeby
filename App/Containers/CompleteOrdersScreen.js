import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import {
  Screen,
  Divider,
  ScrollView,
  GridRow,
  TouchableOpacity,
  Image,
  Icon,
  Subtitle,
  View,
  Caption,
  Row,
  Button,
  Title,
  Text
} from '@shoutem/ui';

// Styles
import styles from './Styles/CompleteOrdersScreenStyle'

class CompleteOrdersScreen extends Component {
  render () {
    return (
      <ScrollView>
        {
          this.props.orders.map((order) => (
            <TouchableOpacity key={order.id} onPress={() => this.props.openOrderDetails(order)}>
              <Row>
                <Image
                  styleName="small rounded-corners"
                  source={{ uri: order.image_src || " " }}
                />
                <View styleName="vertical stretch space-between">
                  <Subtitle>{order.name}</Subtitle>
                  <Caption>Total: {order.total_description}</Caption>
                  <View styleName="horizontal">
                    <Caption>{order.created_description}</Caption>
                  </View>
                </View>
                <Button styleName="right-icon">
                  <Icon name="right-arrow"/>
                </Button>
              </Row>
              <Divider styleName="line" />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.completed_orders
  }
}

const mapDispatchToProps = (dispatch) => ({
  openOrderDetails: (order) => dispatch(NavigationActions.navigate({ routeName: 'OrderDetailsScreen', params: { order: order }}))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrdersScreen)
