import React from 'react';
import {
  DocumentTextIcon,
  UserGroupIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';

interface OverviewProps {
  findTeamMembersCount: number;
}

const mockSubmissions = [
  {
    id: 1,
    teamName: 'Team Innovation',
    projectName: 'AI Chatbot cho Giáo dục',
    submittedAt: '2025-01-15T10:30:00Z',
    leader: 'Nguyễn Văn A',
    memberCount: 4
  },
  {
    id: 2,
    teamName: 'Tech Pioneers',
    projectName: 'Smart Farm Management',
    submittedAt: '2025-01-14T15:45:00Z',
    leader: 'Trần Thị B',
    memberCount: 3
  },
  {
    id: 3,
    teamName: 'Digital Solutions',
    projectName: 'E-commerce Platform',
    submittedAt: '2025-01-13T09:20:00Z',
    leader: 'Lê Minh C',
    memberCount: 5
  }
];

const mockPosts = [
  {
    id: 1,
    title: 'Thông báo mở đăng ký SCIC 2025',
    content: 'Cuộc thi SCIC 2025 chính thức mở đăng ký từ ngày 01/03/2025...',
    publishedAt: '2025-01-10T14:00:00Z',
    author: 'Admin'
  },
  {
    id: 2,
    title: 'Hướng dẫn nộp bài dự thi',
    content: 'Các đội thi vui lòng tham khảo hướng dẫn chi tiết về cách nộp bài...',
    publishedAt: '2025-01-08T10:30:00Z',
    author: 'Admin'
  }
];

export default function Overview({ findTeamMembersCount }: OverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Đơn dự thi
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockSubmissions.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <NewspaperIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Bài đăng
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockPosts.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Tìm đội
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {findTeamMembersCount}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Thí sinh
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockSubmissions.reduce((acc, sub) => acc + sub.memberCount, 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Hoạt động gần đây
          </h3>
          <div className="space-y-3">
            {mockSubmissions.slice(0, 3).map((submission) => (
              <div key={submission.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{submission.teamName}</span> đã nộp bài dự thi
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(submission.submittedAt).toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
