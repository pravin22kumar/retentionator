
import { Customer, recommendations } from '@/data/sampleData';
import { generateActionableInsights, calculateRiskLevel } from '@/utils/predictiveUtils';
import { LightbulbIcon, CheckCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ActionRecommendationsProps {
  customer: Customer;
}

const ActionRecommendations = ({ customer }: ActionRecommendationsProps) => {
  const riskLevel = calculateRiskLevel(customer.churnRisk);
  const insights = generateActionableInsights(customer);
  const recommendationList = recommendations[riskLevel];
  
  const [completedActions, setCompletedActions] = useState<number[]>([]);
  
  const handleActionComplete = (index: number) => {
    if (completedActions.includes(index)) {
      setCompletedActions(completedActions.filter(i => i !== index));
      toast.success('Action marked as incomplete');
    } else {
      setCompletedActions([...completedActions, index]);
      toast.success('Action marked as completed');
    }
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-fade-up">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">Recommended Actions</h3>
        <p className="text-sm text-retention-500">
          Based on {customer.name}'s risk profile and behavior
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <LightbulbIcon className="w-4 h-4 text-warning-500 mr-2" />
          <h4 className="text-sm font-medium">Key Insights</h4>
        </div>
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="text-sm pl-6 relative">
              <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-warning-400"></span>
              {insight}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-3">Action Plan</h4>
        <ul className="space-y-3">
          {recommendationList.map((action, index) => (
            <li 
              key={index} 
              className={`flex items-start p-3 rounded-lg transition-all 
                ${completedActions.includes(index) 
                  ? 'bg-success-50 text-success-800' 
                  : 'bg-gray-50 hover:bg-gray-100'}`}
            >
              <button 
                className="flex-shrink-0 mt-0.5 mr-3 focus:outline-none"
                onClick={() => handleActionComplete(index)}
              >
                <CheckCircleIcon 
                  className={`w-5 h-5 ${
                    completedActions.includes(index) 
                      ? 'text-success-500' 
                      : 'text-gray-300 hover:text-gray-400'
                  }`} 
                />
              </button>
              <span className="text-sm">{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActionRecommendations;
