import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthScreen from '../screens/AuthScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import AppNavigator from './AppNavigator'

const Stack = createStackNavigator()

const AuthStack = () => {
  const [loading, setLoading] = useState(true)
  const userToken = false
  useEffect(() => {
    const makeAsyncStuff = async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 1000)
      })
      setLoading(false)
    }
    makeAsyncStuff()
  }, [])
  if (loading) return <AuthLoadingScreen />
  return (
    <Stack.Navigator>
      {userToken ? (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="SignIn" component={AuthScreen} />
          <Stack.Screen name="Register" component={AuthScreen} />
        </>
      ) : (
        <Stack.Screen name="Home" component={AppNavigator} />
      )}
    </Stack.Navigator>
  )
}

export default AuthStack
