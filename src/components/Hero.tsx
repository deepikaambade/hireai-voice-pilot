
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Mic, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <Badge className="mb-8 bg-blue-600/20 text-blue-300 border-blue-500/30 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          Powered by Advanced AI & Machine Learning
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Hire Smarter with
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent block">
            AI Copilot
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
          Revolutionary AI-powered recruitment platform that combines reinforcement learning 
          with voice interaction to match perfect candidates in seconds, not weeks.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-2xl shadow-blue-500/25"
            onClick={() => navigate('/enterprise')}
          >
            <Brain className="w-5 h-5 mr-2" />
            Start Enterprise Trial
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg"
            onClick={() => navigate('/candidate')}
          >
            <Mic className="w-5 h-5 mr-2" />
            Try Voice Interview
          </Button>
        </div>

        {/* Hero Animation/Visual */}
        <div className="relative">
          <div className="mx-auto w-full max-w-4xl">
            <div className="relative bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold">AI Matching</h3>
                  <p className="text-blue-200 text-sm">Advanced algorithms analyze skills, culture fit, and potential</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Mic className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold">Voice Interviews</h3>
                  <p className="text-blue-200 text-sm">Natural voice conversations powered by cutting-edge AI</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">Smart Insights</h3>
                  <p className="text-blue-200 text-sm">Real-time analytics and recommendations for better hiring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
