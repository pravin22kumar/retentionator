
import { Link, useNavigate } from "react-router-dom";
import { Home, Users, DollarSign, Search, LogOut } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication state
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-10 bg-gradient-to-r from-retention-50 to-retention-100 backdrop-blur-sm border-b border-retention-200 px-4 py-3 mb-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-xl font-bold bg-gradient-to-r from-success-600 to-retention-700 bg-clip-text text-transparent">
            CustomerIQ
          </h1>
          <div className="hidden md:flex ml-8 space-x-6">
            <Link 
              to="/" 
              className="flex items-center text-retention-700 hover:text-retention-900 transition-colors"
            >
              <Home className="w-4 h-4 mr-1.5" />
              Dashboard
            </Link>
            <Link 
              to="/customers" 
              className="flex items-center text-retention-700 hover:text-retention-900 transition-colors"
            >
              <Users className="w-4 h-4 mr-1.5" />
              Customers
            </Link>
            <Link 
              to="/profit" 
              className="flex items-center text-retention-700 hover:text-retention-900 transition-colors"
            >
              <DollarSign className="w-4 h-4 mr-1.5" />
              Profit
            </Link>
          </div>
        </div>
        
        <div className="flex w-full md:w-auto items-center space-x-3">
          <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-9 pr-4 py-2 bg-white/80 border-retention-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-retention-400" />
          </form>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="text-retention-700 hover:text-danger-600 hover:bg-danger-50"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
