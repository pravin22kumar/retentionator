
import { Metric } from '@/data/sampleData';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface MetricsCardProps {
  metric: Metric;
}

const MetricsCard = ({ metric }: MetricsCardProps) => {
  const { title, value, change, trend, isGood } = metric;
  
  // Determine the color based on whether the trend is good or bad
  const trendColor = (trend === 'up' && isGood) || (trend === 'down' && !isGood) 
    ? 'text-success-600' 
    : 'text-danger-600';
  
  // Determine the gradient based on metric type
  let gradientClass = '';
  if (title.includes('Retention')) {
    gradientClass = 'from-success-50 to-success-100';
  } else if (title.includes('Churn')) {
    gradientClass = 'from-danger-50 to-danger-100';
  } else if (title.includes('Risk')) {
    gradientClass = 'from-warning-50 to-warning-100';
  } else {
    gradientClass = 'from-retention-50 to-retention-100';
  }
  
  return (
    <div className={`metrics-card bg-gradient-to-br ${gradientClass} animate-scale-in hover:shadow-lg transition-all duration-300`}>
      <div className="flex flex-col h-full">
        <p className="text-sm font-medium text-retention-600 mb-1">{title}</p>
        <p className="text-3xl font-semibold tracking-tight mb-2">{value}</p>
        
        <div className="flex items-center mt-auto">
          <div className={`flex items-center ${trendColor}`}>
            {trend === 'up' ? (
              <ArrowUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownIcon className="w-4 h-4 mr-1" />
            )}
            <p className="text-sm font-medium">{Math.abs(change)}%</p>
          </div>
          <p className="text-xs text-retention-500 ml-2">vs last month</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
