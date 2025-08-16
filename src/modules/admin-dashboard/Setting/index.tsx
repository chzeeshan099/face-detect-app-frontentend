import React from 'react'
import Currentstatus from './security-configuration/security-config'
import ReferralRewardConfig from './referral-reward-config/referral-config'
import KycAmlStatus from './kyc-state-managment/kyc-aml'
import SecuirtyConfig from './security-configuration/security-config'
import CurrentStatus from './current-status/current-status'

const index = () => {
  return (
    <>
    <CurrentStatus/>
    <div className='mt-4'>
    <SecuirtyConfig/>
    </div>
    <div className=' flex gap-4 sm:flex-row flex-col mt-4'>
    <ReferralRewardConfig/>
    <KycAmlStatus/>
    </div>
    </>
  )
}

export default index
