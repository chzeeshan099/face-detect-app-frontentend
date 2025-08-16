
import { preSaleDetailsData } from "@/constants/admindashboard";
import { amlProvider, chainlogData, marketingData, webhooksData, currentStatusData } from "@/constants/advanced";
import { stagesConfigurationData } from "@/constants/presale";
import { current } from "@reduxjs/toolkit";
export const getpreSaleDetailsDataApi = async ( ) => {
    // const response = await axiosInstancePrivate.get('/users/company-users')
    return preSaleDetailsData;

};


export const getstagesConfigurationDataApi = async ( ) => {
    // const response = await axiosInstancePrivate.get('/users/company-users')
    return stagesConfigurationData;

};


export const getwebhooksDataApi = async ( ) => {
    // const response = await axiosInstancePrivate.get('/users/company-users')
    return webhooksData;

};


export const getamlProviderApi = async ( ) => {
    // const response = await axiosInstancePrivate.get('/users/company-users')
    return amlProvider;

};
export const getCurrentStatusApi = async ( ) => {
    // const response = await axiosInstancePrivate.get('/users/company-users')
    return currentStatusData;

};



export const  getmarketingDataApi = async ( ) => {
    // const response = await axiosInstancePrivate.get('/users/company-users')
    return  marketingData;

};

export const  getchainlogDataApi = async ( ) => {
    // const response = await axiosInstancePrivate.get('/users/company-users')
    return  chainlogData;

};


