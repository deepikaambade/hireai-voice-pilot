
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = () => {
  const hiringTrendData = [
    { month: 'Jan', hires: 12, applications: 450 },
    { month: 'Feb', hires: 15, applications: 520 },
    { month: 'Mar', hires: 18, applications: 580 },
    { month: 'Apr', hires: 22, applications: 620 },
    { month: 'May', hires: 19, applications: 590 },
    { month: 'Jun', hires: 25, applications: 680 }
  ];

  const skillsData = [
    { name: 'JavaScript', value: 35, color: '#3B82F6' },
    { name: 'Python', value: 25, color: '#8B5CF6' },
    { name: 'React', value: 20, color: '#10B981' },
    { name: 'AWS', value: 12, color: '#F59E0B' },
    { name: 'Others', value: 8, color: '#6B7280' }
  ];

  const performanceData = [
    { metric: 'Time to Hire', current: 14, previous: 23, unit: 'days' },
    { metric: 'Cost per Hire', current: 2800, previous: 4200, unit: '$' },
    { metric: 'Interview Success', current: 68, previous: 45, unit: '%' },
    { metric: 'Retention Rate', current: 92, previous: 78, unit: '%' }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceData.map((metric, index) => (
          <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {metric.unit === '$' ? '$' : ''}{metric.current}{metric.unit !== '$' && metric.unit !== 'days' ? metric.unit : ''}
                    {metric.unit === 'days' ? ' days' : ''}
                  </div>
                  <div className="text-sm text-green-400">
                    {metric.unit === '$' ? '-' : '+'}
                    {Math.abs(((metric.current - metric.previous) / metric.previous * 100)).toFixed(1)}%
                  </div>
                </div>
                <div className="text-xs text-blue-200">
                  vs {metric.unit === '$' ? '$' : ''}{metric.previous}{metric.unit !== '$' && metric.unit !== 'days' ? metric.unit : ''}
                  {metric.unit === 'days' ? ' days' : ''}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Trends */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Hiring Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hiringTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hires" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skills Distribution */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Top Skills in Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {skillsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Performance Insights */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">AI Performance Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-2">Model Accuracy</h4>
              <div className="text-3xl font-bold text-blue-400 mb-1">94.2%</div>
              <p className="text-blue-200 text-sm">Candidate-role matching precision</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-2">Learning Rate</h4>
              <div className="text-3xl font-bold text-green-400 mb-1">+2.4%</div>
              <p className="text-blue-200 text-sm">Weekly improvement in predictions</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-2">Voice Analysis</h4>
              <div className="text-3xl font-bold text-purple-400 mb-1">87.6%</div>
              <p className="text-blue-200 text-sm">Interview sentiment accuracy</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
