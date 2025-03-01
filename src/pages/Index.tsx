
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import { customers } from "@/data/sampleData";

const Index = () => {
  const navigate = useNavigate();
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

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
      <Dashboard filteredCustomers={filteredCustomers} />
    </div>
  );
};

export default Index;
