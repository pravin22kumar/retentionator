
import { useState } from "react";
import { customers } from "@/data/sampleData";
import Navbar from "@/components/Navbar";
import CustomerTable from "@/components/CustomerTable";
import ChurnPredictor from "@/components/ChurnPredictor";
import ActionRecommendations from "@/components/ActionRecommendations";

const Customers = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  const handleSearch = (query: string) => {
    const filtered = customers.filter(customer => 
      customer.name.toLowerCase().includes(query.toLowerCase()) ||
      customer.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-retention-50">
      <Navbar onSearch={handleSearch} />
      
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-retention-700 to-retention-900 bg-clip-text text-transparent">
            Customer Information
          </h1>
          <p className="text-retention-500">
            Detailed information about your customers and their churn risk.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChurnPredictor customer={selectedCustomer} />
          <ActionRecommendations customer={selectedCustomer} />
        </div>
        
        <CustomerTable 
          customers={filteredCustomers} 
          onSelectCustomer={setSelectedCustomer} 
        />
      </div>
    </div>
  );
};

export default Customers;
