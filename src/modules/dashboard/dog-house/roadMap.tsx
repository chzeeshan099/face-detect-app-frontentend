import React from 'react'
import RoadMapImage from '@public/images/roadMap.svg'
import Image from 'next/image'
import { Text } from 'rizzui'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
const roadMap = () => {
    return (
        <>
            <CustomWidgetCard title="MUTT Token Utility Roadmap" shadow='left'>
                <div className='h-[93%] flex items-center justify-center  md:mt-0 p-3'>
                    <div className='relative text-xs text-black-light dark:text-primary-white'>
                        <Image src={RoadMapImage} alt="roadmap" className=' h-[418px]' />
                        <div className='absolute top-8 left-1 w-[130px] xs:w-[160px]'>
                            <Text>Maximize your MUTT  potential! Participate, stake, and shape the ecosystem</Text>
                        </div>
                        <div className='absolute top-0 -right-3 xs:right-0 w-[145px] xs:w-[170px]'>
                            <Text className='text-[#FF63BB] font-medium pb-2'>Governance</Text>
                            <Text>MUTT holders can vote on key platform decisitions</Text>
                        </div>
                        <div className='absolute bottom-8 sm:bottom-5 left-1 w-[140px] xs:w-[155px]'>
                            <Text className='text-[#00FFD7] font-medium pb-2'>Auctions</Text>
                            <Text>Use MUTT token to participate in exclusive auctions for rare assets</Text>
                        </div>
                        <div className='absolute bottom-12 xs:bottom-6 -right-4 xs:right-0 w-[125px] xs:w-[160px]'>
                            <Text className='text-[#F271FF] font-medium pb-2'>Staking</Text>
                            <Text>Lock your MUTT tokens to earn passive rewards.</Text>
                        </div>
                    </div>
                </div>
            </CustomWidgetCard>
        </>
    )
}

export default roadMap