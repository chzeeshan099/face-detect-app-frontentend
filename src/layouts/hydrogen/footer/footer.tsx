import React from 'react';
import Image from 'next/image';
import { Button , Text } from "rizzui";
import { FaCheckCircle, FaWindows, FaApple, FaLinux, FaChrome } from "react-icons/fa";
import { RiAndroidFill } from "react-icons/ri";
import { footerConstants } from '../footer/footerConstants';
import clsx from 'clsx';

interface footerConstants {
    emailLabel: string;
    emailAddress: string;
    headerText: string;
    sunheaderText: string;
    availableOnText: string;
    buttonTextBuyNow: string;
    buttonTextWatchDemo: string;
    buttonTextWindows: string;
    buttonTextMacos: string;
    buttonTextLinux: string;
    buttonTextChrome: string;
    buttonTextIos: string;
    buttonTextAndroid: string;
}

const Footer = () => {
    return (
        <>
            <div
                className={clsx(
                    'p-6 w-full',
                    'bg-lightgray-secondary',
                    'dark:bg-dashBordCardsBG',
                    'border-t border-white dark:border-greenPrimary-300'
                )}
            >
                <div className='max-w-7xl  mx-auto'>
                    <div className='flex flex-col sm:flex-col lg:flex-row md:flex-row justify-between items-center '>
                        <div className='py-3'>
                            <Image src="/moneylogo.svg" alt="Logo" width={230} height={70} />
                            <div className='py-6'>
                                <Text
                                    className={clsx(
                                        'font-roboto text-sm sm:text-center md:text-left lg:text-left text-center pb-2',
                                        'text-black-grayish',
                                        'dark:text-white'
                                    )}
                                >
                                    {footerConstants.emailLabel}
                                </Text>
                                <Text
                                    className={clsx(
                                        'font-roboto font-semibold text-base sm:text-center md:text-left lg:text-left text-center',
                                        'text-black-grayish-dark',
                                        'dark:text-white'
                                    )}
                                >
                                    {footerConstants.emailAddress}
                                </Text>
                            </div>
                        </div>
                        <div className='lg:mt-0 flex flex-col'>
                            <Text
                                className={clsx(
                                    'font-semibold font-roboto text-lg lg:text-3xl text-center lg:text-left',
                                    'text-black-grayish',
                                    'dark:text-white'
                                )}
                            >
                                {footerConstants.headerText}
                            </Text>
                            <Text
                                className={clsx(
                                    'font-semibold py-3 font-roboto text-lg lg:text-3xl text-center lg:text-left',
                                    'text-black-grayish',
                                    'dark:text-white'
                                )}
                            >
                                {footerConstants.sunheaderText}
                            </Text>
                            <div className='flex flex-col lg:flex-row items-start lg:items-start py-3 gap-3'>
                                <Button
                                    rounded="pill"
                                    className={clsx(
                                        'w-full lg:w-auto',
                                        'bg-yellow-primary text-greenPrimary-1000 hover:bg-yellow-primary dark:text-black-light dark:hover:bg-yellow-primary',
                                    )}
                                >
                                    {footerConstants.buttonTextBuyNow}
                                </Button>
                                <Button
                                    rounded="pill"
                                    className="w-full lg:w-auto bg-transparent border border-slate-800 text-black-grayish dark:border-white dark:text-white hover:bg-transparent dark:hover:bg-transparent"
                                >
                                    {footerConstants.buttonTextWatchDemo}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div
                        className=
                        'opacity-70 flex items-center justify-center h-0.5 mx-auto dark:bg-[#2A2A2A] bg-green-footerline'
                    ></div>
                    <div className='flex flex-col lg:flex-row items-center justify-between py-5 gap-6 lg:gap-0'>
                        <div className='flex justify-between items-center w-full flex-col lg:flex-row gap-6 lg:gap-[195px] mx-auto'>
                            <div className='flex items-center gap-x-2'>
                                <FaCheckCircle className={clsx('text-black-grayish', 'dark:text-white')} />
                                <Text
                                    className={clsx(
                                        'text-sm text-center lg:text-left',
                                        'text-black-grayish',
                                        'dark:text-white'
                                    )}
                                >
                                    {footerConstants.availableOnText}
                                </Text>
                            </div>
                            <div className='flex flex-wrap gap-4 lg:gap-x-2 justify-center lg:justify-start'>
                                <Button
                                    rounded="pill"
                                    className="w-full lg:w-auto bg-transparent border border-slate-800 text-black-grayish dark:border-white dark:text-white hover:bg-transparent dark:hover:bg-transparent"
                                >
                                    <FaWindows className="mr-2 h-6" /> {footerConstants.buttonTextWindows}
                                </Button>
                                <Button
                                    rounded="pill"
                                    className="w-full lg:w-auto bg-transparent border border-slate-800 text-black-grayish dark:border-white dark:text-white hover:bg-transparent dark:hover:bg-transparent"
                                >
                                    <FaApple className="mr-2 h-6" /> {footerConstants.buttonTextMacos}
                                </Button>
                                <Button
                                    rounded="pill"
                                    className="w-full lg:w-auto bg-transparent border border-slate-800 text-black-grayish dark:border-white dark:text-white hover:bg-transparent dark:hover:bg-transparent"
                                >
                                    <FaLinux className="mr-2 h-6" /> {footerConstants.buttonTextLinux}
                                </Button>
                                <Button
                                    rounded="pill"
                                    className="w-full lg:w-auto bg-transparent border border-slate-800 text-black-grayish dark:border-white dark:text-white hover:bg-transparent dark:hover:bg-transparent"
                                >
                                    <FaChrome className="mr-2 h-6" /> {footerConstants.buttonTextChrome}
                                </Button>
                                <Button
                                    rounded="pill"
                                    className="w-full lg:w-auto bg-transparent border border-slate-800 text-black-grayish dark:border-white dark:text-white hover:bg-transparent dark:hover:bg-transparent"
                                >
                                    <FaApple className="mr-2 h-6" /> {footerConstants.buttonTextIos}
                                </Button>
                                <Button
                                    rounded="pill"
                                    className="w-full lg:w-auto bg-transparent border border-slate-800 text-black-grayish dark:border-white dark:text-white hover:bg-transparent dark:hover:bg-transparent"
                                >
                                    <RiAndroidFill className="mr-2 h-6" /> {footerConstants.buttonTextAndroid}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    'h-3 w-full',
                    'bg-yellow-400',

                )}
            ></div>
        </>
    );
};

export default Footer;
