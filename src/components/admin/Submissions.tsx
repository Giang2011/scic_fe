import React from 'react';
import {
  ArrowDownTrayIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

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

export default function Submissions() {
  const handleExportSubmissions = () => {
    // In a real app, this would generate and download an Excel file
    alert('Đang xuất dữ liệu ra file Excel...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý đơn dự thi</h2>
        <button
          onClick={handleExportSubmissions}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
          Xuất Excel
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {mockSubmissions.map((submission) => (
            <li key={submission.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-red-600 truncate">
                        {submission.teamName}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {submission.memberCount} thành viên
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            Dự án: {submission.projectName}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            Nộp bài: {new Date(submission.submittedAt).toLocaleString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-800">
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
