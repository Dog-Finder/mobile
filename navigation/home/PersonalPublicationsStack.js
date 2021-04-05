import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ShowMyPostedFoundDogInfoScreen from '@screens/show/ShowMyPostedFoundDogInfoScreen'
import ShowMyPostedLostDogInfoScreen from '@screens/show/ShowMyPostedLostDogInfoScreen'
import PersonalPublicationsScreen from '@screens/PersonalPublicationsScreen'
import SimilarDogListScreen from '@screens/list/SimilarDogListScreen'

const Stack = createStackNavigator()
const FoundDogListStack = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen
        name="SimilarDogList"
        component={SimilarDogListScreen}
        options={{
          headerStyle: { height: 7 },
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default FoundDogListStack
