
import { Customer } from '@/data/sampleData';

export const calculateRiskLevel = (score: number): 'low' | 'medium' | 'high' => {
  if (score < 30) return 'low';
  if (score < 60) return 'medium';
  return 'high';
};

export const getRiskColor = (score: number): string => {
  if (score < 30) return 'bg-gradient-to-r from-success-400 to-success-500';
  if (score < 60) return 'bg-gradient-to-r from-warning-400 to-warning-500';
  return 'bg-gradient-to-r from-danger-400 to-danger-500';
};

export const getRiskTextColor = (score: number): string => {
  if (score < 30) return 'text-success-600';
  if (score < 60) return 'text-warning-600';
  return 'text-danger-600';
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const getDaysUntilRenewal = (renewalDate: string): number => {
  const today = new Date();
  const renewal = new Date(renewalDate);
  const diffTime = Math.abs(renewal.getTime() - today.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getPrimaryChurnFactors = (customer: Customer): string[] => {
  const factors = [];

  if (customer.productUsage.frequency < 5) {
    factors.push('Low product usage frequency');
  }
  
  if (customer.productUsage.features < 8) {
    factors.push('Limited feature adoption');
  }
  
  if (customer.productUsage.satisfaction < 6) {
    factors.push('Low satisfaction score');
  }
  
  if (customer.lastLoginDays > 10) {
    factors.push('Inactivity (last login > 10 days ago)');
  }
  
  if (customer.supportInteractions > 7) {
    factors.push('High number of support interactions');
  }

  return factors.slice(0, 3); // Return top 3 factors
};

export const generateActionableInsights = (customer: Customer): string[] => {
  const riskLevel = calculateRiskLevel(customer.churnRisk);
  const insights = [];

  // Based on product usage
  if (customer.productUsage.frequency < 5) {
    insights.push('Increase engagement with personalized onboarding');
  }
  
  if (customer.productUsage.features < 8) {
    insights.push('Highlight unused features with targeted educational content');
  }
  
  // Based on satisfaction
  if (customer.productUsage.satisfaction < 6) {
    insights.push('Schedule a customer success call to identify pain points');
  }
  
  // Based on support interactions
  if (customer.supportInteractions > 7) {
    insights.push('Review support tickets for recurring issues');
  }
  
  // Based on last login
  if (customer.lastLoginDays > 10) {
    insights.push('Send a re-engagement email with new feature announcements');
  }

  // Based on contract renewal
  const daysUntilRenewal = getDaysUntilRenewal(customer.contractRenewal);
  if (daysUntilRenewal < 30 && customer.churnRisk > 50) {
    insights.push('Offer renewal incentive to secure next term');
  }

  return insights;
};
