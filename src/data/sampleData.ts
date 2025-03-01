
export interface Customer {
  id: string;
  name: string;
  email: string;
  segment: 'Enterprise' | 'SMB' | 'Startup';
  churnRisk: number; // 0-100
  lifetimeValue: number; // in dollars
  daysActive: number;
  lastLoginDays: number;
  productUsage: {
    frequency: number; // 0-10
    features: number; // count of features used
    satisfaction: number; // 0-10
  };
  supportInteractions: number;
  contractRenewal: string; // date string
}

export interface Metric {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
  isGood: boolean;
}

export const metrics: Metric[] = [
  {
    title: 'Retention Rate',
    value: '78.4%',
    change: 2.1,
    trend: 'up',
    isGood: true,
  },
  {
    title: 'Churn Rate',
    value: '21.6%',
    change: -2.1,
    trend: 'down',
    isGood: true,
  },
  {
    title: 'At-Risk Customers',
    value: 42,
    change: -5,
    trend: 'down',
    isGood: true,
  },
  {
    title: 'Avg. Customer LTV',
    value: '$4,280',
    change: 3.8,
    trend: 'up',
    isGood: true,
  },
];

export const churnFactors = [
  { name: 'Low product usage', weight: 35 },
  { name: 'Poor support experience', weight: 25 },
  { name: 'Competitor offerings', weight: 20 },
  { name: 'Price sensitivity', weight: 15 },
  { name: 'Missing features', weight: 5 },
];

export const retentionBySegment = [
  { segment: 'Enterprise', retained: 92, churned: 8 },
  { segment: 'SMB', retained: 76, churned: 24 },
  { segment: 'Startup', retained: 68, churned: 32 },
];

export const customers: Customer[] = [
  {
    id: 'C1001',
    name: 'Acme Corporation',
    email: 'contact@acmecorp.com',
    segment: 'Enterprise',
    churnRisk: 12,
    lifetimeValue: 128500,
    daysActive: 842,
    lastLoginDays: 2,
    productUsage: {
      frequency: 8.5,
      features: 18,
      satisfaction: 8,
    },
    supportInteractions: 5,
    contractRenewal: '2024-08-15',
  },
  {
    id: 'C1002',
    name: 'TechStart Inc',
    email: 'info@techstart.io',
    segment: 'Startup',
    churnRisk: 76,
    lifetimeValue: 12800,
    daysActive: 175,
    lastLoginDays: 12,
    productUsage: {
      frequency: 3.2,
      features: 4,
      satisfaction: 5.5,
    },
    supportInteractions: 8,
    contractRenewal: '2024-04-30',
  },
  {
    id: 'C1003',
    name: 'Global Solutions Ltd',
    email: 'support@globalsolutions.com',
    segment: 'Enterprise',
    churnRisk: 8,
    lifetimeValue: 215400,
    daysActive: 1205,
    lastLoginDays: 1,
    productUsage: {
      frequency: 9.7,
      features: 24,
      satisfaction: 9.2,
    },
    supportInteractions: 3,
    contractRenewal: '2025-01-10',
  },
  {
    id: 'C1004',
    name: 'Mid-Market Ventures',
    email: 'operations@mmventures.co',
    segment: 'SMB',
    churnRisk: 43,
    lifetimeValue: 38700,
    daysActive: 390,
    lastLoginDays: 5,
    productUsage: {
      frequency: 6.1,
      features: 10,
      satisfaction: 6.5,
    },
    supportInteractions: 12,
    contractRenewal: '2024-06-22',
  },
  {
    id: 'C1005',
    name: 'Bright Innovations',
    email: 'hello@brightinnovate.org',
    segment: 'Startup',
    churnRisk: 82,
    lifetimeValue: 8400,
    daysActive: 120,
    lastLoginDays: 18,
    productUsage: {
      frequency: 2.8,
      features: 3,
      satisfaction: 4.2,
    },
    supportInteractions: 6,
    contractRenewal: '2024-03-05',
  },
  {
    id: 'C1006',
    name: 'Smith & Partners',
    email: 'admin@smithpartners.net',
    segment: 'SMB',
    churnRisk: 34,
    lifetimeValue: 42600,
    daysActive: 415,
    lastLoginDays: 4,
    productUsage: {
      frequency: 7.2,
      features: 12,
      satisfaction: 7.8,
    },
    supportInteractions: 4,
    contractRenewal: '2024-09-18',
  },
  {
    id: 'C1007',
    name: 'Enterprise Systems',
    email: 'solutions@enterprisesys.com',
    segment: 'Enterprise',
    churnRisk: 15,
    lifetimeValue: 186000,
    daysActive: 780,
    lastLoginDays: 1,
    productUsage: {
      frequency: 9.1,
      features: 20,
      satisfaction: 8.5,
    },
    supportInteractions: 7,
    contractRenewal: '2024-11-30',
  },
  {
    id: 'C1008',
    name: 'Launch Startup',
    email: 'founders@launchstartup.co',
    segment: 'Startup',
    churnRisk: 68,
    lifetimeValue: 7200,
    daysActive: 85,
    lastLoginDays: 7,
    productUsage: {
      frequency: 4.5,
      features: 5,
      satisfaction: 6.0,
    },
    supportInteractions: 10,
    contractRenewal: '2024-04-12',
  },
];

export const recommendations = {
  high: [
    'Schedule an urgent customer success call',
    'Offer personalized training sessions',
    'Provide a temporary discount on renewal',
    'Assign a dedicated account manager',
    'Conduct detailed feature usage analysis'
  ],
  medium: [
    'Send educational resources based on usage patterns',
    'Schedule a quarterly business review',
    'Introduce new features that align with their goals',
    'Offer complementary consultation services',
    'Provide case studies of similar customers'
  ],
  low: [
    'Continue regular engagement touchpoints',
    'Encourage referral program participation',
    'Collect testimonials for marketing',
    'Offer beta access to upcoming features',
    'Cross-sell additional products/services'
  ]
};

export const retentionTrend = [
  { month: 'Jan', retention: 76 },
  { month: 'Feb', retention: 75 },
  { month: 'Mar', retention: 77 },
  { month: 'Apr', retention: 74 },
  { month: 'May', retention: 75 },
  { month: 'Jun', retention: 76 },
  { month: 'Jul', retention: 78 },
  { month: 'Aug', retention: 77 },
  { month: 'Sep', retention: 79 },
  { month: 'Oct', retention: 78 },
  { month: 'Nov', retention: 80 },
  { month: 'Dec', retention: 78 },
];

export const churnReasons = [
  { reason: 'Product Fit', percentage: 32 },
  { reason: 'Pricing', percentage: 24 },
  { reason: 'Competitor', percentage: 20 },
  { reason: 'Poor Support', percentage: 15 },
  { reason: 'Other', percentage: 9 },
];
