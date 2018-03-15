import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import RoundedButton from '../Components/RoundedButton'
import { NavigationActions } from 'react-navigation'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/EditLocationScreenStyle'

class EditLocationScreen extends Component {
  render () {
    return (
      <ScrollView>
        <KeyboardAvoidingView>
          <GooglePlacesAutocomplete
            placeholder='Search for your address'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.tron.log({
                data: data,
                details: details
              });
            }}

            getDefaultValue={() => ''}

            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'AIzaSyC3SPvzB20qOg0ssWSAWmq7sAMWOwCtq1g',
              language: 'en', // language of the results
            }}

            styles={{
              textInputContainer: {
                width: '100%'
              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}

            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: 'distance',
              types: 'food'
            }}

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          />
          <RoundedButton text={'Continue'} onPress={this.props.submit.bind(this)} styles={{marginTop: 10}} />
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
  submit: () => {
    dispatch(NavigationActions.navigate({ routeName: 'EditHoursScreen' }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditLocationScreen)
