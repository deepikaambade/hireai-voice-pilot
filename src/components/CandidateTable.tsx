
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Filter, Star, Mic, Eye, MessageSquare } from 'lucide-react';

const CandidateTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const candidates = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      position: "Senior Frontend Developer",
      skills: ["React", "TypeScript", "Node.js"],
      experience: "5 years",
      match: 95,
      status: "Interview Scheduled",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      email: "marcus.j@email.com",
      position: "ML Engineer",
      skills: ["Python", "TensorFlow", "AWS"],
      experience: "7 years",
      match: 92,
      status: "Voice Interview Complete",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      email: "elena.r@email.com",
      position: "Product Designer",
      skills: ["Figma", "Design Systems", "User Research"],
      experience: "4 years",
      match: 89,
      status: "Under Review",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      position: "Backend Developer",
      skills: ["Go", "Kubernetes", "PostgreSQL"],
      experience: "6 years",
      match: 87,
      status: "New Application",
      avatar: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview Scheduled": return "bg-blue-600/20 text-blue-300";
      case "Voice Interview Complete": return "bg-green-600/20 text-green-300";
      case "Under Review": return "bg-yellow-600/20 text-yellow-300";
      case "New Application": return "bg-purple-600/20 text-purple-300";
      default: return "bg-gray-600/20 text-gray-300";
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 90) return "text-green-400";
    if (match >= 80) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Candidate Pool</CardTitle>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
              <Input
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={candidate.avatar} />
                    <AvatarFallback className="bg-blue-600/20 text-blue-300">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold">{candidate.name}</h3>
                    <p className="text-blue-200 text-sm">{candidate.email}</p>
                    <p className="text-blue-300 text-sm">{candidate.position} • {candidate.experience}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getMatchColor(candidate.match)}`}>
                      {candidate.match}%
                    </div>
                    <p className="text-blue-200 text-xs">Match</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 max-w-48">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-600/20 text-blue-300 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status}
                  </Badge>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white">
                      <Mic className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateTable;
