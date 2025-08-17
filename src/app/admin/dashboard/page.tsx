'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  DocumentTextIcon,
  UserGroupIcon,
  NewspaperIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PhotoIcon,
  VideoCameraIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Mock data for demonstrations
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

const mockFindTeamMembers = [
  {
    id: 1,
    name: 'Phạm Thu D',
    school: 'Đại học Y Hà Nội',
    skills: ['Nghiên cứu y khoa', 'Thiết kế'],
    registeredAt: '2025-01-12T16:20:00Z'
  },
  {
    id: 2,
    name: 'Hoàng Văn E',
    school: 'Đại học Kinh tế',
    skills: ['Marketing', 'Kinh doanh'],
    registeredAt: '2025-01-11T11:15:00Z'
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('scic_admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('scic_admin_token');
    router.push('/admin');
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      // In a real app, this would be sent to the backend along with uploaded files
      console.log('Post data:', newPost);
      console.log('Selected images:', selectedImages);
      console.log('Selected videos:', selectedVideos);
      alert('Bài đăng đã được tạo thành công!');
      setNewPost({ title: '', content: '' });
      setSelectedImages([]);
      setSelectedVideos([]);
      setShowPostForm(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      setSelectedImages(prev => [...prev, ...imageFiles]);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const videoFiles = Array.from(files).filter(file => file.type.startsWith('video/'));
      setSelectedVideos(prev => [...prev, ...videoFiles]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setSelectedVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleExportSubmissions = () => {
    // In a real app, this would generate and download an Excel file
    alert('Đang xuất dữ liệu ra file Excel...');
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
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
              <h1 className="text-2xl font-bold text-gray-900">SCIC Admin</h1>
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
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
                          {mockFindTeamMembers.length}
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
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
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
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý bài đăng</h2>
              <button
                onClick={() => setShowPostForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Tạo bài đăng
              </button>
            </div>

            {/* Create Post Form */}
            {showPostForm && (
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tạo bài đăng mới</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900 placeholder-gray-400"
                      placeholder="Nhập tiêu đề bài đăng..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                    <textarea
                      rows={6}
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900 placeholder-gray-400"
                      placeholder="Nhập nội dung bài đăng..."
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Hình ảnh</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="images"
                        className="cursor-pointer flex flex-col items-center justify-center py-4"
                      >
                        <PhotoIcon className="h-12 w-12 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">Click để chọn hình ảnh</span>
                        <span className="text-xs text-gray-500 mt-1">Hỗ trợ: JPG, PNG, GIF</span>
                      </label>
                    </div>
                    {selectedImages.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Hình ảnh đã chọn:</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-24 object-cover"
                                />
                              </div>
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                              <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Video Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        id="videos"
                        multiple
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="videos"
                        className="cursor-pointer flex flex-col items-center justify-center py-4"
                      >
                        <VideoCameraIcon className="h-12 w-12 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">Click để chọn video</span>
                        <span className="text-xs text-gray-500 mt-1">Hỗ trợ: MP4, AVI, MOV</span>
                      </label>
                    </div>
                    {selectedVideos.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Video đã chọn:</p>
                        <div className="space-y-2">
                          {selectedVideos.map((video, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <VideoCameraIcon className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="text-sm text-gray-900">{video.name}</span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ({(video.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                              <button
                                onClick={() => removeVideo(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleCreatePost}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                    >
                      Đăng bài
                    </button>
                    <button
                      onClick={() => {
                        setShowPostForm(false);
                        setNewPost({ title: '', content: '' });
                        setSelectedImages([]);
                        setSelectedVideos([]);
                      }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Posts List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {mockPosts.map((post) => (
                  <li key={post.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-red-600 truncate">
                              {post.title}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              {post.content.substring(0, 100)}...
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(post.publishedAt).toLocaleString('vi-VN')} - {post.author}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Find Team Tab */}
        {activeTab === 'findteam' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Quản lý thành viên tìm đội</h2>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {mockFindTeamMembers.map((member) => (
                  <li key={member.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-red-600 truncate">
                              {member.name}
                            </p>
                          </div>
                          <div className="mt-2">
                            <div className="sm:flex sm:justify-between">
                              <div className="sm:flex">
                                <p className="flex items-center text-sm text-gray-500">
                                  {member.school}
                                </p>
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <p>
                                  Đăng ký: {new Date(member.registeredAt).toLocaleString('vi-VN')}
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {member.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-red-600 hover:text-red-800">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
