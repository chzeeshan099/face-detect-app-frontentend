import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Button, Text } from "rizzui";
import SalesLedger from './sales-ledger/sales-ledger';

const SecurityLog = ({ onBack }: { onBack: () => void }) => {
  return (
    <>
      <div className='w-full '>

        <SalesLedger onBack={onBack}
          title="Security Log"
          additionalButton={
            <Button className="  !bg-yellow-primary  text-greenPrimary-secodarydark text-sm font-bold md:w-auto w-full">Export</Button>
          }

          onSearch={(value) => console.log('Search:', value)}
        />

      </div>
    </>
  )
}

export default SecurityLog