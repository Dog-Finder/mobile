import React, { useState } from 'react'
import Context from '@context/context'

const Provider = ({ children }) => {
  const [token, setToken] = useState('')
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const store = {
    token,
    setToken,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  }
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export default Provider
