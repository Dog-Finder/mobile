import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthStack from './AuthStack'
import InitAppStack from './InitAppStack'
import MainAppSwitch from './MainAppSwitch'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import LostDogScreen from '../screens/LostDogScreen'
import HomeScreen from '../screens/HomeScreen'

export default createAppContainer(
  createSwitchNavigator(
    {
      // You could add another route here for authentication.
      // Read more at https://reactnavigation.org/docs/en/auth-flow.html
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      InitApp: InitAppStack,
      MainApp: MainAppSwitch,
      Debug: LostDogScreen,
      Home: HomeScreen,
    },
    {
      initialRouteName: 'InitApp',
    }
  )
)
