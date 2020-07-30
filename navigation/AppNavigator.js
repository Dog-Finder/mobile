import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeBottomTab from './HomeBottomTab'
import InitAppStack from './InitAppStack'

const Stack = createStackNavigator()
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'InitApp'}>
      <Stack.Screen name="InitApp" component={InitAppStack} />
      <Stack.Screen name="Home" component={HomeBottomTab} />
    </Stack.Navigator>
  )
}

export default AppNavigator
