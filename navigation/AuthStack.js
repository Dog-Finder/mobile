import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthLoadingScreen from 'screens/session/AuthLoadingScreen'
import AuthScreen from 'screens/session/AuthScreen'
import SignUpScreen from 'screens/session/SignUpScreen'
import SignInScreen from 'screens/session/SignInScreen'
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <Stack.Screen name="Home" component={AppNavigator} />
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AuthStack
