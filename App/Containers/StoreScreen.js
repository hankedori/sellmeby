import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import ItemList from '../Components/ItemList'
import {
  Button,
  Text,
  Icon
} from '@shoutem/ui'
import styles from './Styles/StoreScreenStyle'

class StoreScreen extends Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <ItemList />
          <Button styleName="md-gutter-top" onPress={this.props.addItem.bind(this)}>
            <Icon name="plus-button" />
            <Text>ADD ITEM</Text>
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
  addItem: () => dispatch(NavigationActions.navigate({ routeName: 'AddItemScreen'}))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreScreen)
