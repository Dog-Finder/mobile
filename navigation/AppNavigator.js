import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import InitAppScreen from '../screens/InitAppScreen'
import LostDogScreen from '../screens/LostDogScreen'
import HomeBottomTab from './home/HomeBottomTab'
import FoundDogStack from './FoundDogStack'
import PersonalPublicationsScreen from '../screens/PersonalPublicationsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ShowMyPostedLostDogInfoScreen from '../screens/ShowMyPostedLostDogInfoScreen'
import ShowMyPostedFoundDogInfoScreen from '../screens/ShowMyPostedFoundDogInfoScreen'

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
        component={PersonalPublicationsScreen}
        options={{
          title: 'Mis publicaciones',
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'steelblue',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'auto',
          },
        }}
      />
      <Stack.Screen
        name="ShowMyPostedLostDogInfo"
        component={ShowMyPostedLostDogInfoScreen}
        options={() => ({
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'steelblue',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'auto',
          },
        })}
      />
      <Stack.Screen
        name="ShowMyPostedFoundDogInfo"
        component={ShowMyPostedFoundDogInfoScreen}
        options={() => ({
          title: null,
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'steelblue',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'auto',
          },
        })}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator
