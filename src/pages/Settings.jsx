import React, { useState } from 'react';
import { 
  User, Shield, FileText, Download, Users, Settings as SettingsIcon,
  ChevronRight
} from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProfileSettings from '../components/settings/ProfileSettings';
import PrivacySecurity from '../components/settings/PrivacySecurity';
import ReportHistory from '../components/settings/ReportHistory';
import Downloads from '../components/settings/Downloads';
import FamilyManagement from '../components/settings/FamilyManagement';
import AdditionalSettings from '../components/settings/AdditionalSettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'reports', label: 'Report History', icon: FileText },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'family', label: 'Family Management', icon: Users },
    { id: 'additional', label: 'Additional Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'privacy':
        return <PrivacySecurity />;
      case 'reports':
        return <ReportHistory />;
      case 'downloads':
        return <Downloads />;
      case 'family':
        return <FamilyManagement />;
      case 'additional':
        return <AdditionalSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <nav className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{tab.label}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${activeTab === tab.id ? 'opacity-100' : 'opacity-50'}`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl border border-border p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
