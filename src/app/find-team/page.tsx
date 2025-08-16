'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/react/24/outline';

type FindTeamForm = {
  name: string;
  email: string;
  contact: string;
  school: string;
  skills: string[];
  interests: string;
};

type TeamMember = {
  id: number;
  name: string;
  school: string;
  skills: string[];
  interests: string;
  contact: string;
  joinedAt: string;
};

// Mock data for demonstration
const mockMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    school: 'Đại học Công nghệ - ĐHQGHN',
    skills: ['Lập trình', 'AI/ML', 'Thiết kế UI/UX'],
    interests: 'Phát triển ứng dụng AI cho giáo dục',
    contact: 'nguyenvana@email.com',
    joinedAt: '2025-01-15'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    school: 'Đại học Kinh tế Quốc dân',
    skills: ['Marketing', 'Phân tích dữ liệu', 'Thuyết trình'],
    interests: 'Startup trong lĩnh vực fintech',
    contact: 'tranthib@email.com',
    joinedAt: '2025-01-14'
  },
  {
    id: 3,
    name: 'Lê Minh C',
    school: 'Đại học Bách khoa Hà Nội',
    skills: ['IoT', 'Embedded Systems', 'Python'],
    interests: 'Giải pháp smart home và IoT',
    contact: 'leminhc@email.com',
    joinedAt: '2025-01-13'
  },
  {
    id: 4,
    name: 'Phạm Thu D',
    school: 'Đại học Y Hà Nội',
    skills: ['Nghiên cứu y khoa', 'Thiết kế', 'Thuyết trình'],
    interests: 'Ứng dụng công nghệ trong y tế',
    contact: 'phamthud@email.com',
    joinedAt: '2025-01-12'
  }
];

const skillOptions = [
  'Lập trình', 'AI/ML', 'Thiết kế UI/UX', 'Marketing', 'Phân tích dữ liệu',
  'Thuyết trình', 'IoT', 'Embedded Systems', 'Python', 'Nghiên cứu y khoa',
  'Thiết kế', 'Quản lý dự án', 'Kinh doanh', 'Tài chính', 'Blockchain'
];

export default function FindTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(mockMembers);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>(mockMembers);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FindTeamForm>();

  const handleSkillFilter = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    setSelectedSkills(newSkills);
    filterMembers(newSkills, searchTerm);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterMembers(selectedSkills, term);
  };

  const filterMembers = (skills: string[], search: string) => {
    let filtered = members;
    
    if (skills.length > 0) {
      filtered = filtered.filter(member =>
        skills.some(skill => member.skills.includes(skill))
      );
    }
    
    if (search) {
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.school.toLowerCase().includes(search.toLowerCase()) ||
        member.interests.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredMembers(filtered);
  };

  const onSubmit = (data: FindTeamForm) => {
    const newMember: TeamMember = {
      id: members.length + 1,
      name: data.name,
      school: data.school,
      skills: data.skills,
      interests: data.interests,
      contact: data.email,
      joinedAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedMembers = [newMember, ...members];
    setMembers(updatedMembers);
    setFilteredMembers(updatedMembers);
    
    alert('Đăng ký thành công! Thông tin của bạn đã được thêm vào danh sách.');
    reset();
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tìm đồng đội
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Kết nối với các sinh viên khác để tạo thành đội thi hoàn hảo
          </p>
        </div>

        {/* Register Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <UserPlusIcon className="h-5 w-5 mr-2" />
            {showForm ? 'Hủy đăng ký' : 'Đăng ký tìm đội'}
          </button>
        </div>

        {/* Registration Form */}
        {showForm && (
          <div className="mb-12">
            <div className="bg-white shadow-xl rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Đăng ký tìm đồng đội</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('name', { required: 'Vui lòng nhập họ tên' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register('email', { 
                        required: 'Vui lòng nhập email',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Email không hợp lệ'
                        }
                      })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Thông tin liên hệ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('contact', { required: 'Vui lòng nhập thông tin liên hệ' })}
                      placeholder="Facebook, Zalo, SĐT..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                    {errors.contact && (
                      <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Trường/Ngành <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('school', { required: 'Vui lòng nhập trường/ngành' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    />
                    {errors.school && (
                      <p className="mt-1 text-sm text-red-600">{errors.school.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kỹ năng nổi bật <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {skillOptions.map((skill) => (
                      <label key={skill} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          {...register('skills', { required: 'Vui lòng chọn ít nhất một kỹ năng' })}
                          value={skill}
                          className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-500 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                  {errors.skills && (
                    <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Lĩnh vực/Ý tưởng quan tâm <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    {...register('interests', { required: 'Vui lòng nhập lĩnh vực quan tâm' })}
                    placeholder="Mô tả ngắn về lĩnh vực hoặc ý tưởng bạn muốn làm..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                  {errors.interests && (
                    <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
                  )}
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, trường, hoặc lĩnh vực quan tâm..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Lọc theo kỹ năng:</h3>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleSkillFilter(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-red-100 text-red-800 border-red-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    } border`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Danh sách thành viên tìm đội ({filteredMembers.length})
          </h2>
          
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy thành viên nào phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMembers.map((member) => (
                <div key={member.id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{member.school}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Kỹ năng:</h4>
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
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Lĩnh vực quan tâm:</h4>
                    <p className="mt-1 text-sm text-gray-600">{member.interests}</p>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                      Liên hệ
                    </button>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-500 text-center">
                    Tham gia: {new Date(member.joinedAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
