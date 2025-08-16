'use client';
import React, { useState } from 'react';
import ContributorChart from './contributor-chart';
import TopContributors from './top-contri';
import Referralchart from './Referral-section';
import Geographical from './Geographical-chart';
import Security from './Security';
import DDoSLogs from './ddos-incident';
import BotLogs from '../analytics/bot-activity/index ';
import DetectionRule from '../analytics/bot-activity/detection-rule';
import NewRule from './models/newrule'

const Index = () => {
  const [showDDoSLogs, setShowDDoSLogs] = useState(false);
  const [viewBotLogs, setViewBotLogs] = useState(false);
  const [viewDetectionRule, setViewDetectionRule] = useState(false);

  const viewBotLog = () => {
    setViewBotLogs(true);
    setShowDDoSLogs(false);
    setViewDetectionRule(false);
  };

  const viewDetectionRules = () => {
    setViewDetectionRule(true);
    setViewBotLogs(false); // Important: hide BotLogs when showing DetectionRule
    setShowDDoSLogs(false);
  };

  const viewDDoSLogs = () => {
    setShowDDoSLogs(true);
    setViewBotLogs(false);
    setViewDetectionRule(false);
  };

  const handleBackFromDDoS = () => setShowDDoSLogs(false);
  const handleBackFromBotLogs = () => setViewBotLogs(false);
  const handleBackFromDetectionRules = () => {
    setViewDetectionRule(false);
    setViewBotLogs(true); 
  };

  if (showDDoSLogs) {
    return <DDoSLogs onBack={handleBackFromDDoS} />;
  }

  if (viewBotLogs) {
    return <BotLogs onViewDetectionRules={viewDetectionRules} onBack={handleBackFromBotLogs} />;
  }

  if (viewDetectionRule) {
    return <DetectionRule onBack={handleBackFromDetectionRules} onSearch={() => {}} title="Detection Rules Configuration" />;
  }

  return (
    <>
      <div className="mb-4 mt-3 text-2xl font-medium text-gray-1200 dark:text-white">
        Analytics & Reporting
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <ContributorChart />
        <TopContributors />
      </div>
      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <Referralchart />
        <Geographical />
      </div>
      <div className="mt-4">
        <Security onViewDDoSLogs={viewDDoSLogs} onViewBotLogs={viewBotLog} />
      </div>
    </>
  );
};

export default Index;
