
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Clock, Zap } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: "85%",
      label: "Faster Hiring",
      description: "Reduce time-to-hire with AI automation"
    },
    {
      icon: Users,
      value: "92%",
      label: "Match Accuracy",
      description: "Precision in candidate-role matching"
    },
    {
      icon: Clock,
      value: "3.2x",
      label: "ROI Increase",
      description: "Return on recruitment investment"
    },
    {
      icon: Zap,
      value: "50K+",
      label: "Candidates",
      description: "Successfully placed by our AI"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Proven Results Across Industries
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Companies using HireAI see dramatic improvements in their hiring efficiency and candidate quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-white/10 backdrop-blur-sm text-center group hover:scale-105 transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-blue-300 mb-2">{stat.label}</div>
                <div className="text-sm text-blue-200">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
