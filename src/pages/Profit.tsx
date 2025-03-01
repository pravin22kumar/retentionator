
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { customers, metrics } from "@/data/sampleData";
import MetricsCard from "@/components/MetricsCard";
import ChartSection from "@/components/ChartSection";

const Profit = () => {
  // Just for the search functionality - not actually used on this page
  const handleSearch = (query: string) => {
    console.log("Search not implemented on Profit page:", query);
  };

  // Calculate some profit metrics
  const totalCustomers = customers.length;
  const totalLifetimeValue = customers.reduce((sum, customer) => sum + customer.lifetimeValue, 0);
  const avgLifetimeValue = totalLifetimeValue / totalCustomers;
  const avgChurnRisk = customers.reduce((sum, customer) => sum + customer.churnRisk, 0) / totalCustomers;

  // Custom metrics for profit page
  const profitMetrics = [
    {
      title: "Total Revenue",
      value: `$${totalLifetimeValue.toLocaleString()}`,
      change: 8.3,
      trend: "up" as const,
      isGood: true,
    },
    {
      title: "Avg. Customer Value",
      value: `$${avgLifetimeValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      change: 3.8,
      trend: "up" as const,
      isGood: true,
    },
    {
      title: "Avg. Churn Risk",
      value: `${avgChurnRisk.toLocaleString(undefined, { maximumFractionDigits: 1 })}%`,
      change: -2.1,
      trend: "down" as const,
      isGood: true,
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      change: 12.5,
      trend: "up" as const,
      isGood: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-retention-50">
      <Navbar onSearch={handleSearch} />
      
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-success-600 to-retention-700 bg-clip-text text-transparent">
            Profit Overview
          </h1>
          <p className="text-retention-500">
            Financial insights and projections based on customer retention.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {profitMetrics.map((metric, index) => (
            <MetricsCard key={index} metric={metric} />
          ))}
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-retention-100">
          <h2 className="text-xl font-semibold mb-6 text-retention-800">Revenue Projections</h2>
          <ChartSection />
        </div>
      </div>
    </div>
  );
};

export default Profit;
