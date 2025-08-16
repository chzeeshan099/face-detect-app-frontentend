"use client";
import React, { useState } from 'react';
import { Checkbox } from "rizzui";
import { QRCodeSVG } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import { FiRefreshCw } from "react-icons/fi";
import CustomWidgetCard from '@/components/cards/custom-widget-card';

const QRCodeGenerator = () => {
  const [value, setValue] = useState(uuidv4());

  const regenerateQR = () => {
    setValue(uuidv4());
  };
  return (
    <>
      <CustomWidgetCard title="QR Code Generator" shadow='right'>
        <div className='px-4'>
          <div className="flex justify-between sm:grid sm:grid-cols-2 my-5">
            <Checkbox
              inputClassName="
    border-yellow-primary 
    bg-transparent
    text-black 
    ring-0 
    focus:ring-0 
    focus:ring-offset-0 
    focus:outline-none 
    checked:bg-yellow-primary
    checked:text-black-light 
    dark:checked:text-white
  "
              label="Include wallet address"
              labelPlacement="right"
              labelClassName="text-black-light dark:text-white"
              size="sm"
            />
            <Checkbox
              inputClassName="
        border-yellow-primary
        bg-transparent 
        ring-0 
        focus:ring-0 
        focus:ring-offset-0 
        focus:outline-none 
        checked:bg-yellow-primary
      "
              label="Include referral link"
              labelPlacement="right"
              labelClassName="text-black-light dark:text-white"
              size='sm'
            />
          </div>
          <div className="text-center flex flex-col justify-center items-center">
            <QRCodeSVG value={value} size={130} bgColor="black" fgColor="white" />
            <p
              onClick={regenerateQR}
              className="text-yellow-primary my-4 cursor-pointer flex items-center justify-center gap-3"
            >
              <FiRefreshCw /> Regenerate QR Code
            </p>
          </div>
        </div>
      </CustomWidgetCard>
    </>
  )
}
export default QRCodeGenerator