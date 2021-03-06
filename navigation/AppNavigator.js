import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import InitAppScreen from '../screens/InitAppScreen'
import HomeBottomTab from './home/HomeBottomTab'
import FoundDogStack from './FoundDogStack'

const Stack = createStackNavigator()
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'InitApp'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="InitApp" component={InitAppScreen} />
      <Stack.Screen name="FoundDog" component={FoundDogStack} />
      <Stack.Screen name="Home" component={HomeBottomTab} />
    </Stack.Navigator>
  )
}

export default AppNavigator
