
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <Brain className="w-8 h-8 text-blue-400 mr-2" />
            <span className="text-xl font-bold text-white">HireAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user ? (
                // Authenticated navigation
                <>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-blue-300"
                    onClick={() => navigate('/')}
                  >
                    Dashboard
                  </Button>
                  {(profile?.role === 'recruiter' || profile?.role === 'enterprise_admin') && (
                    <>
                      <Button 
                        variant="ghost" 
                        className="text-white hover:text-blue-300"
                        onClick={() => navigate('/search')}
                      >
                        Search
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="text-white hover:text-blue-300"
                        onClick={() => navigate('/analytics')}
                      >
                        Analytics
                      </Button>
                    </>
                  )}
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-blue-300"
                    onClick={() => navigate('/messages')}
                  >
                    Messages
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-white hover:text-blue-300">
                        <User className="w-4 h-4 mr-2" />
                        {profile?.first_name || 'User'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                // Public navigation
                <>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-blue-300"
                    onClick={() => navigate('/enterprise')}
                  >
                    For Employers
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-blue-300"
                    onClick={() => navigate('/candidate')}
                  >
                    For Candidates
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => navigate('/auth')}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate('/auth')}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/10">
              {user ? (
                // Authenticated mobile navigation
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white hover:text-blue-300"
                    onClick={() => {navigate('/'); setIsOpen(false);}}
                  >
                    Dashboard
                  </Button>
                  {(profile?.role === 'recruiter' || profile?.role === 'enterprise_admin') && (
                    <>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-white hover:text-blue-300"
                        onClick={() => {navigate('/search'); setIsOpen(false);}}
                      >
                        Search
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-white hover:text-blue-300"
                        onClick={() => {navigate('/analytics'); setIsOpen(false);}}
                      >
                        Analytics
                      </Button>
                    </>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white hover:text-blue-300"
                    onClick={() => {navigate('/messages'); setIsOpen(false);}}
                  >
                    Messages
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white hover:text-blue-300"
                    onClick={() => {navigate('/profile'); setIsOpen(false);}}
                  >
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white hover:text-blue-300"
                    onClick={() => {handleSignOut(); setIsOpen(false);}}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                // Public mobile navigation
                <>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white hover:text-blue-300"
                    onClick={() => {navigate('/enterprise'); setIsOpen(false);}}
                  >
                    For Employers
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white hover:text-blue-300"
                    onClick={() => {navigate('/candidate'); setIsOpen(false);}}
                  >
                    For Candidates
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white hover:text-blue-300"
                    onClick={() => {navigate('/auth'); setIsOpen(false);}}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
                    onClick={() => {navigate('/auth'); setIsOpen(false);}}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
