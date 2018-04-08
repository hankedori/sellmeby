import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Title, View, Button, Divider, ScrollView, Text, Row, Image, Subtitle, Caption } from '@shoutem/ui'

import styles from './Styles/OrderDetailsScreenStyle'

class OrderDetailsScreen extends Component {
  render () {
    const order_details = this.props.order.order_details;
    if (!order_details) {
      return null
    }

    return (
      <View>
        <ScrollView>
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
                    <Caption styleName="line-through md-gutter-right">${item.total_cost}</Caption>
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
          <Button onPress={this.props.completeOrder.bind(this)}>
            <Text>Complete Order</Text>
          </Button>
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
  completeOrder: () => dispatch({ type: 'NavigateBack' })
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsScreen)
