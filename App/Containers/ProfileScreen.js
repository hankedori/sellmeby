import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import getDirections from 'react-native-google-maps-directions'
import timeToHumanReadable from '../Lib/OperationalHoursHelper'
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
  TextInput,
  View
} from '@shoutem/ui'

import styles from './Styles/ProfileScreenStyle'

class ProfileScreen extends Component {
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  state = {
      accepting_orders: this.props.vendor.accepting_orders
  };

  render () {
    let image_source = this.props.logo_url? {uri: this.props.logo_url} : require('../Images/logo_missing.png')
    const switchOn = this.state.accepting_orders

    if (this.props.fetching) {
      return(
        <View styleName='middleCenter'>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView behavior='position'>
          <Row>
            <View styleName='vertical'>
              <Title>{this.props.name}</Title>
              <Caption>{this.props.status}</Caption>
            </View>
          </Row>
          <Divider styleName='line' />
          <TouchableOpacity onPress={this.props.editLogo}>
            <Tile>
              <View styleName='center md-gutter-top'>
                <Image style={styles.avatar} source={image_source} />
              </View>
            </Tile>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.editDescription}>
            <Row>
              <Text>{this.props.description}</Text>
            </Row>
          </TouchableOpacity>
          <Divider styleName='line' />
          <TouchableOpacity onPress={this.props.editLocation}>
            <Row>
              <View>
                <Subtitle styleName="sm-gutter-bottom">Address</Subtitle>
                <Text>{this.props.address}</Text>
              </View>
              <Icon styleName="disclosure" name="right-arrow" />
            </Row>
          </TouchableOpacity>
          <Divider styleName='line' />
          <TouchableOpacity onPress={this.props.editHours}>
            <Row>
              <View>
                <Subtitle styleName="sm-gutter-bottom">Hours of operation</Subtitle>
                {
                  this.days.map((day, i) => {
                    let day_hours = this.props.hours.find(day_hours => day_hours.day === day) || { day: day }
                    if (day_hours && day_hours.open) {
                      return (
                        <Text key={i}>
                          {day_hours.day + ': ' + timeToHumanReadable(day_hours.open_time) + ' - ' + timeToHumanReadable(day_hours.close_time)}
                        </Text>
                      )
                    } else {
                      return (
                        <Text key={i}>
                          {day_hours.day + ': CLOSED'}
                        </Text>
                      )
                    }
                  })
                }
              </View>
              <Icon styleName="disclosure" name="right-arrow" />
            </Row>
            </TouchableOpacity>
            <Divider styleName='line' />
            <Row>
              <Subtitle styleName="sm-gutter-bottom">Accepting pre-orders</Subtitle>
              <Switch
                onValueChange={value => {
                  this.setState({ accepting_orders: value })
                }}
                value={switchOn}/>
            </Row>
          <Button onPress={this.props.logout} styleName="md-gutter-top">
            <Text>LOGOUT</Text>
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vendor: state.vendor.vendor,
    name: state.vendor.vendor.name,
    logo_url: state.vendor.vendor.logo_url,
    description: state.vendor.vendor.description,
    latitude: state.vendor.vendor.latitude,
    longitude: state.vendor.vendor.longitude,
    place_id: state.vendor.vendor.place_id,
    address: state.vendor.vendor.address,
    hours: state.vendor.hours,
    fetching: state.vendor.fetching,
    status: state.vendor.vendor.status
  }
}

const mapDispatchToProps = (dispatch) => ({
  editLogo: () => dispatch(NavigationActions.navigate({ routeName: 'LogoUploadScreen' })),
  editDescription: () => dispatch(NavigationActions.navigate({ routeName: 'EditDescriptionScreen' })),
  editLocation: () => dispatch(NavigationActions.navigate({ routeName: 'EditLocationScreen' })),
  editHours: () => dispatch(NavigationActions.navigate({ routeName: 'EditHoursScreen' })),
  logout: () => dispatch(NavigationActions.navigate({routeName: 'RegistrationScreen' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

const HeaderTitle = ({ navigation, text }) => <Title navigation={navigation}>{text}</Title>;
const ConnectedHeaderTitle = connect(state => ({ text: state.vendor.vendor.name }))(HeaderTitle);
