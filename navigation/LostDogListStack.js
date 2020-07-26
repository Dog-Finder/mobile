import { createStackNavigator } from 'react-navigation'
import LostDogListScreen from '../screens/LostDogListScreen'

export default createStackNavigator({
  LostDogList: {
    screen: LostDogListScreen,
    navigationOptions: {
      headerStyle: { height: 7 },
    },
  },
})
