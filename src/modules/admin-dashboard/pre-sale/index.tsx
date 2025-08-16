import React from 'react'
import OverView from './overview/overview'
import AutomatedToken from './automated-token/automated-token'
import CurrentStatus from './presale-managment/currentstatus'
import StagesConfiguration from './presale-managment/stagesconfiguration'
import EmergencyControl from './emergency-control/emergency-control'

const PreSale = () => {
  return (
    <>
    
    <CurrentStatus />
    <StagesConfiguration />
    <div className='flex sm:flex-row flex-col gap-4 mt-4'>
    <OverView/>
    <AutomatedToken/>
    </div>
    <div className='mt-4'>
    <EmergencyControl/>
    </div>
    </>
  )
}

export default PreSale