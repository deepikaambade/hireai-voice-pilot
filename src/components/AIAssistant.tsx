
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, Mic, MicOff, Lightbulb, TrendingUp, Users } from 'lucide-react';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const suggestions = [
    {
      icon: Users,
      title: "Find candidates for Senior React Developer",
      description: "AI will search and rank candidates based on skills and experience"
    },
    {
      icon: TrendingUp,
      title: "Analyze hiring bottlenecks",
      description: "Get insights on where candidates drop off in your pipeline"
    },
    {
      icon: Lightbulb,
      title: "Optimize job descriptions",
      description: "Improve your job posts to attract better candidates"
    }
  ];

  const chatHistory = [
    {
      type: 'ai',
      message: "Hello! I'm your AI hiring assistant. I can help you find candidates, analyze trends, and optimize your recruitment process. What would you like to know?",
      timestamp: "10:30 AM"
    },
    {
      type: 'user',
      message: "Show me the top 5 candidates for our frontend developer position",
      timestamp: "10:32 AM"
    },
    {
      type: 'ai',
      message: "I've analyzed 247 candidates and identified the top 5 matches based on your requirements. Here they are ranked by overall fit score:",
      timestamp: "10:32 AM",
      candidates: [
        { name: "Sarah Chen", score: 95, skills: ["React", "TypeScript", "Node.js"] },
        { name: "Marcus Johnson", score: 92, skills: ["React", "GraphQL", "AWS"] },
        { name: "Elena Rodriguez", score: 89, skills: ["Vue.js", "React", "Docker"] }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    console.log('Voice input:', isListening ? 'stopped' : 'started');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-400" />
              AI Hiring Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-blue-600/20 text-white' 
                      : 'bg-white/10 text-blue-100'
                  }`}>
                    <p className="text-sm">{chat.message}</p>
                    {chat.candidates && (
                      <div className="mt-3 space-y-2">
                        {chat.candidates.map((candidate, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-white/10 rounded">
                            <div>
                              <p className="text-white font-medium text-sm">{candidate.name}</p>
                              <div className="flex gap-1 mt-1">
                                {candidate.skills.map((skill, skillIdx) => (
                                  <Badge key={skillIdx} variant="secondary" className="text-xs bg-blue-600/20 text-blue-300">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-green-400 font-bold text-sm">{candidate.score}%</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-blue-300 mt-2">{chat.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Ask me anything about hiring..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300 pr-12"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={toggleListening}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                    isListening ? 'text-red-400' : 'text-blue-400'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions Panel */}
      <div className="space-y-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer transition-all duration-200"
                onClick={() => setMessage(suggestion.title)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <suggestion.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{suggestion.title}</h4>
                    <p className="text-blue-200 text-xs mt-1">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-lg">AI Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">Model Status</span>
              <Badge className="bg-green-600/20 text-green-300">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">Last Training</span>
              <span className="text-white text-sm">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">Accuracy</span>
              <span className="text-green-400 text-sm font-medium">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-200 text-sm">Voice Input</span>
              <Badge className={isListening ? "bg-red-600/20 text-red-300" : "bg-blue-600/20 text-blue-300"}>
                {isListening ? 'Listening' : 'Ready'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
