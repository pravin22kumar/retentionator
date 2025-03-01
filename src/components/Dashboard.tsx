
import { useState } from 'react';
import { metrics, customers } from '@/data/sampleData';
import MetricsCard from './MetricsCard';
import CustomerTable from './CustomerTable';
import ChurnPredictor from './ChurnPredictor';
import ActionRecommendations from './ActionRecommendations';
import ChartSection from './ChartSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Users, BarChart2, Activity } from 'lucide-react';

const Dashboard = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <header className="mb-8">
        <div className="inline-block mb-2 px-2.5 py-1 bg-retention-100 rounded-md text-xs font-medium text-retention-700 animate-fade-in">
          Customer Intelligence Platform
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-retention-900 animate-fade-up">Retention Dashboard</h1>
        <p className="text-retention-500 max-w-2xl animate-fade-up">Predict customer churn and get actionable recommendations to improve retention rates.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricsCard key={index} metric={metric} />
        ))}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6 bg-muted/50">
          <TabsTrigger value="overview" className="flex items-center data-[state=active]:bg-white">
            <PieChart className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center data-[state=active]:bg-white">
            <Users className="w-4 h-4 mr-2" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="predictions" className="flex items-center data-[state=active]:bg-white">
            <Activity className="w-4 h-4 mr-2" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center data-[state=active]:bg-white">
            <BarChart2 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChurnPredictor customer={selectedCustomer} />
            <ActionRecommendations customer={selectedCustomer} />
          </div>
          
          <CustomerTable 
            customers={customers} 
            onSelectCustomer={setSelectedCustomer} 
          />
        </TabsContent>
        
        <TabsContent value="customers" className="mt-0">
          <CustomerTable 
            customers={customers} 
            onSelectCustomer={setSelectedCustomer} 
          />
        </TabsContent>
        
        <TabsContent value="predictions" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChurnPredictor customer={selectedCustomer} />
            <ActionRecommendations customer={selectedCustomer} />
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <ChartSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
