import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TimePicker from 'react-native-modal-datetime-picker'
import {
  Heading,
  View,
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
  ScrollView
} from '@shoutem/ui'
import RoundedButton from '../Components/RoundedButton'
import VendorActions from '../Redux/VendorRedux'

// Styles
import styles from './Styles/EditHoursScreenStyle'

class EditHoursScreen extends Component {
  state = {
    params: {
      days: [
        {
          name: 'Monday',
          open: false,
          open_time: null,
          close_time: null
        },
        {
          name: 'Tuesday',
          open: false,
          open_time: null,
          close_time: null
        },
        {
          name: 'Wednesday',
          open: false,
          open_time: null,
          close_time: null
        },
        {
          name: 'Thursday',
          open: false,
          open_time: null,
          close_time: null
        },
        {
          name: 'Friday',
          open: false,
          open_time: null,
          close_time: null
        },
        {
          name: 'Saturday',
          open: false,
          open_time: null,
          close_time: null
        },
        {
          name: 'Sunday',
          open: false,
          open_time: null,
          close_time: null
        },
      ],
      nextRoute: 'EditDescriptionScreen'
    },
    isTimePickerVisible: false,
    pickingIndex: null,
    pickingKey: null
  };

  _showTimePicker = (index, key) => this.setState({ isTimePickerVisible: true, pickingIndex: index, pickingKey: key});

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false, pickingIndex: null, pickingKey: null });

  _handleTimePicked = (date) => {
    let days = [...this.state.params.days];
    days[this.state.pickingIndex][this.state.pickingKey] = date
    this.setState({ days })
    this._hideTimePicker();
  };

  renderTimePicker(day, index, key) {
    const label = key === 'open_time' ? 'Open' : 'Close'
    const value = day[key] ? day[key].getHours() + ":" + day[key].getMinutes() : '-'

    return (
      <View styleName="vertical">
        <TouchableOpacity onPress={this._showTimePicker.bind(this, index, key)}>
          <Title>{value}</Title>
        </TouchableOpacity>
        <Caption>{label}</Caption>
      </View>
    )
  }

  renderRow(day, i) {
    const switchOn = this.state.params.days[i].open
    return (
      <View key={i}>
        <Row styleName="large">
          <Text>{day.name}</Text>
          {switchOn ?
            this.renderTimePicker(day, i, 'open_time')
            :
            <Subtitle>Closed</Subtitle>
          }
          {switchOn ?
            this.renderTimePicker(day, i, 'close_time')
            :
            <View/>
          }
          <Switch
            onValueChange={value => {
              let days = [...this.state.params.days];
              days[i].open = value
              this.setState({ days })
            }}
            value={switchOn}/>
        </Row>
        <Divider styleName="line" />
      </View>
    )
  }

  render () {
    return (
      <ScrollView>
        <Row styleName="large">
          <Icon name="events" />
          <Text>Please enter your hours of operation</Text>
        </Row>
        <Divider styleName="line" />
        {
          this.state.params.days.map((day, i) => this.renderRow(day, i))
        }
        <TimePicker
          mode='time'
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
        />
        <RoundedButton text={'Continue'} onPress={this.props.submit.bind(this, this.state.params)} styles={{marginTop: 10}} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => ({
  submit: (params) => {
    dispatch(VendorActions.updateHours(params))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditHoursScreen)
