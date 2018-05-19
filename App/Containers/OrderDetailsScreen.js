import React, { Component } from 'react'
import { connect } from 'react-redux'
import OrdersActions from '../Redux/OrdersRedux'
import { ActivityIndicator } from 'react-native'
import { Title, View, Button, Divider, ScrollView, Text, Row, Image, Subtitle, Caption } from '@shoutem/ui'

import styles from './Styles/OrderDetailsScreenStyle'

class OrderDetailsScreen extends Component {
  render () {
    const order = this.props.order;
    const order_details = order.order_details;
    if (!order_details) {
      return null
    }

    return (
      <View>
        <ScrollView>
          {
            this.props.error &&
            <Text>Something went wrong, please try again</Text>
          }
          {
            order_details.map((item, j) => (
              <Row key={item.id}>
                <Image
                  styleName="small rounded-corners"
                  source={{ uri: item.image_file_src }}
                />
                <View styleName="vertical stretch space-between">
                  <Subtitle>{item.name}</Subtitle>
                  <View styleName="horizontal">
                    <Subtitle styleName="md-gutter-right">${item.total_cost}</Subtitle>
                  </View>
                  <View styleName="horizontal">
                    <Caption>Quantity: {item.quantity} | </Caption>
                    <Caption>Unit: ${item.price}</Caption>
                  </View>
                </View>
              </Row>
            ))
          }
          <Divider styleName="line" />
          { order.status !== 'COMPLETE' &&
            <Button onPress={this.props.completeOrder.bind(this, order.id)}>
              {
                this.props.fetching ?
                  <ActivityIndicator size="large" color="#000000" />
                :
                  <Text>Complete Order</Text>
              }
            </Button>
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props.navigation.state.params,
    error: state.orders.error,
    fetching: state.orders.fetching
  }
}

const mapDispatchToProps = (dispatch) => ({
  completeOrder: (id) => dispatch(OrdersActions.orderComplete(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen)
