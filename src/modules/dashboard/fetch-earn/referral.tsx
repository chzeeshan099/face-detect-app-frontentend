"use client";
import React, { useState } from 'react';
import { Input, Button, Text } from "rizzui";
import { RiTwitterXFill } from 'react-icons/ri';
import { LiaTelegramPlane } from "react-icons/lia";
import { RiDiscordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToast } from '@/components/custom-toaster/CustomToast';
import CustomWidgetCard from '@/components/cards/custom-widget-card';

const Referral = () => {
  const [copied, setCopied] = useState(false);
  const value = "https://example.com/invite?ref=abcd1234";
      const CustomToastMessage = CustomToast();
  

  const handleCopyURL = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
    toast.dismiss();
    CustomToastMessage("Link Copied!", "Your referral link has been copied to clipboard.");
  };
  return (
    <>
      <CustomWidgetCard title="Share Your Referral Link" shadow='right'>
        <div className="p-4 mt-2">
          <div className="relative w-full bg-white dark:bg-greenPrimary-200 rounded-lg"
          >
            <Input
              value={value}
              readOnly
              inputClassName="border-none shadow-none ring-0 focus:ring-0 focus:shadow-none bg-white dark:bg-greenPrimary-200 text-black-light dark:text-white w-5/6"
            />
            <span
              onClick={handleCopyURL}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-1200 dark:text-gray-1100 text-xs font-bold cursor-pointer"
            >
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>
          <div className='w-full mt-5'>
            <Button className="w-full bg-yellow-primary text-dashBordCardsBG font-bold text-sm hover:bg-yellow-primary hover:dark:bg-yellow-primary">Share</Button>
          </div>
          <div className='w-full flex items-center justify-center my-5'>
            <div className='border-b border-green-darkk w-1/2'></div>
            <span className='px-2 font-medium text-xs text-black-light dark:text-white'>OR</span>
            <div className='border-b border-green-darkk w-1/2'></div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            <Button className="w-full flex items-center justify-center gap-2 bg-yellow-primary text-dashBordCardsBG font-bold text-sm hover:bg-yellow-primary hover:dark:bg-yellow-primary"><RiTwitterXFill className='text-white text-xl' /> X</Button>
            <Button className="w-full flex items-center justify-center gap-2 bg-blue-light text-dashBordCardsBG font-bold text-sm hover:bg-blue-light hover:dark:bg-blue-light"><LiaTelegramPlane className='text-white text-xl' /> Telegram</Button>
            <Button className="w-full flex items-center justify-center gap-2 bg-blue-lightest text-dashBordCardsBG font-bold text-sm hover:bg-blue-lightest hover:dark:bg-blue-lightest"> <RiDiscordLine className='text-white text-xl' /> Discord</Button>
          </div>
        </div>
      </CustomWidgetCard>
    </>
  );
};

export default Referral;
