'use client'
import React, { useState } from 'react'
import UserManagement from './proposal-history'
import AccountDetails from './account-details'

const User = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(false)

  const handleAccountDetailsToggle = () => {
    setShowAccountDetails(true)
  }

  const onBack = () => {
    setShowAccountDetails(false)
  }
  if (showAccountDetails) {
    return <AccountDetails onBack={onBack} />
  }
  return (
    <>
      <UserManagement onviewAcount={handleAccountDetailsToggle} />
    </>
  )
}

export default User