'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

type TeamMember = {
  name: string;
  studentId: string;
  email: string;
  phone?: string;
};

type SubmissionForm = {
  teamName: string;
  projectName: string;
  leader: TeamMember;
  members: TeamMember[];
  description: string;
  slideFile: FileList;
  videoLink?: string;
  otherFiles?: FileList;
};

export default function SubmitPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubmissionForm>();

  const addMember = () => {
    if (members.length < 4) { // Tối đa 5 người (1 trưởng nhóm + 4 thành viên)
      setMembers([...members, { name: '', studentId: '', email: '' }]);
    }
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const onSubmit = async (data: SubmissionForm) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Đã nộp bài thành công! Chúng tôi sẽ gửi email xác nhận đến bạn.');
    reset();
    setMembers([]);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nộp bài dự thi SCIC 2025
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Điền đầy đủ thông tin và tải lên bài dự thi của đội bạn
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Thông tin đội thi */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin đội thi</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên đội thi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('teamName', { required: 'Vui lòng nhập tên đội thi' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                    placeholder="Nhập tên đội thi của bạn..."
                  />
                  {errors.teamName && (
                    <p className="mt-1 text-sm text-red-600">{errors.teamName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tên dự án/đề tài <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('projectName', { required: 'Vui lòng nhập tên dự án' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                    placeholder="Nhập tên dự án/đề tài..."
                  />
                  {errors.projectName && (
                    <p className="mt-1 text-sm text-red-600">{errors.projectName.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Thông tin trưởng nhóm */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin trưởng nhóm</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('leader.name', { required: 'Vui lòng nhập họ tên' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                    placeholder="Nhập họ và tên trưởng nhóm..."
                  />
                  {errors.leader?.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.leader.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    MSSV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('leader.studentId', { required: 'Vui lòng nhập MSSV' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                    placeholder="Nhập mã số sinh viên..."
                  />
                  {errors.leader?.studentId && (
                    <p className="mt-1 text-sm text-red-600">{errors.leader.studentId.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('leader.email', { 
                      required: 'Vui lòng nhập email',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Email không hợp lệ'
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                    placeholder="example@email.com"
                  />
                  {errors.leader?.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.leader.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register('leader.phone', { required: 'Vui lòng nhập số điện thoại' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                    placeholder="Nhập số điện thoại..."
                  />
                  {errors.leader?.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.leader.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Thành viên khác */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Thành viên khác</h2>
                <button
                  type="button"
                  onClick={addMember}
                  disabled={members.length >= 4}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Thêm thành viên
                </button>
              </div>
              
              {members.map((member, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Thành viên {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMember(index, 'name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                        placeholder="Nhập họ và tên..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">MSSV</label>
                      <input
                        type="text"
                        value={member.studentId}
                        onChange={(e) => updateMember(index, 'studentId', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                        placeholder="Nhập MSSV..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateMember(index, 'email', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mô tả dự án */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mô tả ngắn về dự án <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={8}
                {...register('description', { 
                  required: 'Vui lòng nhập mô tả dự án',
                  maxLength: { value: 500, message: 'Mô tả không được quá 500 ký tự' }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                placeholder="Mô tả ngắn gọn về ý tưởng, mục tiêu và giải pháp của dự án..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Upload files */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Tải lên bài dự thi</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    File Slide/Báo cáo <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Chấp nhận file .pdf, .ppt, .pptx (tối đa 25MB)
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.ppt,.pptx"
                    {...register('slideFile', { required: 'Vui lòng chọn file slide/báo cáo' })}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                  {errors.slideFile && (
                    <p className="mt-1 text-sm text-red-600">{errors.slideFile.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Link Video (không bắt buộc)
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Đường link Youtube, Google Drive hoặc nền tảng khác
                  </p>
                  <input
                    type="url"
                    {...register('videoLink')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-base text-gray-900 placeholder-gray-400 py-3 px-4"
                    placeholder="https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Các tệp đính kèm khác (không bắt buộc)
                  </label>
                  <p className="text-sm text-gray-500 mb-2">
                    Chấp nhận file .zip, .rar
                  </p>
                  <input
                    type="file"
                    accept=".zip,.rar"
                    multiple
                    {...register('otherFiles')}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài dự thi'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
