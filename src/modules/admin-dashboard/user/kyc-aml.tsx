import CustomWidgetCard from '@/components/cards/custom-widget-card';
import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Button, Checkbox, Text } from 'rizzui';
import { useState } from 'react';

const KycAml = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const kycProviders = [
    { id: 1, name: 'Provider 1' },
    { id: 2, name: 'Provider 2' },
    { id: 3, name: 'Provider 3' },
  ];

  const verificationLevels = [
    { id: 1, name: 'Level 1' },
    { id: 2, name: 'Level 2' },
    { id: 3, name: 'Level 3' },
  ];

  return (
    <>
      <CustomWidgetCard
        title="KYC/AML Status & Management"
        shadow="right"
        className="w-full"
      >
        <div className="flex flex-col gap-4 p-4">
          <div>
            <Text className="text-sm font-medium text-greenPrimary-100">
              Current Status
            </Text>
            <Text className="mt-1 text-base font-semibold text-greenPrimary-700 dark:text-white">
              Verified
            </Text>
          </div>

          <div>
            <Text className="text-sm font-medium text-greenPrimary-100">
              Verified By
            </Text>
            <Text className="mt-1 text-base font-semibold text-greenPrimary-700 dark:text-white">
              Admin
            </Text>
          </div>

          <div>
            <Text className="text-sm font-medium text-greenPrimary-100">
              Provider ID
            </Text>
            <Text className="mt-1 text-base font-semibold text-greenPrimary-700 dark:text-white">
              -
            </Text>
          </div>

          <div className="mt-10">
            <Button
              className="w-full !bg-yellow-primary px-6 font-semibold text-greenPrimary-secodarydark hover:bg-yellow-primary"
              onClick={handleModalOpen}
            >
              Re-Verify Identity
            </Button>
          </div>
        </div>
      </CustomWidgetCard>

      {isModalOpen && (
        <div className=" fixed inset-0 z-50 grid place-items-center  px-4">
          <div className="w-full max-w-[650px] rounded-lg bg-white p-0 shadow-lg dark:bg-greenPrimary-200">
            <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
              {/* Heading */}
              <div className="relative mb-4 pb-3 text-center">
                <Text className="text-sm font-semibold dark:text-white sm:text-base">
                  Re-verify User Identity
                </Text>
                <button
                  onClick={handleModalClose}
                  className="absolute right-0 top-0 text-lg font-bold hover:text-gray-700 dark:text-white sm:text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Info Grid */}
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Text className="text-xs font-medium text-greenPrimary-100 sm:text-sm">
                    User Email
                  </Text>
                  <Text className="text-sm font-semibold dark:text-white sm:text-base">
                    user@example.com
                  </Text>
                </div>
                <div>
                  <Text className="text-xs font-medium text-greenPrimary-100 sm:text-sm">
                    Current KYC Status
                  </Text>
                  <Text className="text-sm font-semibold dark:text-white sm:text-base">
                    Verified (Expired)
                  </Text>
                </div>
                <div>
                  <Text className="text-xs font-medium text-greenPrimary-100 sm:text-sm">
                    Last Verification Attempt
                  </Text>
                  <Text className="text-sm font-semibold dark:text-white sm:text-base">
                    April 22, 2025
                  </Text>
                </div>
                <div>
                  <Text className="text-xs font-medium text-greenPrimary-100 sm:text-sm">
                    Last Verification Status
                  </Text>
                  <Text className="text-sm font-semibold dark:text-white sm:text-base">
                    Success
                  </Text>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-gray-300 dark:border-[#173A3E]" />

              {/* Dropdown Grid */}
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <select className="w-full cursor-pointer appearance-none rounded border border-none bg-lightgray-primary p-2 text-xs font-normal focus:outline-none focus:ring-0 dark:border-greenPrimary-300  dark:bg-dashBordCardsBG dark:text-black-light sm:p-3 sm:text-sm">
                    <option className="border text-gray-500 dark:border-greenPrimary-300 dark:text-gray-400">
                      Select KYC provider
                    </option>
                    {kycProviders.map((provider) => (
                      <option
                        key={provider.id}
                        value={provider.id}
                        className="text-black cursor-pointer bg-lightgray-primary dark:bg-dashBordCardsBG dark:text-white"
                        style={{ cursor: 'pointer' }}
                      >
                        {provider.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center">
                    <FaAngleDown />
                  </span>
                </div>
                <div className="relative">
                  <select className="w-full cursor-pointer appearance-none rounded border border-none bg-lightgray-primary p-2 text-xs font-normal focus:outline-none focus:ring-0 dark:border-greenPrimary-300  dark:bg-dashBordCardsBG dark:text-black-light sm:p-3 sm:text-sm">
                    <option className="text-gray-500 dark:text-gray-400">
                      Select verification level
                    </option>
                    {verificationLevels.map((level) => (
                      <option
                        key={level.id}
                        value={level.id}
                        className="text-black cursor-pointer bg-lightgray-primary dark:bg-dashBordCardsBG dark:text-white"
                        style={{ cursor: 'pointer' }}
                      >
                        {level.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center">
                    <FaAngleDown />
                  </span>
                </div>
              </div>

              {/* Checkbox */}
              <div className="mb-4 grid grid-cols-[auto_1fr] items-center gap-2">
                <Checkbox
                  type="checkbox"
                  id="full-resubmission"
                  inputClassName="border-yellow-primary dark:border-yellow-primary hover:outline-none focus:outline-none"
                />
                <label
                  htmlFor="full-resubmission"
                  className="text-xs dark:text-white sm:text-sm"
                >
                  Require Full Re-submission
                </label>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Button
                  className="text-black w-full border-gray-200 !bg-transparent px-4 py-2 text-sm font-semibold sm:text-base"
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
                <Button className="w-full !bg-yellow-primary px-4 py-2 text-sm font-semibold text-greenPrimary-secodarydark hover:bg-yellow-primary sm:text-base">
                  Initiate Re-verification
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KycAml;
