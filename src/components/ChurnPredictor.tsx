
import { useState } from 'react';
import { Customer } from '@/data/sampleData';
import { calculateRiskLevel, getRiskColor, getRiskTextColor, formatCurrency, formatDate, getDaysUntilRenewal, getPrimaryChurnFactors } from '@/utils/predictiveUtils';
import { AlertTriangleIcon, CalendarIcon, DollarSignIcon, BarChartIcon } from 'lucide-react';

interface ChurnPredictorProps {
  customer: Customer;
}

const ChurnPredictor = ({ customer }: ChurnPredictorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const riskLevel = calculateRiskLevel(customer.churnRisk);
  const riskColor = getRiskColor(customer.churnRisk);
  const riskTextColor = getRiskTextColor(customer.churnRisk);
  const churnFactors = getPrimaryChurnFactors(customer);
  const daysToRenewal = getDaysUntilRenewal(customer.contractRenewal);
  
  return (
    <div className="prediction-card bg-white border border-gray-100 shadow-sm animate-fade-up">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-medium text-retention-400 mb-1">Customer</p>
            <h3 className="text-xl font-semibold">{customer.name}</h3>
            <p className="text-sm text-retention-500">{customer.segment} • {customer.email}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${riskTextColor}`}>
              {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${riskColor} transition-all duration-500 ease-out`} 
              style={{ width: `${customer.churnRisk}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-retention-400">Low Risk</span>
            <span className="text-xs text-retention-400">High Risk</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <DollarSignIcon className="w-4 h-4 text-retention-400 mr-1" />
              <span className="text-xs font-medium text-retention-500">Lifetime Value</span>
            </div>
            <span className="text-sm font-semibold">{formatCurrency(customer.lifetimeValue)}</span>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <CalendarIcon className="w-4 h-4 text-retention-400 mr-1" />
              <span className="text-xs font-medium text-retention-500">Renewal</span>
            </div>
            <span className="text-sm font-semibold">{formatDate(customer.contractRenewal)}</span>
            <span className="text-xs text-retention-400">{daysToRenewal} days left</span>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center mb-1">
              <BarChartIcon className="w-4 h-4 text-retention-400 mr-1" />
              <span className="text-xs font-medium text-retention-500">Usage</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-semibold">{customer.productUsage.frequency.toFixed(1)}/10</span>
              <span className="text-xs ml-1 text-retention-400">freq.</span>
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 animate-fade-up">
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <AlertTriangleIcon className="w-4 h-4 mr-1 text-warning-500" />
                Primary Risk Factors
              </h4>
              <ul className="space-y-2">
                {churnFactors.map((factor, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning-500 mt-1.5 mr-2"></span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Customer Details</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex flex-col">
                  <span className="text-xs text-retention-400">Days Active</span>
                  <span className="text-sm">{customer.daysActive}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-retention-400">Last Login</span>
                  <span className="text-sm">{customer.lastLoginDays} days ago</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-retention-400">Features Used</span>
                  <span className="text-sm">{customer.productUsage.features}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-retention-400">Support Tickets</span>
                  <span className="text-sm">{customer.supportInteractions}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <button 
          className="mt-4 text-xs font-medium text-retention-600 hover:text-retention-800 transition-colors focus:outline-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>
    </div>
  );
};

export default ChurnPredictor;
