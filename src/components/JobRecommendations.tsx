
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, DollarSign, Clock, ExternalLink } from 'lucide-react';

const JobRecommendations = () => {
  const jobs = [
    {
      id: 1,
      company: "TechInnovate",
      position: "Senior React Developer",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      type: "Full-time",
      match: 95,
      posted: "2 days ago",
      skills: ["React", "TypeScript", "GraphQL"],
      logo: "🚀"
    },
    {
      id: 2,
      company: "DataFlow Inc",
      position: "Full Stack Engineer",
      location: "Remote",
      salary: "$100k - $140k",
      type: "Remote",
      match: 92,
      posted: "1 week ago",
      skills: ["Node.js", "Python", "AWS"],
      logo: "📊"
    },
    {
      id: 3,
      company: "StartupX",
      position: "Frontend Developer",
      location: "New York, NY",
      salary: "$90k - $120k",
      type: "Hybrid",
      match: 88,
      posted: "3 days ago",
      skills: ["React", "Redux", "CSS"],
      logo: "🌟"
    }
  ];

  const getMatchColor = (match: number) => {
    if (match >= 90) return "text-green-400";
    if (match >= 80) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Star className="w-5 h-5 mr-2 text-yellow-400" />
          Recommended Jobs
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center text-lg">
                  {job.logo}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{job.position}</h4>
                  <p className="text-blue-200 text-xs">{job.company}</p>
                </div>
              </div>
              <div className={`text-lg font-bold ${getMatchColor(job.match)}`}>
                {job.match}%
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center text-blue-200">
                <MapPin className="w-3 h-3 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center text-blue-200">
                <DollarSign className="w-3 h-3 mr-1" />
                {job.salary}
              </div>
              <div className="flex items-center text-blue-200">
                <Clock className="w-3 h-3 mr-1" />
                {job.posted}
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-3 mb-3">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-blue-600/20 text-blue-300">
                  {skill}
                </Badge>
              ))}
            </div>

            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
              <ExternalLink className="w-3 h-3 mr-1" />
              Apply Now
            </Button>
          </div>
        ))}

        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
          View All Jobs
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobRecommendations;
