'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/auth';
import {
  DocumentTextIcon,
  UserGroupIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';

// Import components
import Overview from '@/components/admin/Overview';
import Submissions from '@/components/admin/Submissions';
import Posts from '@/components/admin/Posts';
import FindTeam from '@/components/admin/FindTeam';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [findTeamMembersCount, setFindTeamMembersCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra authentication
    if (!auth.isAuthenticated()) {
      router.push('/login');
      return;
    }

    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, [router]);

  const handleLogout = () => {
    auth.logout();
  };

  const handleMemberCountChange = (count: number) => {
    setFindTeamMembersCount(count);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-lg mr-3">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SCIC Admin</h1>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Tổng quan', icon: DocumentTextIcon },
              { id: 'submissions', name: 'Đơn dự thi', icon: DocumentTextIcon },
              { id: 'posts', name: 'Bài đăng', icon: NewspaperIcon },
              { id: 'findteam', name: 'Tìm đội', icon: UserGroupIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <Overview findTeamMembersCount={findTeamMembersCount} />}
        {activeTab === 'submissions' && <Submissions />}
        {activeTab === 'posts' && <Posts />}
        {activeTab === 'findteam' && <FindTeam onMemberCountChange={handleMemberCountChange} />}
      </div>
    </div>
  );
}
