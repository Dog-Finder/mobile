import { createStackNavigator } from 'react-navigation'
import InitAppScreen from '../screens/InitAppScreen'
import LostDogScreen from '../screens/LostDogScreen'
import HomeScreen from '../screens/HomeScreen'

export default createStackNavigator({
  InitApp: InitAppScreen,
  LostDog: LostDogScreen,
})
