
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Mic, 
  MicOff, 
  Filter, 
  Clock, 
  Star, 
  MapPin,
  Briefcase,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SearchFilters {
  location: string;
  experience: string;
  salary: string;
  remote: boolean;
  skills: string[];
}

const IntelligentSearch = () => {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    experience: '',
    salary: '',
    remote: false,
    skills: []
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const isRecruiter = profile?.role === 'recruiter' || profile?.role === 'enterprise_admin';

  useEffect(() => {
    if (profile) {
      fetchSearchHistory();
      fetchSavedSearches();
    }
  }, [profile]);

  const fetchSearchHistory = async () => {
    try {
      const { data } = await supabase
        .from('search_history')
        .select('query')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      setSearchHistory(data?.map(item => item.query) || []);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const fetchSavedSearches = async () => {
    try {
      const { data } = await supabase
        .from('saved_searches')
        .select('*')
        .eq('user_id', profile?.id)
        .order('created_at', { ascending: false });
      
      setSavedSearches(data || []);
    } catch (error) {
      console.error('Error fetching saved searches:', error);
    }
  };

  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim()) return;
    
    setLoading(true);
    
    try {
      // Save to search history
      await supabase
        .from('search_history')
        .insert({
          user_id: profile?.id,
          query: query,
          filters: filters
        });

      // Perform search based on user role
      if (isRecruiter) {
        // Search for candidates
        const { data } = await supabase
          .from('candidates')
          .select(`
            *,
            profiles!inner(first_name, last_name, email, location)
          `)
          .or(`summary.ilike.%${query}%, skills.cs.["${query}"]`);
        
        setSearchResults(data || []);
      } else {
        // Search for jobs
        const { data } = await supabase
          .from('jobs')
          .select(`
            *,
            companies!inner(name, logo_url)
          `)
          .eq('status', 'active')
          .or(`title.ilike.%${query}%, description.ilike.%${query}%, skills.cs.["${query}"]`);
        
        setSearchResults(data || []);
      }
      
      // Update search history
      fetchSearchHistory();
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleSearch(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Voice recognition error');
    };

    recognition.start();
  };

  const saveCurrentSearch = async () => {
    if (!searchQuery.trim()) return;
    
    const name = prompt('Enter a name for this search:');
    if (!name) return;
    
    try {
      await supabase
        .from('saved_searches')
        .insert({
          user_id: profile?.id,
          name: name,
          query: searchQuery,
          filters: filters
        });
      
      fetchSavedSearches();
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  const placeholderText = isRecruiter 
    ? "Find senior Gen-AI engineers with LangChain + RAG experience in Europe, open to contract work"
    : "Find remote React developer jobs at tech startups with competitive salary";

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Main Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
              <Input
                placeholder={placeholderText}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 pr-20 bg-white/10 border-white/20 text-white placeholder:text-blue-300 h-14 text-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <Button
                  size="sm"
                  variant={isListening ? "destructive" : "secondary"}
                  onClick={handleVoiceSearch}
                  className="bg-white/10 hover:bg-white/20"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button onClick={() => handleSearch()} className="bg-blue-600 hover:bg-blue-700">
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={saveCurrentSearch}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Save Search
                  </Button>
                )}
              </div>
              
              {/* Real-time suggestions */}
              {suggestions.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Suggestions:</span>
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="cursor-pointer bg-blue-600/20 text-blue-300 hover:bg-blue-600/30"
                      onClick={() => setSearchQuery(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Advanced Filters */}
            <Collapsible open={showFilters} onOpenChange={setShowFilters}>
              <CollapsibleContent className="space-y-4 pt-4 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">Location</label>
                    <Input
                      placeholder="City, State, Country"
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">Experience</label>
                    <Select value={filters.experience} onValueChange={(value) => setFilters({ ...filters, experience: value })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">Salary Range</label>
                    <Select value={filters.salary} onValueChange={(value) => setFilters({ ...filters, salary: value })}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select salary" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-50k">$0 - $50k</SelectItem>
                        <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                        <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                        <SelectItem value="150k+">$150k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="remote"
                      checked={filters.remote}
                      onChange={(e) => setFilters({ ...filters, remote: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="remote" className="text-white text-sm">Remote OK</label>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>

      {/* Search History & Saved Searches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search History */}
        {searchHistory.length > 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {searchHistory.map((query, index) => (
                <div
                  key={index}
                  className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => setSearchQuery(query)}
                >
                  <p className="text-white text-sm">{query}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Saved Searches */}
        {savedSearches.length > 0 && (
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Saved Searches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => setSearchQuery(search.query)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-white font-medium">{search.name}</p>
                    <Badge className="bg-blue-600/20 text-blue-300">{search.alert_frequency || 'No alerts'}</Badge>
                  </div>
                  <p className="text-blue-200 text-sm">{search.query}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Search Results */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          <p className="text-blue-200 mt-4">Searching...</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">
              {isRecruiter ? 'Candidate Results' : 'Job Results'} ({searchResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {searchResults.map((result, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                {isRecruiter ? (
                  // Candidate result
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <span className="text-blue-400 font-bold">
                          {result.profiles?.first_name?.[0]}{result.profiles?.last_name?.[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {result.profiles?.first_name} {result.profiles?.last_name}
                        </h3>
                        <p className="text-blue-200 text-sm">{result.summary}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-blue-300 text-xs flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {result.profiles?.location}
                          </span>
                          <span className="text-blue-300 text-xs flex items-center">
                            <Briefcase className="w-3 h-3 mr-1" />
                            {result.experience_years} years
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      View Profile
                    </Button>
                  </div>
                ) : (
                  // Job result
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{result.title}</h3>
                        <p className="text-blue-200 text-sm">{result.companies?.name}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-blue-300 text-xs flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {result.location}
                          </span>
                          {result.salary_min && (
                            <span className="text-blue-300 text-xs">
                              ${result.salary_min}k - ${result.salary_max}k
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Apply Now
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IntelligentSearch;
