import React, { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import CustomWidgetCard from "@/components/cards/custom-widget-card";
import { Button, Text, Modal } from "rizzui";
import { RxCross2 } from "react-icons/rx";

const WalletConnection = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("0x1234...abcd");
  const [referralCode] = useState("REF12345");
  const [addressCopied, setAddressCopied] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);
  const [totalMuttBalance] = useState(1000);
  const [earnedFromReferrals] = useState(200);
  const [currentCoinWorth] = useState(0.5);
  const [valueAtLaunch] = useState(2.0);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  const confirmDisconnect = () => {
    setShowModal(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setShowModal(false);
  };

  const handleConnect = () => {
    setIsConnected(true);
  };

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} className="" size="sm">
        <div className="p-6 relative bg-lightgray-primary dark:bg-greenPrimary-300 rounded-lg shadow-lg border-white dark:border-greenPrimary-300 border text-center">
          <div className="mb-6 items-center">
            <Text className="text-lg text-gray-800 ">Wallet Disconnect Confirmation</Text>
            <RxCross2 className="cursor-pointer absolute right-4 top-8 " onClick={() => setShowModal(false)} />
          </div>
          <Text className="text-2xl text-gray-900 font-bold mb-2">Are You Sure?</Text>
          <p className="text-sm text-gray-700 mb-6 px-4">Are You Sure You Want to Disconnect This Wallet</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="rounded-full w-full border border-yellow-primary text-yellow-primary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button className="bg-yellow-primary hover:bg-yellow-600 rounded-full w-full text-white" onClick={handleDisconnect}>
              Yes
            </Button>
          </div>
        </div>
      </Modal>

      <CustomWidgetCard title={isConnected ? "Connected Wallet" : "Connect Wallet"} shadow="left" className="w-full">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
            <img src="/money-mutt/empty-dog.svg" alt="Disconnected" className="w-24 h-24" />
            <Text className="text-gray-700 text-lg">Connect your wallet to submit memes, vote, and earn rewards.</Text>
            <Button onClick={handleConnect} className="bg-yellow-primary text-white px-6 py-2 rounded-md">
              Connect Wallet
            </Button>
          </div>
        ) : (
          <div className="">
            <div className="p-4 w-full">
              <div className="text-sm text-greenPrimary-100 font-medium">Wallet Type</div>

              <div className="flex items-center mb-6 mt-1">
                <img src="/money-mutt/wallet/meta-mask.svg" alt="Wallet Icon" className="w-8 h-8 mr-3" />
                <span className="text-sm  font-bold dark:text-gray-800">MetaMask</span>
              </div>

              <div className="flex justify-between items-center space-x-2 mb-4">
                <div>
                  <Text className="text-sm text-greenPrimary-100 font-medium">Wallet Address</Text>
                  <span className="text-base font-normal text-gray-800">{address}</span>
                  <button
                    onClick={copyAddress}
                    className="p-1 text-gray-800 hover:text-gray-800"
                    disabled={addressCopied}
                  >
                    {!addressCopied ? (
                      <MdOutlineContentCopy />
                    ) : (
                      <span className="text-sm text-green-500">Copied!</span>
                    )}
                  </button>
                </div>

                <Button
                  onClick={confirmDisconnect}
                  variant="outline"
                  className="text-sm font-medium text-yellow-primary dark:text-yellow-primary  py-2 px-4 rounded-md border border-yellow-primary"
                >
                  Disconnect
                </Button>
              </div>
            </div>

            <div className="border-b border-white dark:border-greenPrimary-300"></div>

            <div className="p-4">
              <div className="flex justify-between">
                <div className="w-full">
                  <div className="mb-4">
                    <Text className="text-sm text-greenPrimary-100 font-medium">Total $MUTT Balance</Text>
                    <div className="text-base font-semibold text-gray-800">{totalMuttBalance}</div>
                  </div>
                  <div className="mb-4">
                    <Text className="text-md flex gap-1 items-center text-greenPrimary-100 font-medium">
                      Referral Code <CiCircleInfo />
                    </Text>

                    <div className="flex items-center">
                      <span className="ttext-base font-semibold text-gray-800">{referralCode}</span>
                      <button
                        onClick={copyReferralCode}
                        className="ml-2 p-1 text-gray-800 hover:text-gray-800"
                        disabled={referralCopied}
                      >
                        {!referralCopied ? (
                          <MdOutlineContentCopy />
                        ) : (
                          <span className="text-sm text-green-500">Copied!</span>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Text className="text-sm text-greenPrimary-100 font-medium">Earned from Referrals</Text>
                    <div className="text-base font-semibold text-gray-800">{earnedFromReferrals}</div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="mb-4">
                    <Text className="text-sm text-greenPrimary-100 font-medium">Current Coin Worth in BNB</Text>
                    <div className="text-base font-semibold text-gray-800">{currentCoinWorth} BNB</div>
                  </div>

                  <div className="mb-4">
                    <Text className="text-sm text-greenPrimary-100 font-medium">Value at Launch</Text>
                    <div className="text-base font-semibold text-gray-800">{valueAtLaunch}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CustomWidgetCard>
    </>
  );
};

export default WalletConnection;
