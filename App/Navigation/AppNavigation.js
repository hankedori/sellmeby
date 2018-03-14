import { StackNavigator, TabNavigator } from 'react-navigation'
import OrdersScreen from '../Containers/OrdersScreen'
import StoreScreen from '../Containers/StoreScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import LogoUploadScreen from '../Containers/LogoUploadScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import RegistrationScreen from '../Containers/RegistrationScreen'
import EditHoursScreen from '../Containers/EditHoursScreen'
import MainScreen from '../Containers/MainScreen'

import styles from './Styles/NavigationStyles'

const InitialSetupStack = StackNavigator({
  EditHoursScreen: { screen: EditHoursScreen },
  LogoUploadScreen: { screen: LogoUploadScreen }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerTitle: "Setup your Buymeby listing"
  }
})

const MainTabNav = TabNavigator({
  ProfileScreen: { screen: ProfileScreen },
  StoreScreen: { screen: StoreScreen },
  OrdersScreen: { screen: OrdersScreen }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  RegistrationScreen: { screen: RegistrationScreen },
  InitialSetupStack: { screen: InitialSetupStack },
  MainTabNav: { screen: MainTabNav },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
