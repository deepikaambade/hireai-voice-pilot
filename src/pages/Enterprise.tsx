
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Users, TrendingUp, Mic, ArrowLeft, Plus, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnterpriseNavbar from '@/components/EnterpriseNavbar';
import CandidateTable from '@/components/CandidateTable';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import AIAssistant from '@/components/AIAssistant';

const Enterprise = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <EnterpriseNavbar />
      
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-blue-300 hover:text-white mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-4xl font-bold text-white mb-2">Enterprise Dashboard</h1>
              <p className="text-blue-200">AI-powered recruitment command center</p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Job Post
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Active Jobs</p>
                    <p className="text-3xl font-bold text-white">24</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Candidates</p>
                    <p className="text-3xl font-bold text-white">1,247</p>
                  </div>
                  <Brain className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Match Rate</p>
                    <p className="text-3xl font-bold text-white">94%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Interviews</p>
                    <p className="text-3xl font-bold text-white">156</p>
                  </div>
                  <Mic className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-sm border-white/10">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="candidates" className="data-[state=active]:bg-blue-600">
                Candidates
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="ai-assistant" className="data-[state=active]:bg-blue-600">
                AI Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Sarah Chen interviewed</p>
                        <p className="text-blue-200 text-sm">Senior Frontend Developer</p>
                      </div>
                      <Badge className="bg-green-600/20 text-green-300">
                        Excellent Match
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">New job posted</p>
                        <p className="text-blue-200 text-sm">ML Engineer - Remote</p>
                      </div>
                      <Badge className="bg-blue-600/20 text-blue-300">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">AI recommendation</p>
                        <p className="text-blue-200 text-sm">3 high-match candidates found</p>
                      </div>
                      <Badge className="bg-purple-600/20 text-purple-300">
                        AI Powered
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-white/10">
                      <h4 className="text-white font-medium mb-2">Hiring Trend Alert</h4>
                      <p className="text-blue-200 text-sm">
                        Frontend developers are 40% more responsive to remote positions this month.
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-lg border border-white/10">
                      <h4 className="text-white font-medium mb-2">Success Pattern</h4>
                      <p className="text-blue-200 text-sm">
                        Candidates with open-source contributions show 60% higher job satisfaction.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="candidates">
              <CandidateTable />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="ai-assistant">
              <AIAssistant />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Enterprise;
