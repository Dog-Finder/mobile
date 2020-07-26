import { createStackNavigator } from 'react-navigation'
import ShowFoundDogInfoScreen from '../screens/ShowFoundDogInfoScreen'
import FoundDogListScreen from '../screens/FoundDogListScreen'

export default createStackNavigator({
  FoundDogList: {
    screen: FoundDogListScreen,
    navigationOptions: {
      headerStyle: { height: 7 },
    },
  },
  ShowFoundDogInfo: {
    screen: ShowFoundDogInfoScreen,
  },
})
