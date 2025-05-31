
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Mic, TrendingUp, Users, Zap, Shield, Target, Clock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our reinforcement learning algorithms continuously improve candidate-job matching accuracy",
      badge: "ML Core"
    },
    {
      icon: Mic,
      title: "Voice Interviews",
      description: "Conduct natural voice interviews with real-time AI analysis and sentiment detection",
      badge: "Voice AI"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecast hiring success rates and candidate performance with advanced analytics",
      badge: "Analytics"
    },
    {
      icon: Users,
      title: "Talent Pipeline",
      description: "Build and maintain dynamic talent pools with automated candidate engagement",
      badge: "Automation"
    },
    {
      icon: Zap,
      title: "Instant Screening",
      description: "Screen hundreds of candidates in minutes with AI-powered evaluation",
      badge: "Efficiency"
    },
    {
      icon: Shield,
      title: "Bias Reduction",
      description: "Eliminate unconscious bias with objective AI assessment and diverse candidate sourcing",
      badge: "Ethics"
    },
    {
      icon: Target,
      title: "Smart Recommendations",
      description: "Get personalized hiring recommendations based on your company's success patterns",
      badge: "Intelligence"
    },
    {
      icon: Clock,
      title: "Real-time Insights",
      description: "Monitor recruitment metrics and candidate progress with live dashboards",
      badge: "Monitoring"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30">
            Platform Features
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">
            Everything You Need to Hire Better
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive AI-powered tools designed to streamline your entire recruitment process 
            from sourcing to onboarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-blue-200">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
