import { createStackNavigator } from 'react-navigation'
import InitAppScreen from '../screens/InitAppScreen'
import LostDogScreen from '../screens/LostDogScreen'
import HomeScreen from '../screens/HomeScreen'
import PictureScreen from '../screens/PictureScreen'
import AcceptPictureScreen from '../screens/AcceptPictureScreen'
import FoundDogScreen from '../screens/FoundDogScreen'
import ShowPictureScreen from '../screens/ShowPictureScreen'

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
  FoundDog: {
    screen: FoundDogScreen,
  },
  LostDog: LostDogScreen,
  ShowPicture: {
    screen: ShowPictureScreen,
    navigationOptions: {
      header: null,
    },
  },
})
