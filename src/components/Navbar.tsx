import React, { useState } from 'react';
import { LogOut, User, Crown, Globe, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LogoutModal from './LogoutModal';

const Navbar: React.FC = () => {
  const { currentUser } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!currentUser) return null;

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'consultant':
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'resident':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'guest':
        return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      default:
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
    }
  };

  const getUserTypeIcon = (userType: string) => {
    switch (userType) {
      case 'consultant':
        return <Crown className="h-4 w-4" />;
      case 'resident':
        return <Globe className="h-4 w-4" />;
      case 'guest':
        return <Users className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getUserTypeDisplayName = (userType: string) => {
    switch (userType) {
      case 'consultant':
        return 'Industry Expert';
      case 'resident':
        return 'Resident';
      case 'guest':
        return 'Guest';
      default:
        return 'User';
    }
  };

  return (
    <>
      <nav className="bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-lg blur-sm opacity-75"></div>
                <img
                  src="/images/ASKABROAD_LOGO-removebg-preview.png"
                  alt="Logo"
                  className="h-10 w-10 filter brightness-100 invert"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm">
                  <span className="text-2xl font-bold">AskAbroad</span>
                </div>
                <span className="relative text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AskAbroad
                </span>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-6">
              {/* User Profile */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full ${getUserTypeColor(currentUser.userType)} flex items-center justify-center shadow-lg`}>
                      {getUserTypeIcon(currentUser.userType)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  <div className="hidden sm:block">
                    <div className="text-white font-medium text-lg">
                      {currentUser.displayName}
                    </div>
                    <div className="text-blue-200 text-sm">
                      {getUserTypeDisplayName(currentUser.userType)}
                    </div>
                  </div>
                </div>

                {/* User Type Badge */}
                <div className={`hidden md:flex items-center space-x-2 px-4 py-2 rounded-full ${getUserTypeColor(currentUser.userType)} shadow-lg`}>
                  {getUserTypeIcon(currentUser.userType)}
                  <span className="text-sm font-medium">
                    {getUserTypeDisplayName(currentUser.userType)}
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="group relative inline-flex items-center px-4 py-2 border border-white/20 text-sm font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/20 transition-all duration-200 hover:scale-105"
              >
                <LogOut className="h-4 w-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default Navbar;