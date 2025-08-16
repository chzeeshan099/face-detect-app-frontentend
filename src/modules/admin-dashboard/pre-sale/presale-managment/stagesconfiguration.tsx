'use client'
import CustomWidgetCard from '@/components/cards/custom-widget-card'
import React, { useState } from 'react'
import Table from './table/table'
import { Input, Text } from 'rizzui'
import { Select } from "rizzui";
import NewPresaleModel from './newPresale-model'

const StagesConfiguration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CustomWidgetCard
        title="Defined Stages Configuration"
        shadow="left"
        className='mt-4'
        button={{
          text: "Add New Stage",
          onClick: handleOpenModal
        }}
      >
        <Table />
      </CustomWidgetCard>

      <NewPresaleModel 
        isModalOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  )
}

export default StagesConfiguration