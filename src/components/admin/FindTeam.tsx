import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { auth } from '@/utils/auth';
import { toast } from 'react-toastify';

interface FindTeamMember {
  _id: string;
  full_name: string;
  email: string;
  social_links: { link: string; type: string }[];
  school: string;
  major: string;
  skills: string[];
  interests?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export default function FindTeam() {
  const [findTeamMembers, setFindTeamMembers] = useState<FindTeamMember[]>([]);
  const [loadingFindTeam, setLoadingFindTeam] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FindTeamMember | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 6;

  useEffect(() => {
    fetchFindTeamMembers();
  }, []);

  const fetchFindTeamMembers = async () => {
    setLoadingFindTeam(true);
    try {
      const response = await auth.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_CONNECT_GET_API}`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();
      if (response.ok && result.status === 'success') {
        // Sort members: pending first, then accepted, then rejected
        const sortedMembers = result.data.sort((a: FindTeamMember, b: FindTeamMember) => {
          const statusOrder = { pending: 0, accepted: 1, rejected: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        setFindTeamMembers(sortedMembers);
      } else {
        console.error('Failed to fetch find team members:', result.message);
        toast.error('Không thể tải danh sách thành viên tìm đội');
      }
    } catch (error) {
      console.error('Error fetching find team members:', error);
      toast.error('Có lỗi kết nối khi tải danh sách thành viên');
    } finally {
      setLoadingFindTeam(false);
    }
  };

  const updateMemberStatus = async (memberId: string, newStatus: 'pending' | 'accepted' | 'rejected') => {
    try {
      const response = await auth.fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_CONNECT_UPDATE_API}/${memberId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();
      if (response.ok && result.status === 'success') {
        // Update local state and re-sort
        const updatedMembers = findTeamMembers.map(member => 
          member._id === memberId 
            ? { ...member, status: newStatus }
            : member
        ).sort((a, b) => {
          const statusOrder = { pending: 0, accepted: 1, rejected: 2 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
        
        setFindTeamMembers(updatedMembers);
        toast.success(`Cập nhật trạng thái thành công: ${newStatus === 'accepted' ? 'Chấp nhận' : 'Từ chối'}`);
      } else {
        console.error('Failed to update status:', result.message);
        toast.error('Không thể cập nhật trạng thái');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Có lỗi kết nối khi cập nhật trạng thái');
    }
  };

  const openMemberModal = (member: FindTeamMember) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
    setShowModal(false);
  };

  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = findTeamMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(findTeamMembers.length / membersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Chấp nhận';
      case 'rejected':
        return 'Từ chối';
      default:
        return 'Chờ duyệt';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý thành viên tìm đội</h2>
        <button
          onClick={fetchFindTeamMembers}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Làm mới
        </button>
      </div>

      {loadingFindTeam ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentMembers.map((member) => (
              <div key={member._id} className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow">
                <div onClick={() => openMemberModal(member)}>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{member.full_name}</h3>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(member.status)}`}>
                        {getStatusText(member.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Trường:</h4>
                    <p className="text-sm text-gray-600">{member.school}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Ngành:</h4>
                    <p className="text-sm text-gray-600">{member.major}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Kỹ năng:</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Đăng ký: {new Date(member.createdAt).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="flex space-x-2">
                      {member.status === 'pending' && (
                        <>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateMemberStatus(member._id, 'accepted');
                            }}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700"
                          >
                            Chấp nhận
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              updateMemberStatus(member._id, 'rejected');
                            }}
                            className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                      {member.status === 'accepted' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            updateMemberStatus(member._id, 'rejected');
                          }}
                          className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700"
                        >
                          Từ chối
                        </button>
                      )}
                      {member.status === 'rejected' && (
                        <span className="text-xs text-gray-400">Đã từ chối</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {findTeamMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không có thành viên nào đang tìm đội</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Trước
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-red-600 text-white border-red-600'
                      : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Member Detail Modal */}
      {showModal && selectedMember && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Chi tiết thành viên</h3>
              <button
                onClick={closeMemberModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedMember.full_name}</h2>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(selectedMember.status)}`}>
                  {getStatusText(selectedMember.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Email:</h4>
                  <p className="text-sm text-gray-600">{selectedMember.email}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Trường:</h4>
                  <p className="text-sm text-gray-600">{selectedMember.school}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Ngành:</h4>
                  <p className="text-sm text-gray-600">{selectedMember.major}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Ngày đăng ký:</h4>
                  <p className="text-sm text-gray-600">{new Date(selectedMember.createdAt).toLocaleString('vi-VN')}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Kỹ năng:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Lĩnh vực quan tâm:</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                  {selectedMember.interests || 'Chưa cập nhật'}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Thông tin liên hệ:</h4>
                <div className="space-y-2">
                  {selectedMember.social_links.map((socialLink, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      <span className="font-medium">
                        {socialLink.type === 'facebook' ? 'Facebook: ' : 
                         socialLink.type === 'zalo' ? 'Zalo: ' : 
                         socialLink.type === 'phone' ? 'Phone: ' : ''}
                      </span>
                      {socialLink.link}
                    </p>
                  ))}
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email: </span>
                    {selectedMember.email}
                  </p>
                </div>
              </div>

              {/* Action buttons in modal */}
              {selectedMember.status !== 'rejected' && (
                <div className="flex justify-center space-x-3 pt-4 border-t">
                  {selectedMember.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => {
                          updateMemberStatus(selectedMember._id, 'accepted');
                          setSelectedMember({...selectedMember, status: 'accepted'});
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Chấp nhận
                      </button>
                      <button 
                        onClick={() => {
                          updateMemberStatus(selectedMember._id, 'rejected');
                          setSelectedMember({...selectedMember, status: 'rejected'});
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      >
                        Từ chối
                      </button>
                    </>
                  )}
                  {selectedMember.status === 'accepted' && (
                    <button 
                      onClick={() => {
                        updateMemberStatus(selectedMember._id, 'rejected');
                        setSelectedMember({...selectedMember, status: 'rejected'});
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      Từ chối
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
