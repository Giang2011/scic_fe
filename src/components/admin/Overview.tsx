import React, { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  UserGroupIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline';
import { auth } from '@/utils/auth';

interface Submission {
  _id: string;
  teamName: string;
  projectName: string;
  leader: {
    fullName: string;
    studentId: string;
    email: string;
    phone: string;
  };
  members: Array<{
    fullName: string;
    studentId: string;
    email: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface FindTeamMember {
  _id: string;
  full_name: string;
  email: string;
  school: string;
  major: string;
  skills: string[];
  interests?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export default function Overview() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [findTeamMembers, setFindTeamMembers] = useState<FindTeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchSubmissions(),
        fetchPosts(),
        fetchFindTeamMembers()
      ]);
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await auth.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_SUBMISSIONS_API}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        // Sort submissions by creation date (newest first for recent activity)
        const sortedSubmissions = result.sort((a: Submission, b: Submission) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setSubmissions(sortedSubmissions);
      } else {
        console.error('Failed to fetch submissions');
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_POSTS_API}`);
      
      if (response.ok) {
        const result = await response.json();
        setPosts(result);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchFindTeamMembers = async () => {
    try {
      const response = await auth.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_CONNECT_GET_API}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          setFindTeamMembers(result.data);
        }
      } else {
        console.error('Failed to fetch find team members');
      }
    } catch (error) {
      console.error('Error fetching find team members:', error);
    }
  };

  // Calculate total participants from submissions
  const totalParticipants = submissions.reduce((acc, submission) => {
    return acc + 1 + submission.members.length; // 1 leader + members
  }, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

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
                    {submissions.length}
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
                    {posts.length}
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
                    {findTeamMembers.length}
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
                    {totalParticipants}
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
            {submissions.slice(0, 5).map((submission) => (
              <div key={submission._id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{submission.teamName}</span> đã nộp bài dự thi
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(submission.createdAt).toLocaleString('vi-VN')}
                  </p>
                </div>
              </div>
            ))}
            {submissions.length === 0 && (
              <p className="text-sm text-gray-500">Chưa có hoạt động nào</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
