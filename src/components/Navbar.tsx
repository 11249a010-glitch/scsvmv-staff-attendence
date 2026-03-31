import { Search, Bell, Settings, Menu, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import scsvmvLogo from "@/assets/scsvmv-logo.png";

interface NavbarProps {
  staffName?: string;
  onLogout?: () => void;
}

export const Navbar = ({ staffName, onLogout }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[hsl(var(--sidebar-bg))] text-white shadow-md">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <img 
            src={scsvmvLogo}
            alt="SCSVMV University" 
            className="h-9"
          />
          <div>
            <h1 className="text-base font-bold tracking-tight">SCSVMV UNIVERSITY</h1>
            <p className="text-[10px] text-white/60 leading-tight">Staff Pulse Dashboard</p>
          </div>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center px-8">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              type="search"
              placeholder="Search staff, department..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative text-white/80 hover:text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[hsl(var(--accent-teal))]" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>
          {staffName && (
            <div className="ml-2 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[hsl(var(--accent-teal))] flex items-center justify-center text-sm font-bold text-white">
                {staffName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden lg:block text-xs text-white/80 max-w-[120px] truncate">{staffName}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white/60 hover:text-white hover:bg-white/10 h-7 w-7"
                onClick={onLogout}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
