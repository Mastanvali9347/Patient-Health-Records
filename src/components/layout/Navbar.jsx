import React from 'react';
import { Bell, Search } from 'lucide-react';
import FamilySwitcher from '../family/FamilySwitcher';
import ProfileMenu from './ProfileMenu';
import { SidebarTrigger } from './Sidebar';
import { Input } from '@/components/ui/input';

const Navbar = ({ onSidebarToggle }) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-card border-b border-border px-4 lg:px-6">
      <div className="flex items-center justify-between h-full">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger onClick={onSidebarToggle} />
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search records, reports..."
              className="pl-9 w-64 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </button>
          <FamilySwitcher />
          <div className="w-px h-8 bg-border mx-1" />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
