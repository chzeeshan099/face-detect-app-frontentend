import React from 'react';
import { Button, Modal, Text } from 'rizzui';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-sm mx-auto"
    >
      <div className="p-5 text-center bg-white dark:bg-greenPrimary-200 rounded-lg shadow-lg relative">
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white"
          aria-label="Close"
        >
          <IoClose className="text-xl" />
        </button>
        <div className="flex justify-center my-4">
          <div className="relative">
            <motion.div 
              className="absolute inset-0 rounded-full bg-green-400/20"
              animate={{ 
                scale: [1, 1.8, 1.8],
                opacity: [0.7, 0.2, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            <motion.div 
              className="absolute inset-0 rounded-full bg-green-400/30"
              animate={{ 
                scale: [1, 1.5, 1.5],
                opacity: [0.7, 0.2, 0]
              }}
              transition={{ 
                duration: 1.5,
                delay: 0.2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center relative z-10">
              <motion.div
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                >
                  <FaCheck className="text-green-500 text-2xl" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        <Text className="text-lg font-medium text-greenPrimary-100 dark:text-white mb-2">Settings Saved</Text>
        <Text className="text-greenPrimary-700 dark:text-white text-base px-4 mb-4 ">Cap settings have been successfully saved.</Text>
        <Button onClick={onClose} className=" !bg-yellow-primary hover:bg-yellow-primary text-gray-1300 font-semibold px-6">
          Return
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;