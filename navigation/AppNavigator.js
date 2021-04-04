import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import InitAppScreen from '@screens/InitAppScreen'
import LostDogScreen from '@screens/LostDogScreen'
import HomeBottomTab from './home/HomeBottomTab'
import FoundDogStack from './FoundDogStack'
import PersonalPublicationsStack from './home/PersonalPublicationsStack'
import ProfileScreen from '@screens/ProfileScreen'

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
      <Stack.Screen name="LostDog" component={LostDogScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="PersonalPublications"
        component={PersonalPublicationsStack}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator
