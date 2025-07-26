import { Button } from '@/components/ui/Button';
import { LogOut } from 'lucide-react';

interface NavbarProps {
  appName: string;
  userName: string;
  onLogout: () => void;
}

export function Navbar({ appName, userName, onLogout }: NavbarProps) {
  return (
    <nav className="bg-blue-500 shadow-sm py-3 px-4 flex items-center justify-between flex-wrap">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">{appName}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-white font-medium hidden md:block whitespace-nowrap">
          Olá, {userName}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="flex items-center text-white hover:bg-blue-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
    </nav>
  );
}
