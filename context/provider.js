import React, { useState } from 'react'
import Context from '@context/context'

const Provider = ({ children }) => {
  const [token, setToken] = useState('')
  const store = {
    token,
    setToken,
  }
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export default Provider
