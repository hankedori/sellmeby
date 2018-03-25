import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
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

  // static navigationOptions = ({ navigation, navigationOptions }) => {
  //   const { params } = navigation.state;
  //
  //   return {
  //     headerTitle: <ConnectedHeaderTitle navigation={navigation} />
  //   };
  // };

  // handleGetDirections = () => {
  //   const data = {
  //     destination: {
  //       latitude: Number(this.props.latitude),
  //       longitude: Number(this.props.longitude)
  //     },
  //     params: [
  //       {
  //         key: "dirflg",
  //         value: "w"
  //       }
  //     ]
  //   }
  //
  //   getDirections(data)
  // }

  render () {
    let image_source = this.props.logo_url? {uri: this.props.logo_url} : require('../Images/logo_missing.png')
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior='position'>
          <Row>
            <Title>{this.props.name}</Title>
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
                    let day_hours = this.props.hours.find(day_hours => day_hours.day === day)
                    if (day_hours) {
                      return (
                        <Text key={i}>
                          {day_hours.day + ': ' + timeToHumanReadable(day_hours.open_time) + ' - ' + timeToHumanReadable(day_hours.close_time)}
                        </Text>
                      )
                    }
                  })
                }
              </View>
              <Icon styleName="disclosure" name="right-arrow" />
            </Row>
          </TouchableOpacity>
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
    latitude: state.vendor.vendor.latitude,
    longitude: state.vendor.vendor.longitude,
    place_id: state.vendor.vendor.place_id,
    address: state.vendor.vendor.address,
    hours: state.vendor.hours
  }
}

const mapDispatchToProps = (dispatch) => ({
  editLogo: () => dispatch(NavigationActions.navigate({ routeName: 'LogoUploadScreen' })),
  editDescription: () => dispatch(NavigationActions.navigate({ routeName: 'EditDescriptionScreen' })),
  editLocation: () => dispatch(NavigationActions.navigate({ routeName: 'EditLocationScreen' })),
  editHours: () => dispatch(NavigationActions.navigate({ routeName: 'EditHoursScreen' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

const HeaderTitle = ({ navigation, text }) => <Title navigation={navigation}>{text}</Title>;
const ConnectedHeaderTitle = connect(state => ({ text: state.vendor.vendor.name }))(HeaderTitle);
