
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Mic, MicOff, Play, Pause, Star, Briefcase, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CandidateNavbar from '@/components/CandidateNavbar';
import VoiceInterview from '@/components/VoiceInterview';
import JobRecommendations from '@/components/JobRecommendations';

const Candidate = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  const profile = {
    name: "Alex Thompson",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    experience: "4 years",
    skills: ["React", "Node.js", "Python", "AWS", "GraphQL"],
    completeness: 85
  };

  const recentActivity = [
    {
      type: "application",
      company: "TechCorp",
      position: "Senior Frontend Developer",
      status: "Under Review",
      date: "2 days ago"
    },
    {
      type: "interview",
      company: "StartupX",
      position: "Full Stack Developer",
      status: "Voice Interview Completed",
      date: "1 week ago"
    },
    {
      type: "match",
      company: "AI Solutions",
      position: "React Developer",
      status: "95% Match Found",
      date: "3 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <CandidateNavbar />
      
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
              <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {profile.name}</h1>
              <p className="text-blue-200">{profile.title} • {profile.location}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{profile.completeness}%</div>
              <p className="text-blue-200 text-sm">Profile Complete</p>
              <Progress value={profile.completeness} className="w-32 mt-2" />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Applications</p>
                    <p className="text-3xl font-bold text-white">12</p>
                  </div>
                  <Briefcase className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Interviews</p>
                    <p className="text-3xl font-bold text-white">5</p>
                  </div>
                  <Mic className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Match Rate</p>
                    <p className="text-3xl font-bold text-white">92%</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Response Time</p>
                    <p className="text-3xl font-bold text-white">2.4h</p>
                  </div>
                  <Clock className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                          {activity.type === 'application' && <Briefcase className="w-6 h-6 text-blue-400" />}
                          {activity.type === 'interview' && <Mic className="w-6 h-6 text-green-400" />}
                          {activity.type === 'match' && <Star className="w-6 h-6 text-yellow-400" />}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{activity.company}</h3>
                          <p className="text-blue-200 text-sm">{activity.position}</p>
                          <p className="text-blue-300 text-xs">{activity.date}</p>
                        </div>
                      </div>
                      <Badge className={
                        activity.status.includes('Under Review') ? 'bg-yellow-600/20 text-yellow-300' :
                        activity.status.includes('Completed') ? 'bg-green-600/20 text-green-300' :
                        'bg-blue-600/20 text-blue-300'
                      }>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Voice Interview Section */}
              <VoiceInterview />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-blue-200 text-sm mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <Badge key={index} className="bg-blue-600/20 text-blue-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Experience</p>
                    <p className="text-white font-medium">{profile.experience}</p>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Job Recommendations */}
              <JobRecommendations />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
