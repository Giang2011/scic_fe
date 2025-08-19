'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MagnifyingGlassIcon, UserPlusIcon } from '@heroicons/react/24/outline';

type FindTeamForm = {
  full_name: string;
  email: string;
  facebook: string;
  zalo: string;
  phone: string;
  school: string;
  major: string;
  skills: string[];
  other_skills: string;
  interests: string;
};

type TeamMember = {
  _id: string;
  full_name: string;
  email: string;
  social_links: string[];
  school: string;
  major: string;
  skills: string[];
  interests?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  __v?: number;
};

// Mock data for demonstration
const mockMembers: TeamMember[] = [];

const skillOptions = [
  'Lập trình', 'AI/ML', 'Thiết kế UI/UX', 'Marketing', 'Phân tích dữ liệu',
  'Thuyết trình', 'IoT', 'Embedded Systems', 'Python', 'Nghiên cứu y khoa',
  'Thiết kế', 'Quản lý dự án', 'Kinh doanh', 'Tài chính', 'Blockchain'
];

export default function FindTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showOtherSkills, setShowOtherSkills] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FindTeamForm>();

  // Fetch members from API
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/connect/accepted');
      if (response.ok) {
        const result = await response.json();
        // Lấy mảng thành viên từ result.data
        const membersArray = Array.isArray(result.data) ? result.data : [];
        setMembers(membersArray);
        setFilteredMembers(membersArray);
      } else {
        console.error('Failed to fetch members');
        setMembers([]);
        setFilteredMembers([]);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      setMembers([]);
      setFilteredMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // Load members when component mounts
  useEffect(() => {
    fetchMembers();
  }, []);

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
        member.full_name.toLowerCase().includes(search.toLowerCase()) ||
        member.school.toLowerCase().includes(search.toLowerCase()) ||
        member.major.toLowerCase().includes(search.toLowerCase()) ||
        (member.interests && member.interests.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    setFilteredMembers(filtered);
  };

  const onSubmit = async (data: FindTeamForm) => {
    // Kiểm tra ít nhất một thông tin liên hệ được điền
    const hasContactInfo = data.facebook.trim() || data.zalo.trim() || data.phone.trim();
    if (!hasContactInfo) {
      alert('Vui lòng điền ít nhất một thông tin liên hệ (Facebook, Zalo hoặc Số điện thoại)');
      return;
    }

    // Chuẩn bị social_links array (chỉ lấy những field không rỗng)
    const social_links = [];
    if (data.facebook.trim()) social_links.push({ link: data.facebook.trim(), type: "facebook" });
    if (data.zalo.trim()) social_links.push({ link: data.zalo.trim(), type: "zalo" });
    if (data.phone.trim()) social_links.push({ link: data.phone.trim(), type: "phone" });

    // Chuẩn bị skills array (bao gồm cả kỹ năng khác nếu có)
    const skills = [...data.skills];
    if (data.other_skills && data.other_skills.trim()) {
      const otherSkillsArray = data.other_skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      skills.push(...otherSkillsArray);
    }

    // Dữ liệu để gửi API
    const postData = {
      full_name: data.full_name,
      email: data.email,
      social_links: social_links,
      school: data.school,
      major: data.major,
      skills: skills,
      interests: data.interests
    };

    console.log('Data to send to API:', postData);
    
    // Gửi dữ liệu đến API
    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('Đăng ký thành công! Thông tin của bạn đã được gửi và đang chờ duyệt.');
        reset();
        setShowForm(false);
        setShowOtherSkills(false);
        // Refresh danh sách members
        fetchMembers();
      } else {
        const errorData = await response.json();
        alert(`Có lỗi xảy ra: ${errorData.message || 'Vui lòng thử lại sau'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Có lỗi kết nối. Vui lòng kiểm tra lại và thử lại sau.');
    } finally {
      setSubmitting(false);
    }
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
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setShowOtherSkills(false);
                reset();
              }
            }}
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
                      {...register('full_name', { required: 'Vui lòng nhập họ tên' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                      placeholder="Nhập họ và tên của bạn..."
                    />
                    {errors.full_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
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
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Thông tin liên hệ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Thông tin liên hệ <span className="text-gray-500 text-sm">(Chỉ cần điền ít nhất một trong ba)</span>
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Facebook</label>
                      <input
                        type="text"
                        {...register('facebook')}
                        placeholder="Link Facebook hoặc tên tài khoản"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Zalo</label>
                      <input
                        type="text"
                        {...register('zalo')}
                        placeholder="Số Zalo hoặc tên Zalo"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Số điện thoại</label>
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="Số điện thoại"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                      />
                    </div>
                  </div>
                </div>

                {/* Trường và ngành học */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Trường <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('school', { required: 'Vui lòng nhập tên trường' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                      placeholder="Ví dụ: Đại học Bách khoa Hà Nội"
                    />
                    {errors.school && (
                      <p className="mt-1 text-sm text-red-600">{errors.school.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngành học <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('major', { required: 'Vui lòng nhập ngành học' })}
                      placeholder="Ví dụ: Công nghệ thông tin"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                    />
                    {errors.major && (
                      <p className="mt-1 text-sm text-red-600">{errors.major.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kỹ năng nổi bật <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
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
                    
                    {/* Ô Kỹ năng khác */}
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={showOtherSkills}
                        onChange={(e) => setShowOtherSkills(e.target.checked)}
                        className="rounded border-gray-300 text-red-600 shadow-sm focus:border-red-500 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 font-medium">Kỹ năng khác</span>
                    </label>
                  </div>
                  
                  {/* Input cho kỹ năng khác */}
                  {showOtherSkills && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Kỹ năng khác (phân tách bằng dấu phẩy)
                      </label>
                      <input
                        type="text"
                        {...register('other_skills')}
                        placeholder="Ví dụ: Photography, Video Editing, Content Writing"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                      />
                    </div>
                  )}
                  
                  {errors.skills && (
                    <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Lĩnh vực/Ý tưởng quan tâm <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={7}
                    {...register('interests', { required: 'Vui lòng nhập lĩnh vực quan tâm' })}
                    placeholder="Mô tả ngắn về lĩnh vực hoặc ý tưởng bạn muốn làm..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                  />
                  {errors.interests && (
                    <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
                  )}
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Đang gửi...' : 'Đăng ký'}
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
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, trường, hoặc lĩnh vực quan tâm..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-12 pr-4 py-4 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400"
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
          
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Đang tải danh sách thành viên...</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Không tìm thấy thành viên nào phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMembers.map((member) => (
                <div key={member._id} className="bg-white shadow rounded-lg p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{member.full_name}</h3>
                    {/* <p className="text-sm text-gray-600 mt-1">{member.email}</p> */}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Trường:</h4>
                    <p className="text-sm text-gray-600">{member.school}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Ngành:</h4>
                    <p className="text-sm text-gray-600">{member.major}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Kỹ năng:</h4>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Lĩnh vực quan tâm:</h4>
                    <p className="mt-1 text-sm text-gray-600">{member.interests || 'Chưa cập nhật'}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Thông tin liên hệ:</h4>
                    <div className="mt-1 space-y-1">
                      {member.social_links.length > 0 ? (
                        member.social_links.map((link, index) => (
                          <p key={index} className="text-sm text-gray-600">{link}</p>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600">Liên hệ qua email: {member.email}</p>
                      )}
                    </div>
                  </div>
                  
                  {member.createdAt && (
                    <div className="text-xs text-gray-500 text-center border-t pt-3">
                      Tham gia: {member.createdAt.slice(0, 10)}
                    </div>
                  )}
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
