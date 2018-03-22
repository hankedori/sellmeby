import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import AddItemScreen from '../Containers/AddItemScreen'
import EditDescriptionScreen from '../Containers/EditDescriptionScreen'
import EditLocationScreen from '../Containers/EditLocationScreen'
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
  EditLocationScreen: { screen: EditLocationScreen },
  EditHoursScreen: { screen: EditHoursScreen },
  EditDescriptionScreen: { screen: EditDescriptionScreen },
  LogoUploadScreen: { screen: LogoUploadScreen }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerTitle: "First time setup"
  }
})

const ProfileStack = StackNavigator({
  ProfileScreen: { screen: ProfileScreen },
}, {
  headerMode: 'float',
  navigationOptions: {
    headerTitle: "Profile"
  }
})

const StoreStack = StackNavigator({
  StoreScreen: { screen: StoreScreen },
  AddItemScreen: { screen: AddItemScreen },
}, {
  headerMode: 'float',
  navigationOptions: {
    headerTitle: "Store"
  }
})

const OrdersStack = StackNavigator({
  OrdersScreen: { screen: OrdersScreen }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerTitle: "Orders"
  }
})

const MainTabNav = TabNavigator({
  ProfileStack: { screen: ProfileStack },
  StoreStack: { screen: StoreStack },
  OrdersStack: { screen: OrdersStack }
}, {
  initialRouteName: 'StoreStack',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom'
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
