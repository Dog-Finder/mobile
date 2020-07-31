import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import InitAppScreen from '../screens/InitAppScreen'
import FoundDogScreen from '../screens/FoundDogScreen'
import PictureScreen from '../screens/camera/PictureScreen'
import AcceptPictureScreen from '../screens/camera/AcceptPictureScreen'
import ShowPictureScreen from '../screens/camera/ShowPictureScreen'

const Stack = createStackNavigator()
const InitAppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InitApp" component={InitAppScreen} />
      <Stack.Screen name="Picture" component={PictureScreen} />
      <Stack.Screen name="AcceptPicture" component={AcceptPictureScreen} />
      <Stack.Screen
        name="FoundDog"
        component={FoundDogScreen}
        options={{
          title: 'Perro Encontrado',
          headerShown: true,
          headerStyle: {
            backgroundColor: 'steelblue',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}
      />
      <Stack.Screen name="ShowPicture" component={ShowPictureScreen} />
    </Stack.Navigator>
  )
}

export default InitAppStack
