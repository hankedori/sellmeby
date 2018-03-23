import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
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
  TextInput
} from '@shoutem/ui'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'

class ProfileScreen extends Component {
  render () {
    let image_source = this.props.logo_url? {uri: this.props.logo_url} : require('../Images/logo_missing.png')
    console.tron.log(this.props)
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior='position'>
          <Tile>
            <TouchableOpacity>
              <View style={[styles.avatar, styles.avatarContainer]}>
                <Image style={styles.avatar} source={image_source} />
              </View>
            </TouchableOpacity>
          </Tile>
          <Row>
            <Text>{this.props.description}</Text>
          </Row>
          <Row>
            <Text>{this.props.address}</Text>
          </Row>
          <Tile>
            {
              this.props.hours.map((day, i) => (
                <Text key={i}>
                  {day.day + ': ' + new Date(day.open).getHours() + ':' + new Date(day.open).getMinutes() + ' - ' + new Date(day.close).getHours() + ':' + new Date(day.close).getMinutes()}
                </Text>
              ))
            }
          </Tile>
          <Button styleName="md-gutter-top" onPress={this.props.editProfile.bind(this)}>
            <Text>EDIT PROFILE</Text>
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.vendor.vendor.name,
    logo_url: state.vendor.vendor.logo_url,
    description: state.vendor.vendor.description,
    place_id: state.vendor.vendor.place_id,
    address: state.vendor.vendor.address,
    hours: state.vendor.hours
  }
}

const mapDispatchToProps = (dispatch) => ({
  editProfile: () => dispatch(NavigationActions.navigate({ routeName: 'EditLocationScreen' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
