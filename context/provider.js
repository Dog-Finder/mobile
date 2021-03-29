import React, { useState } from 'react'
import Context from '@context/context'

const Provider = ({ children }) => {
  const [token, setToken] = useState('')
  const [userLatitude, setUserLatitude] = useState(null)
  const [userLongitude, setUserLongitude] = useState(null)
  const store = {
    token,
    setToken,
    userLatitude,
    setUserLatitude,
    userLongitude,
    setUserLongitude,
  }
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export default Provider
