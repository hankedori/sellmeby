import PushNotification from 'react-native-push-notification'
import { PushNotificationIOS, Platform } from 'react-native'

const configure = (api) => {
  PushNotification.configure({
    onRegister: function(token) {
      api.registerDevice(token)
    },

    onNotification: function(notification) {
     console.tron.log(notification)

     if (Platform.OS === 'ios') notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    permissions: {
     alert: true,
     badge: true,
     sound: true
    },

    popInitialNotification: true,
    requestPermissions: true
  })
}

export {
 configure
}
