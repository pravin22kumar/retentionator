
import { retentionTrend, churnReasons, retentionBySegment, churnFactors } from '@/data/sampleData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const ChartSection = () => {
  const COLORS = ['#16a356', '#f25a00', '#ef4444', '#8c9caa', '#6b7e8f'];
  
  return (
    <div className="animate-fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Retention Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={retentionTrend}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={[50, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Retention Rate']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #eef0f2',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="retention"
                  stroke="#16a356"
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 2 }}
                  activeDot={{ r: 5, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Churn Reasons</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={churnReasons}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {churnReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #eef0f2',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Retention by Segment</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={retentionBySegment}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  domain={[0, 100]} 
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  dataKey="segment" 
                  type="category" 
                  tick={{ fontSize: 12 }} 
                />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #eef0f2',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Legend />
                <Bar dataKey="retained" stackId="a" fill="#16a356" name="Retained" />
                <Bar dataKey="churned" stackId="a" fill="#ef4444" name="Churned" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Churn Factor Weights</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={churnFactors}
                margin={{
                  top: 5,
                  right: 30,
                  left: 50,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Weight']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #eef0f2',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Bar 
                  dataKey="weight" 
                  fill="#6b7e8f"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
