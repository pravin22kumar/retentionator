
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
  
  return (
    <div className="metrics-card animate-scale-in">
      <div className="flex flex-col h-full">
        <p className="text-sm font-medium text-retention-500 mb-1">{title}</p>
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
          <p className="text-xs text-retention-400 ml-2">vs last month</p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
