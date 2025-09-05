'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowDownTrayIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  PaperClipIcon,
  VideoCameraIcon,
  CalendarIcon,
  UserGroupIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { auth } from '@/utils/auth';

// Types for submission data
interface Submission {
  _id: string;
  teamName: string;
  projectName: string;
  leader: {
    fullName: string;
    studentId: string;
    email: string;
    phone?: string;
  };
  members: Array<{
    fullName: string;
    studentId: string;
    email: string;
    phone?: string;
  }>;
  description?: string;
  report: {
    url: string;
    fileId: string;
    fileName: string;
  };
  attachments: Array<{
    url: string;
    fileId: string;
    fileName: string;
  }>;
  videoLink?: string;
  createdAt: string;
  updatedAt: string;
}

const ITEMS_PER_PAGE = 5;

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [downloadingFiles, setDownloadingFiles] = useState<string[]>([]);

  // Fetch submissions data
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}${process.env.NEXT_PUBLIC_SUBMISSIONS_API || '/api/v1/submissions'}`;
        const response = await auth.fetchWithAuth(apiUrl);
        
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu submissions');
        }
        
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(submissions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSubmissions = submissions.slice(startIndex, endIndex);

  // Handle view submission detail
  const handleViewDetail = async (submissionId: string) => {
    if (detailLoading) return; // Prevent multiple clicks
    
    try {
      setDetailLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}${process.env.NEXT_PUBLIC_SUBMISSION_DETAIL_API || '/api/v1/submissions'}/${submissionId}`;
      const response = await auth.fetchWithAuth(apiUrl);
      
      if (!response.ok) {
        throw new Error('Không thể tải chi tiết submission');
      }
      
      const data = await response.json();
      setSelectedSubmission(data);
    } catch (err) {
      console.error('Error fetching submission detail:', err);
      // Fallback to show current submission data
      const submission = submissions.find(s => s._id === submissionId);
      if (submission) {
        setSelectedSubmission(submission);
      }
    } finally {
      setDetailLoading(false);
    }
  };

  // Handle export to Excel
  const handleExportSubmissions = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}${process.env.NEXT_PUBLIC_SUBMISSIONS_EXPORT_API || '/api/v1/submissions/export'}`;
      window.open(apiUrl, '_blank');
    } catch (err) {
      console.error('Error exporting submissions:', err);
      alert('Có lỗi xảy ra khi xuất Excel');
    }
  };

  // Handle download individual file
  const handleDownloadFile = async (url: string, fileName: string) => {
    try {
      // Thêm file vào danh sách đang tải
      setDownloadingFiles(prev => [...prev, fileName]);
      
      // Tạo một thẻ a ẩn để trigger download
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = fileName;
      link.style.display = 'none';
      
      // Thêm vào DOM, click, và xoá
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Thông báo thành công (optional)
      console.log(`Đang tải xuống: ${fileName}`);
      
      // Xoá khỏi danh sách đang tải sau 2 giây
      setTimeout(() => {
        setDownloadingFiles(prev => prev.filter(f => f !== fileName));
      }, 2000);
      
    } catch (error) {
      console.error('Lỗi khi tải xuống file:', error);
      // Xoá khỏi danh sách đang tải
      setDownloadingFiles(prev => prev.filter(f => f !== fileName));
      // Fallback: mở file trong tab mới
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Quản lý đơn dự thi</h2>
        </div>
        <div className="bg-white shadow rounded-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-900">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Quản lý đơn dự thi</h2>
        </div>
        <div className="bg-white shadow rounded-lg p-8">
          <div className="text-center">
            <p className="text-red-600">Lỗi: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Tải lại
            </button>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Submissions List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {currentSubmissions.map((submission) => (
            <li key={submission._id}>
              <div 
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                onClick={() => handleViewDetail(submission._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-red-600 truncate">
                        {submission.teamName}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {submission.members.length + 1} thành viên
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <DocumentTextIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                            Dự án: {submission.projectName}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <UserIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                            Trưởng nhóm: {submission.leader.fullName}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <CalendarIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                          <p>
                            Nộp bài: {new Date(submission.createdAt).toLocaleString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    </div>
                    {submission.description && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {submission.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {submissions.length === 0 && (
          <div className="text-center py-8">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có submissions nào</h3>
            <p className="mt-1 text-sm text-gray-900">
              Các đơn dự thi sẽ hiển thị tại đây khi có người nộp bài.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-50"
            >
              Trước
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-900">
                Hiển thị <span className="font-medium">{startIndex + 1}</span> đến{' '}
                <span className="font-medium">{Math.min(endIndex, submissions.length)}</span> trong{' '}
                <span className="font-medium">{submissions.length}</span> submissions
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      page === currentPage
                        ? 'z-10 bg-red-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                        : 'text-gray-900'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
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
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Chi tiết đơn dự thi</h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-900 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {detailLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                <p className="mt-4 text-gray-900">Đang tải chi tiết...</p>
              </div>
            ) : (

            <div className="space-y-6">
              {/* Team Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  Thông tin đội thi
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-900">Tên đội:</p>
                    <p className="font-medium text-red-600">{selectedSubmission.teamName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Dự án:</p>
                    <p className="font-medium text-gray-900">{selectedSubmission.projectName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Ngày nộp:</p>
                    <p className="font-medium text-gray-900">{new Date(selectedSubmission.createdAt).toLocaleString('vi-VN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Số thành viên:</p>
                    <p className="font-medium text-gray-900">{selectedSubmission.members.length + 1} người</p>
                  </div>
                </div>
              </div>

              {/* Leader Info */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2" />
                  Trưởng nhóm
                </h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm text-gray-900">Họ tên:</p>
                      <p className="font-medium text-gray-900">{selectedSubmission.leader.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">MSSV:</p>
                      <p className="font-medium text-gray-900">{selectedSubmission.leader.studentId}</p>
                    </div>
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{selectedSubmission.leader.email}</span>
                    </div>
                    {selectedSubmission.leader.phone && (
                      <div className="flex items-center">
                        <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{selectedSubmission.leader.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Members Info */}
              {selectedSubmission.members.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <AcademicCapIcon className="h-5 w-5 mr-2" />
                    Thành viên ({selectedSubmission.members.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedSubmission.members.map((member, index) => (
                      <div key={index} className="bg-green-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm text-gray-900">Họ tên:</p>
                            <p className="font-medium text-gray-900">{member.fullName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">MSSV:</p>
                            <p className="font-medium text-gray-900">{member.studentId}</p>
                          </div>
                          <div className="flex items-center">
                            <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{member.email}</span>
                          </div>
                          {member.phone && (
                            <div className="flex items-center">
                              <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-900">{member.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedSubmission.description && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Mô tả dự án</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.description}</p>
                  </div>
                </div>
              )}

              {/* Files */}
              <div>
                <div className="space-y-2">
                  {/* Report file */}
                  <div className="flex items-center justify-between bg-red-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-red-500 mr-3" />
                      <div>
                        <p className="font-medium text-sm text-gray-900">{selectedSubmission.report.fileName}</p>
                        <p className="text-xs text-gray-900">Báo cáo chính</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadFile(selectedSubmission.report.url, selectedSubmission.report.fileName)}
                      disabled={downloadingFiles.includes(selectedSubmission.report.fileName)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-sm font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {downloadingFiles.includes(selectedSubmission.report.fileName) ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700 mr-1"></div>
                          Đang tải...
                        </>
                      ) : (
                        <>
                          <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                          Tải xuống
                        </>
                      )}
                    </button>
                  </div>

                  {/* Attachment files */}
                  {selectedSubmission.attachments.length > 0 ? (
                    selectedSubmission.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center">
                          <PaperClipIcon className="h-5 w-5 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium text-sm text-gray-900">{attachment.fileName}</p>
                            <p className="text-xs text-gray-900">Tệp đính kèm</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadFile(attachment.url, attachment.fileName)}
                          disabled={downloadingFiles.includes(attachment.fileName)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {downloadingFiles.includes(attachment.fileName) ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-1"></div>
                              Đang tải...
                            </>
                          ) : (
                            <>
                              <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                              Tải xuống
                            </>
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      Không có tệp đính kèm thêm
                    </div>
                  )}
                </div>
              </div>

              {/* Video Link */}
              {selectedSubmission.videoLink && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <VideoCameraIcon className="h-5 w-5 mr-2" />
                    Video demo
                  </h4>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <a
                      href={selectedSubmission.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 underline break-all"
                    >
                      {selectedSubmission.videoLink}
                    </a>
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
