import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthStack from './AuthStack'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import HomeBottomTab from './HomeBottomTab'
import InitAppStack from './InitAppStack'

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      InitApp: InitAppStack,
      Home: HomeBottomTab,
    },
    {
      initialRouteName: 'InitApp', // 'Home', // Should be Auth
    }
  )
)
