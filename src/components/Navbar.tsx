
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">HireAI</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button variant="ghost" className="text-blue-100 hover:text-white hover:bg-white/10">
                Features
              </Button>
              <Button variant="ghost" className="text-blue-100 hover:text-white hover:bg-white/10">
                Pricing
              </Button>
              <Button variant="ghost" className="text-blue-100 hover:text-white hover:bg-white/10">
                About
              </Button>
              <Button 
                variant="outline" 
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                onClick={() => navigate('/candidate')}
              >
                For Candidates
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate('/enterprise')}
              >
                For Enterprise
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
              Features
            </Button>
            <Button variant="ghost" className="text-blue-100 hover:text-white w-full justify-start">
              Pricing
            </Button>
            <Button variant="ghost" className="text-blue-100 hover:text-white w-full justify-start">
              About
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white w-full justify-start mt-4"
              onClick={() => navigate('/candidate')}
            >
              For Candidates
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white w-full justify-start"
              onClick={() => navigate('/enterprise')}
            >
              For Enterprise
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
