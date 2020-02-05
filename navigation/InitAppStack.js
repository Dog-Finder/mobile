import { createStackNavigator } from 'react-navigation'
import InitAppScreen from '../screens/InitAppScreen'
import LostDogScreen from '../screens/LostDogScreen'
import HomeScreen from '../screens/HomeScreen'
import PictureScreen from '../screens/PictureScreen'
import AcceptPictureScreen from '../screens/AcceptPictureScreen'
import FoundDogScreen from '../screens/FoundDogScreen'

export default createStackNavigator({
  InitApp: {
    screen: InitAppScreen,
    navigationOptions: {
      header: null,
    },
  },
  Home: HomeScreen,
  Picture: {
    screen: PictureScreen,
    navigationOptions: {
      header: null,
      headerMode: 'none',
    },
  },
  AcceptPicture: {
    screen: AcceptPictureScreen,
    navigationOptions: {
      header: null,
    },
  },
  FoundDog: FoundDogScreen,
  LostDog: LostDogScreen,
})
