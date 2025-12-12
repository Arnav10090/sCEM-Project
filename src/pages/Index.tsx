import { useState } from 'react';
import Header from '@/components/layout/Header';
import ScrollingAlert from '@/components/layout/ScrollingAlert';
import Navigation, { PageName } from '@/components/layout/Navigation';
import KPICards from '@/components/layout/KPICards';
import Footer from '@/components/layout/Footer';
import MainDashboard from '@/components/pages/MainDashboard';
import EquipmentVerification from '@/components/pages/EquipmentVerification';
import ParameterMonitoring from '@/components/pages/ParameterMonitoring';
import EquipmentConfiguration from '@/components/pages/EquipmentConfiguration/EquipmentConfiguration';
import PlanningReports from '@/components/pages/PlanningReports';
import Alarms from '@/components/pages/Alarms';
import SystemArchitecture from '@/components/pages/SystemArchitecture';
import SpareTab from '@/components/pages/SpareTab';

const pagesWithKPI: PageName[] = ['Main Dashboard', 'Equipment Verification', 'Parameter Monitoring', 'Equipment Configuration'];

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('Main Dashboard');

  const showKPICards = pagesWithKPI.includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'Main Dashboard':
        return <MainDashboard />;
      case 'Equipment Verification':
        return <EquipmentVerification />;
      case 'Parameter Monitoring':
        return <ParameterMonitoring />;
      case 'Equipment Configuration':
        return <EquipmentConfiguration />;
      case 'Planning & Reports':
        return <PlanningReports />;
      case 'Alarms':
        return <Alarms />;
      case 'System Architecture':
        return <SystemArchitecture />;
      case 'Spare Tab':
        return <SpareTab />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Fixed Header Section */}
      <Header currentPage={currentPage} />
      <ScrollingAlert />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Conditional KPI Cards */}
      {showKPICards && <KPICards />}

      {/* Main Content Area */}
      <main className="flex-1 p-4 pb-32 overflow-auto">
        {renderPage()}
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default Index;
