
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Clock, 
  MessageSquare, 
  Star,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalJobs: number;
  activeApplications: number;
  totalCandidates: number;
  timeToHire: string;
}

const Dashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeApplications: 0,
    totalCandidates: 0,
    timeToHire: '0 days'
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    try {
      // Fetch job stats
      const { data: jobs } = await supabase
        .from('jobs')
        .select('id, status')
        .eq('company_id', profile?.company_id);

      // Fetch application stats
      const { data: applications } = await supabase
        .from('applications')
        .select('id, status, created_at')
        .eq('job_id', jobs?.map(j => j.id) || []);

      // Fetch candidate count
      const { data: candidates } = await supabase
        .from('candidates')
        .select('id');

      setStats({
        totalJobs: jobs?.length || 0,
        activeApplications: applications?.filter(a => a.status !== 'hired' && a.status !== 'rejected').length || 0,
        totalCandidates: candidates?.length || 0,
        timeToHire: '5.2 days'
      });

      // Mock recent activity for now
      setRecentActivity([
        {
          type: 'application',
          message: 'New application for Senior Frontend Developer',
          time: '5 minutes ago',
          candidate: 'John Smith'
        },
        {
          type: 'interview',
          message: 'Interview scheduled with Sarah Johnson',
          time: '1 hour ago',
          candidate: 'Sarah Johnson'
        },
        {
          type: 'job',
          message: 'Posted new job: Backend Engineer',
          time: '2 hours ago'
        }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-white/10 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-white/10 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isRecruiter = profile?.role === 'recruiter' || profile?.role === 'enterprise_admin';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {profile?.first_name}!
          </h1>
          <p className="text-blue-200 mt-1">
            {isRecruiter ? 'Manage your hiring pipeline' : 'Discover your next opportunity'}
          </p>
        </div>
        <div className="flex gap-3">
          {isRecruiter && (
            <>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Search className="w-4 h-4 mr-2" />
                Find Candidates
              </Button>
            </>
          )}
          {!isRecruiter && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Browse Jobs
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">
                  {isRecruiter ? 'Active Jobs' : 'Applications Sent'}
                </p>
                <p className="text-3xl font-bold text-white">{stats.totalJobs}</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">
                  {isRecruiter ? 'Active Applications' : 'Interviews'}
                </p>
                <p className="text-3xl font-bold text-white">{stats.activeApplications}</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">
                  {isRecruiter ? 'Total Candidates' : 'Match Rate'}
                </p>
                <p className="text-3xl font-bold text-white">
                  {isRecruiter ? stats.totalCandidates : '92%'}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm">
                  {isRecruiter ? 'Avg. Time to Hire' : 'Response Time'}
                </p>
                <p className="text-3xl font-bold text-white">
                  {isRecruiter ? stats.timeToHire : '2.4h'}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-blue-200">
                Latest updates from your {isRecruiter ? 'hiring pipeline' : 'job search'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      {activity.type === 'application' && <Users className="w-5 h-5 text-blue-400" />}
                      {activity.type === 'interview' && <MessageSquare className="w-5 h-5 text-green-400" />}
                      {activity.type === 'job' && <Briefcase className="w-5 h-5 text-purple-400" />}
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.message}</p>
                      {activity.candidate && (
                        <p className="text-blue-300 text-sm">{activity.candidate}</p>
                      )}
                      <p className="text-blue-200 text-xs">{activity.time}</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600/20 text-blue-300">New</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isRecruiter ? (
                <>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Job Posting
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Search Candidates
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Jobs
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Complete Profile
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Practice Interview
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Skill Assessment
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                {isRecruiter ? 'Hiring Metrics' : 'Your Progress'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-200 text-sm">
                  {isRecruiter ? 'Fill Rate' : 'Profile Completion'}
                </span>
                <span className="text-white font-bold">85%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-blue-200 text-sm">
                  {isRecruiter ? 'Response Rate' : 'Application Success'}
                </span>
                <span className="text-white font-bold">92%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
