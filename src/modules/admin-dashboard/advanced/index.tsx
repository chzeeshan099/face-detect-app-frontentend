'use client';
import React from 'react'
import ExternalIntegrations from './externalintegrations/externalintegrations'
import ChainLogin from './chain-login/chainlogin'
import SmartContractInteraction from '../advanced/smart-contract/smart-contract-interaction'

import { Text } from 'rizzui'
import Backup from './backup/backup';

const Index = () => {
    return (
        <>
            <div className='py-2'>
                <Text className='text-2xl font-semibold dark:text-white py-3'>
                    Advanced Admin Tools
                </Text>
                <SmartContractInteraction />
            </div>
            <ExternalIntegrations />
            <div className='flex md:flex-row flex-col gap-4 mt-4 '>
                <Backup />
                <ChainLogin />
            </div>
        </>
    )
}

export default Index