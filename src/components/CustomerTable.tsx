
import { Customer } from '@/data/sampleData';
import { calculateRiskLevel, formatCurrency, getRiskTextColor } from '@/utils/predictiveUtils';
import { useState } from 'react';
import { 
  ArrowUpDown, 
  Search,
  AlertTriangle,
  CheckCircle2,
  FileWarning
} from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerTable = ({ customers, onSelectCustomer }: CustomerTableProps) => {
  const [sortField, setSortField] = useState<keyof Customer>('churnRisk');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSort = (field: keyof Customer) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
    } else if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sortDirection === 'asc' 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
    
    return 0;
  });
  
  const getRiskIcon = (churnRisk: number) => {
    const riskLevel = calculateRiskLevel(churnRisk);
    if (riskLevel === 'high') {
      return <AlertTriangle className="w-4 h-4 text-danger-500" />;
    } else if (riskLevel === 'medium') {
      return <FileWarning className="w-4 h-4 text-warning-500" />;
    }
    return <CheckCircle2 className="w-4 h-4 text-success-500" />;
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-fade-up">
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search customers..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-retention-200 focus:border-retention-300 transition-colors text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-xs font-medium text-retention-500 uppercase tracking-wider">
              <th className="px-6 py-3 text-left">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('name')}
                >
                  Customer
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">Segment</th>
              <th className="px-6 py-3 text-left">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('churnRisk')}
                >
                  Churn Risk
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('lifetimeValue')}
                >
                  LTV
                  <ArrowUpDown className="ml-1 w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedCustomers.map((customer) => (
              <tr 
                key={customer.id} 
                className="text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onSelectCustomer(customer)}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-retention-800">{customer.name}</p>
                    <p className="text-xs text-retention-500">{customer.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-retention-800">
                    {customer.segment}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {getRiskIcon(customer.churnRisk)}
                    <span className={`ml-2 ${getRiskTextColor(customer.churnRisk)}`}>
                      {customer.churnRisk}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {formatCurrency(customer.lifetimeValue)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="text-xs font-medium text-retention-600 hover:text-retention-800 transition-colors focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCustomer(customer);
                    }}
                  >
                    Analyze
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
