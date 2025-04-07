
import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  FileText, 
  CreditCard, 
  LogOut, 
  User 
} from 'lucide-react';

interface ContractorDashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  user: any;
}

const ContractorDashboardLayout: React.FC<ContractorDashboardLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  onLogout,
  user
}) => {
  const navItems = [
    { id: 'campaigns', label: 'Campaigns', icon: <MapPin className="h-5 w-5" /> },
    { id: 'leads', label: 'My Leads', icon: <FileText className="h-5 w-5" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="h-5 w-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4">
          <div className="mb-6 p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">{user?.email || user?.phone || 'Contractor'}</p>
                <p className="text-sm text-gray-500">Contractor Dashboard</p>
              </div>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 text-left rounded-md transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            
            <button
              onClick={onLogout}
              className="flex items-center w-full px-4 py-3 text-left text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="w-full flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ContractorDashboardLayout;
