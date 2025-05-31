
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Bell, Settings, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EnterpriseNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">HireAI</span>
              <span className="ml-2 text-sm text-blue-300">Enterprise</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button variant="ghost" className="text-blue-100 hover:text-white hover:bg-white/10">
                Jobs
              </Button>
              <Button variant="ghost" className="text-blue-100 hover:text-white hover:bg-white/10">
                Candidates
              </Button>
              <Button variant="ghost" className="text-blue-100 hover:text-white hover:bg-white/10">
                Analytics
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
            <Button variant="ghost" className="text-blue-100 hover:text-white w-full justify-start">
              Jobs
            </Button>
            <Button variant="ghost" className="text-blue-100 hover:text-white w-full justify-start">
              Candidates
            </Button>
            <Button variant="ghost" className="text-blue-100 hover:text-white w-full justify-start">
              Analytics
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EnterpriseNavbar;
