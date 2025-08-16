'use client';

import React, { useState } from 'react'
import { Button, Modal, Text, Textarea } from 'rizzui'
import { RiCloseLine } from 'react-icons/ri'

interface EmergencyActivePauseProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'emergency' | 'maintenance';
}

const EmergencyActivePause: React.FC<EmergencyActivePauseProps> = ({ isOpen, onClose, type }) => {
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    console.log(`Confirmed ${type} pause with note: ${note}`);
    onClose();
  };

  const isEmergency = type === 'emergency';
  const title = isEmergency ? 'Confirm Emergency Pause' : 'Confirm Activate Maintenance Mode';
  const message = isEmergency 
    ? 'This will manually trigger the token distribution sync process. Ensure you understand the implications before proceeding.' 
    : 'Activating Maintenance Mode will make the system temporarily unavailable to users and display a maintenance message.';
  const placeholder = isEmergency 
    ? 'Add brief note for emergency pause' 
    : 'Add brief note for maintenance mode';
  const confirmButtonText = isEmergency ? 'Confirm Emergency Pause' : 'Confirm Activate';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className=""
    >
      <div className="relative overflow-hidden dark:bg-greenPrimary-200 p-6 rounded-lg">
        <div className="flex justify-center items-center mb-4">
          <Text className="text-base dark:text-white text-center text-greenPrimary-100 font-semibold">{title}</Text>
          <Button
            variant="text"
            onClick={onClose}
            className="h-auto p-0 absolute top-6 right-6 dark:text-white text-greenPrimary-1000 hover:text-gray-900"
          >
            <RiCloseLine className="h-6 w-6" />
          </Button>
        </div>

        <div className="border border-red-100 mt-9 dark:bg-transparent  text-red-100 rounded-md p-3 mb-4">
          <Text className="text-sm">{message}</Text>
        </div>

        <textarea
          
          placeholder={placeholder}
          value={note}
          rows={4}
          onChange={(e) => setNote(e.target.value)}
          className="mb-4 w-full dark:bg-greenPrimary-secodarydark bg-lightgray-primary dark:placeholder:text-white border dark:!border-greenPrimary-300 border-none !hover:border-none !focus:border-none !ring-0 !focus:ring-0 !outline-none !focus:outline-none rounded-lg"
          
        />

        <div className="flex justify-end gap-3 mt-3">
          <Button

            onClick={onClose}
            className="border-gray-300 w-full dark:border-greenPrimary-700 dark:text-white text-black-light dark:!bg-transparent bg-white hover:!bg-gray-100 dark:hover:bg-greenPrimary-700 "
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="!bg-yellow-primary w-full hover:!bg-yellow-600 text-greenPrimary-secodarydark font-semibold"
          >
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EmergencyActivePause