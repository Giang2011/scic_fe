"use client";
import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  VideoCameraIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

interface PostImage {
  url: string;
  fileId: string;
}

interface PostVideo {
  url: string;
  fileId: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  images: PostImage[];
  videos: PostVideo[];
  createdAt: string;
  updatedAt: string;
}

interface CreatePostData {
  title: string;
  content: string;
}

export default function Posts() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Form data
  const [newPost, setNewPost] = useState<CreatePostData>({ title: '', content: '' });
  const [editPost, setEditPost] = useState<CreatePostData>({ title: '', content: '' });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<File[]>([]);
  const [removeImageIds, setRemoveImageIds] = useState<string[]>([]);
  const [removeVideoIds, setRemoveVideoIds] = useState<string[]>([]);

  // API base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/v1/posts`);
      if (!response.ok) throw new Error('Không thể tải bài viết');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  // Fetch post by ID
  const fetchPostById = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/posts/${id}`);
      if (!response.ok) throw new Error('Không thể tải chi tiết bài viết');
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create post
  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      toast.error('Vui lòng nhập đầy đủ tiêu đề và nội dung!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);

      selectedImages.forEach((image) => {
        formData.append('images', image);
      });

      selectedVideos.forEach((video) => {
        formData.append('videos', video);
      });

      const response = await fetch(`${API_BASE_URL}/api/v1/posts`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Không thể tạo bài viết');

      toast.success('Bài đăng đã được tạo thành công!');
      setNewPost({ title: '', content: '' });
      setSelectedImages([]);
      setSelectedVideos([]);
      setShowPostForm(false);
      fetchPosts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo bài viết');
    }
  };

  // Update post
  const handleUpdatePost = async () => {
    if (!selectedPost || !editPost.title || !editPost.content) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', editPost.title);
      formData.append('content', editPost.content);

      // Add remove arrays
      removeImageIds.forEach(id => formData.append('removeImages', id));
      removeVideoIds.forEach(id => formData.append('removeVideos', id));

      // Add new files
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });

      selectedVideos.forEach((video) => {
        formData.append('videos', video);
      });

      const response = await fetch(`${API_BASE_URL}/api/v1/posts/${selectedPost._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) throw new Error('Không thể cập nhật bài viết');

      toast.success('Bài viết đã được cập nhật thành công!');
      setShowEditForm(false);
      setShowDetailModal(false);
      resetEditForm();
      fetchPosts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Có lỗi xảy ra khi cập nhật bài viết');
    }
  };

  // Delete post
  const handleDeletePost = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Không thể xóa bài viết');

      toast.success('Bài viết đã được xóa thành công!');
      fetchPosts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Có lỗi xảy ra khi xóa bài viết');
    }
  };

  // View post details
  const handleViewPost = async (post: Post) => {
    try {
      const fullPost = await fetchPostById(post._id);
      setSelectedPost(fullPost);
      setShowDetailModal(true);
    } catch (err) {
      toast.error('Không thể tải chi tiết bài viết');
    }
  };

  // Edit post
  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setEditPost({ title: post.title, content: post.content });
    setShowEditForm(true);
  };

  // Reset forms
  const resetCreateForm = () => {
    setNewPost({ title: '', content: '' });
    setSelectedImages([]);
    setSelectedVideos([]);
    setShowPostForm(false);
  };

  const resetEditForm = () => {
    setEditPost({ title: '', content: '' });
    setSelectedImages([]);
    setSelectedVideos([]);
    setRemoveImageIds([]);
    setRemoveVideoIds([]);
    setSelectedPost(null);
    setShowEditForm(false);
  };

  // File handlers
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

  const removeExistingImage = (fileId: string) => {
    setRemoveImageIds(prev => [...prev, fileId]);
  };

  const removeExistingVideo = (fileId: string) => {
    setRemoveVideoIds(prev => [...prev, fileId]);
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchPosts}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-4 py-3 text-lg rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900 placeholder-gray-400"
                placeholder="Nhập tiêu đề bài đăng..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
              <textarea
                rows={8}
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full px-4 py-3 text-base rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900 placeholder-gray-400 resize-vertical"
                placeholder="Nhập nội dung bài đăng..."
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Hình ảnh</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  id="create-images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="create-images"
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
                  id="create-videos"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="create-videos"
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
                className="bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Đăng bài
              </button>
              <button
                onClick={resetCreateForm}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
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
          {currentPosts.map((post) => (
            <li key={post._id}>
              <div
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleViewPost(post)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-red-600 truncate">
                        {post.title}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content}
                      </p>
                      <div className="flex items-center mt-2 text-xs text-gray-400 space-x-4">
                        <span>Ngày tạo: {new Date(post.createdAt).toLocaleString('vi-VN')}</span>
                        {post.images.length > 0 && (
                          <span className="flex items-center">
                            <PhotoIcon className="h-4 w-4 mr-1" />
                            {post.images.length} ảnh
                          </span>
                        )}
                        {post.videos.length > 0 && (
                          <span className="flex items-center">
                            <VideoCameraIcon className="h-4 w-4 mr-1" />
                            {post.videos.length} video
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleEditPost(post)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Chỉnh sửa"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Xóa"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {posts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Chưa có bài viết nào.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Trước
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">{indexOfFirstPost + 1}</span> đến{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastPost, posts.length)}
                </span>{' '}
                trong <span className="font-medium">{posts.length}</span> bài viết
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber
                        ? 'z-10 bg-red-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                        }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedPost && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Chi tiết bài viết</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{selectedPost.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Ngày tạo: {new Date(selectedPost.createdAt).toLocaleString('vi-VN')}
                </p>
                {selectedPost.updatedAt !== selectedPost.createdAt && (
                  <p className="text-sm text-gray-500">
                    Cập nhật: {new Date(selectedPost.updatedAt).toLocaleString('vi-VN')}
                  </p>
                )}
              </div>

              <div className="border-t pt-4">
                <h5 className="font-medium text-gray-900 mb-2">Nội dung:</h5>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
              </div>

              {selectedPost.images.length > 0 && (
                <div className="border-t pt-4">
                  <h5 className="font-medium text-gray-900 mb-2">Hình ảnh ({selectedPost.images.length}):</h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedPost.images.map((image, index) => (
                      <img
                        key={image.fileId}
                        src={image.url}
                        alt={`${selectedPost.title} - ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedPost.videos.length > 0 && (
                <div className="border-t pt-4">
                  <h5 className="font-medium text-gray-900 mb-2">Video ({selectedPost.videos.length}):</h5>
                  <div className="space-y-3">
                    {selectedPost.videos.map((video, index) => (
                      <video
                        key={video.fileId}
                        src={video.url}
                        controls
                        className="w-full rounded-lg"
                      >
                        Trình duyệt không hỗ trợ video.
                      </video>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  handleEditPost(selectedPost);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditForm && selectedPost && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Chỉnh sửa bài viết</h3>
              <button
                onClick={resetEditForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                <input
                  type="text"
                  value={editPost.title}
                  onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                  className="w-full px-4 py-3 text-lg rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                <textarea
                  rows={8}
                  value={editPost.content}
                  onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                  className="w-full px-4 py-3 text-base rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-gray-900 resize-vertical"
                />
              </div>

              {/* Existing Images */}
              {selectedPost.images.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh hiện tại</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedPost.images
                      .filter(image => !removeImageIds.includes(image.fileId))
                      .map((image, index) => (
                        <div key={image.fileId} className="relative">
                          <img
                            src={image.url}
                            alt={`Current ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeExistingImage(image.fileId)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Existing Videos */}
              {selectedPost.videos.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video hiện tại</label>
                  <div className="space-y-2">
                    {selectedPost.videos
                      .filter(video => !removeVideoIds.includes(video.fileId))
                      .map((video, index) => (
                        <div key={video.fileId} className="relative">
                          <video
                            src={video.url}
                            controls
                            className="w-full h-32 rounded-lg"
                          />
                          <button
                            onClick={() => removeExistingVideo(video.fileId)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* New Images Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thêm hình ảnh mới</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="edit-images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="edit-images"
                    className="cursor-pointer flex flex-col items-center justify-center py-4"
                  >
                    <PhotoIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click để chọn hình ảnh</span>
                  </label>
                </div>
                {selectedImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`New ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* New Videos Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thêm video mới</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="edit-videos"
                    multiple
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="edit-videos"
                    className="cursor-pointer flex flex-col items-center justify-center py-4"
                  >
                    <VideoCameraIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click để chọn video</span>
                  </label>
                </div>
                {selectedVideos.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {selectedVideos.map((video, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm text-gray-900">{video.name}</span>
                        <button
                          onClick={() => removeVideo(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={handleUpdatePost}
                className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Cập nhật
              </button>
              <button
                onClick={resetEditForm}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
