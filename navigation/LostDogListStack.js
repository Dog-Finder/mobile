import { createStackNavigator } from 'react-navigation'
import ShowLostDogInfoScreen from '../screens/ShowLostDogInfoScreen'
import LostDogListScreen from '../screens/LostDogListScreen'

export default createStackNavigator({
  LostDogList: {
    screen: LostDogListScreen,
    navigationOptions: {
      headerStyle: { height: 7 },
    },
  },
  ShowLostDogInfo: {
    screen: ShowLostDogInfoScreen,
  },
})
