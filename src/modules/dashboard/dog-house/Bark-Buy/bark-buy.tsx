'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Button, Text } from 'rizzui';
import { FaCheck } from 'react-icons/fa';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import './popoverstyle.css';
import { getBuyBarkData } from '@/apis/dashbord';
import ConfirmTransaction from './confirm-transaction';
import { useTheme } from 'next-themes';
import CustomWidgetCard from '@/components/cards/custom-widget-card';

const MAX_COIN = 123.45;


const MAIN_CRYPTOS = [
  { label: 'ETH', value: 'eth', bgClass: 'bg-blue-600' },
  { label: 'BNB', value: 'bnb', bgClass: 'bg-yellow-400' },
  { label: 'XPR', value: 'xpr', bgClass: 'bg-gray-950' },
];

const OTHER_CRYPTOS = [
  { label: 'BTC', value: 'btc', bgClass: 'bg-orange-500' },
  { label: 'SOL', value: 'sol', bgClass: 'bg-green-400' },
  { label: 'ADA', value: 'ada', bgClass: 'bg-blue-900' },
];

const BarkBuy = () => {
  const [showOther, setShowOther] = useState(false);
  const [selected, setSelected] = useState('eth');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buyBarkData, setBuyBarkData] = useState<any>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [runTour, setRunTour] = useState(true);
  const [showSuccessStep, setShowSuccessStep] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const driverObj = useRef<any>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  const tourSteps = [
    {
      element: '.crypto-selection-area',
      popover: {
        title: 'Choose a Crypto to Pay With',
        description: 'Choose which crypto you want to use to purchase $MUTT — BNB, ETH, or other supported tokens.',
        side: 'right' as const,
      }
    },
    {
      element: '.amount-section',
      popover: {
        title: 'Enter Purchase Amount',
        description: 'Enter the amount of BNB or other selected token you\'d like to use. The system will automatically calculate how much $MUTT you\'ll receive at the current price.',
        side: 'right' as const,
      }
    },
    {
      element: '.confirm-modal',
      popover: {
        title: 'Approve in Wallet',
        description: 'Almost there! Confirm the transaction in your wallet, check the gas fees, and approve to finish your order.',
        side: 'right' as const,
      }
    },
    {
      element: '.success-modal',
      popover: {
        title: 'You\'ve Got MUTT!',
        description: 'You\'ve Got MUTT! Congratulations! Your $MUTT tokens are now on their way. You can now view them in your wallet, join the leaderboard, or stake for rewards.',
        side: 'right' as const,
      }
    }
  ];

  useEffect(() => {
    if (mounted && runTour) {
      driverObj.current = driver({
        showProgress: true,
        showButtons: ['next', 'close'  ],
        steps: tourSteps,
        allowClose: true,
        animate: true,
        stagePadding: 0,
        onDestroyStarted: () => {
          setRunTour(false);
          setShowConfirmModal(false);
          setShowSuccessStep(false);
        },
        onHighlighted: (element) => {
          if (element?.className?.includes('confirm-modal')) {
            setShowConfirmModal(true);
            setShowSuccessStep(false);
          } else if (element?.className?.includes('success-modal')) {
            setShowConfirmModal(true);
            setShowSuccessStep(true);
          }
        },
        onNextClick: (element) => {
          if (element?.className?.includes('crypto-selection-area')) {
            setTimeout(() => {
              driverObj.current.moveNext();
            }, 100);
          } else if (element?.className?.includes('amount-section')) {
            setShowConfirmModal(true);
            setTimeout(() => {
              driverObj.current.moveNext();
            }, 100);
          } else if (element?.className?.includes('confirm-modal')) {
            setShowSuccessStep(true);
            setTimeout(() => {
              driverObj.current.moveNext();
            }, 100);
          } else if (element?.className?.includes('success-modal')) {
            // Close modal on last step completion
            setTimeout(() => {
              setShowConfirmModal(false);
              setRunTour(false);
            }, 1000);
          }
        },
       
        popoverClass: isDarkTheme ? 'dark-theme-popover' : 'light-theme-popover',
      });

      driverObj.current.drive();

      return () => {
        driverObj.current?.destroy();
      };
    }
  }, [mounted, runTour, isDarkTheme]);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      
      if (isDarkTheme) {
        root.style.setProperty('--description-color', '#e5e5e5');
        root.style.setProperty('--border-color', '#20655D');
        root.style.setProperty('--close-btn-bg', '#2D4145');
        root.style.setProperty('--close-btn-color', '#FFFFFF');
        root.style.setProperty('--close-btn-hover-bg', '#1A2A2D');
        root.style.setProperty('--arrow-color', '#20655D');
        root.style.setProperty('--close-icon-color', '#FFFFFF');
        root.style.setProperty('--close-icon-hover-color', '#E5E7EB');
        root.style.setProperty('--progress-text-color', '#A1A1AA');
      } else {
        root.style.setProperty('--description-color', '#4B5563');
        root.style.setProperty('--border-color', '#e5e7eb');
        root.style.setProperty('--close-btn-bg', '#F3F4F6');
        root.style.setProperty('--close-btn-color', '#4B5563');
        root.style.setProperty('--close-btn-hover-bg', '#E5E7EB');
        root.style.setProperty('--arrow-color', '#e5e7eb');
        root.style.setProperty('--close-icon-color', '#4B5563');
        root.style.setProperty('--close-icon-hover-color', '#1F2937');
        root.style.setProperty('--progress-text-color', '#6B7280');
      }
    }
  }, [mounted, isDarkTheme]);

  const fetchBuyBarkData = async () => {
    try {
      const response = await getBuyBarkData();
      setBuyBarkData(response);
    } catch (err) {
      console.error('Error fetching buy bark data:', err);
    }
  };

  useEffect(() => {
    fetchBuyBarkData();
  }, []);

  const selectedLabel =
    [...MAIN_CRYPTOS, ...OTHER_CRYPTOS].find((c) => c.value === selected)?.label || 'ETH';

  const handleMaxClick = () => {
    setAmount(MAX_COIN.toString());
    setErrorMessage('');
  };

  const handleBuyClick = () => {
    if (!amount) {
      setErrorMessage('Please Enter Amount!');
      return;
    }
    setErrorMessage('');
    setShowConfirmModal(true);
  };

  return (
    <CustomWidgetCard title="Buy Bark"  className="">
    <div className="bg-lightgray-primary dark:bg-greenPrimary-secodarydark px-6 py-2  overflow-hidden w-full">
    

      <div className="text-center p-4">
        <Text className="dark:text-white text-xs text-gray-900 font-semibold">
          <span className="mr-2 font-medium text-xs text-greenPrimary-100">Rounds</span>1/2/3/4
        </Text>
      </div>

      <div className="flex flex-row text-center justify-center gap-3 lg:gap-32 md:gap-10 sm:gap-36 ">
        <Text className="dark:text-white text-gray-900 font-medium text-sm">
          <span className="text-greenPrimary-100 mr-2 text-xs font-medium flex flex-col">Total Coin Sales</span>
          {buyBarkData.totalCoin}
        </Text>
        <Text className="dark:text-white text-gray-900 font-medium text-sm">
          <span className="text-greenPrimary-100 mr-2 text-xs font-medium flex flex-col ">Total Coins Sold</span>
          {buyBarkData.TotalCoinsSold}
        </Text>
      </div>

      <div className="border-4 border-gray-100 dark:border-borderGray rounded-full mt-4 p-4 bg-light-gradient dark:bg-dark-gradient">
        <Text className="font-bold text-white dark:text-gray-950 text-sm">
          Remaining {buyBarkData.coinRemaining}
        </Text>
      </div>

      <div className="flex justify-between px-7 pb-7 font-medium">
        <Text className="dark:text-white text-gray-900 font-medium text-sm">
          <span className='font-medium text-sm'>1 $Mutt: </span>
          {buyBarkData.muttPrice}
        </Text>
        <Text className="dark:text-white text-gray-900 font-medium text-sm">
          <span className='font-medium text-sm'>Next Batch: </span>
          {buyBarkData.nextBatch}
        </Text>
      </div>

      <div className="crypto-selection-area ">
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  pb-7 pt-4 text-center text-sm font-semibold">
          {[...MAIN_CRYPTOS, ...(showOther ? OTHER_CRYPTOS : [])].map((crypto) => {
            const isSelected = selected === crypto.value;
            return (
              <label
                key={crypto.value}
                className={`cursor-pointer rounded-xl p-4 text-white font-semibold transition-all duration-200 relative border-2
                ${crypto.bgClass}
                ${
                  crypto.label === 'XPR'
                    ? 'border border-white'
                    : isSelected
                    ? 'border-white ring-1 ring-white'
                    : 'border-transparent'
                }`}
              >
                <input
                  type="radio"
                  name="currency"
                  value={crypto.value}
                  checked={isSelected}
                  onChange={() => setSelected(crypto.value)}
                  className="sr-only"
                />
                <span className="block">{crypto.label}</span>

                {isSelected && (
                  <FaCheck className="w-6 h-6 text-green-300 bg-white p-1 rounded-full absolute top-3 right-3" />
                )}
              </label>
            );
          })}
        </div>
        <div className=" pb-2">
          <Button
            variant="outline"
            className="w-full dark:bg-greenPrimary-300 bg-white border-none py-6 text-sm font-semibold dark:text-white text-gray-900 dark:hover:bg-greenPrimary-400 transition-all"
            onClick={() => setShowOther(!showOther)}
          >
            {showOther ? 'Hide Other Cryptos' : 'Other Cryptos'}
          </Button>
        </div>
      </div>

      <div className="amount-section">
        <div className=" py-6">
          <div className="flex rounded-lg overflow-hidden dark:bg-greenPrimary-300 bg-white ">
            <div className="px-4 flex items-center dark:bg-transparent bg-white dark:text-white text-gray-900 font-bold text-sm border-r my-2 dark:border-gray-900/50 ">
              {selectedLabel}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Enter Amount"
              className="flex-1 bg-transparent px-4 py-3 border-none ring-0 outline-0 focus:ring-0 focus:outline-0 dark:text-gray-900 text-gray-950 placeholder-gray-400 bg-greenPrimarydarkk text-sm font-normal"
            />
            <button
              onClick={handleMaxClick}
              className="dark:bg-greenPrimary-300 bg-white text-greenPrimary-100 px-4 font-medium text-xs"
            >
              MAX
            </button>
          </div>
          {errorMessage && (
            <Text className="mt-1 text-red-500 font-medium">{errorMessage}</Text>
          )}
          <Text className="mt-1 text-gray-400 font-normal text-xs">Min.Amount to purchase: 0.06576 BNB</Text>
          <Text className="dark:text-white text-gray-900  text-center mt-6 text-xs font-medium">
            <span className="text-gray-500">1$ = </span> 10,000 $MUTT
          </Text>
          <Button
            variant="outline"
            className="w-full dark:text-gray-100 text-gray-900 bg-yellow-primary font-bold mt-3 mb-1 text-sm"
            onClick={handleBuyClick}
          >
            Buy Coin
          </Button>
        </div>
      </div>

      <ConfirmTransaction
        show={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setRunTour(false);
        }}
        amount={amount}
        selectedCrypto={selectedLabel}
        muttAmount={(Number(amount) * 10000).toLocaleString()}
        showSuccessStep={showSuccessStep}
      />
    </div>
    </CustomWidgetCard>
  );
};

export default BarkBuy;
