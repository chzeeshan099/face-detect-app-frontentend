'use client'
import PreDetail from "../presale-details";
import SalesLedger from "../sales-ledger/sales-ledger";

import { Button, Text } from "rizzui";
import ProjectStatus from "./project-status";
import SecurityAlerts from "./security-alerts";
import TokenFunds from "./token-funds";
import UserActivity from "./user-activity";
import UserList from "../user-list";
import { useState } from "react";
import SecurityLog from "../securitylog";

const Dashboard = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [showSalesLedger, setShowSalesLedger] = useState(false);

  const [showpresale, setShowpresale] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const handleViewPreSale = () => {
    setShowpresale(true);
  };
  const handleViewUserList = () => {
    setShowUserList(true);
  };
  const handleViewSecuritylog = () => {
    setShowSecurity(true);
  };

  const handleViewSalesLedger = () => {
    setShowSalesLedger(true);
  };

  const handleBackToDashboard = () => {
    setShowUserList(false);
    setShowSalesLedger(false);
    setShowpresale(false);
    setShowSecurity(false);
  };

  if (showUserList) {
    return <UserList onBack={handleBackToDashboard} />;
  }

  if (showSalesLedger) {
    return <SalesLedger onBack={handleBackToDashboard} />;
  }

  if (showpresale) {
    return <PreDetail onBack={handleBackToDashboard} />;
    
  }
  if (showSecurity) {
    return <SecurityLog onBack={handleBackToDashboard} />;
  }
  
  return (
    <>
 
    <Text className="font-semibold text-2xl dark:text-white text-greenPrimary-secodarydark my-4">Administrative Dashboard</Text>
    <div className="flex gap-4 md:flex-row flex-col">
      <ProjectStatus onViewPreSale={handleViewPreSale}/>
      <TokenFunds onViewSalesLedger={handleViewSalesLedger} />
      
    </div>
    <div className="flex gap-4 md:flex-row flex-col mt-4">
      <UserActivity onViewUserList={handleViewUserList} />
      <SecurityAlerts onViewSecurity={handleViewSecuritylog} />
    </div>
   
    </>
  );
}

export default Dashboard;