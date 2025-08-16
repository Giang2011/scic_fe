'use client'; // Thêm dòng này ở đầu file để sử dụng State

import React, { useState } from 'react';
import { UserCheck, FileText, Gavel, CheckCircle2 } from 'lucide-react';

// === ĐỊNH NGHĨA DỮ LIỆU ===

// Dữ liệu cho tab Đối tượng tham gia (Eligibility)
const eligibilityData = {
  title: 'Điều kiện Tham gia',
  guidelines: [
    'Tất cả thành viên phải là sinh viên đang theo học tại các trường đại học, cao đẳng.',
    'Mỗi đội phải có từ 2 đến 4 thành viên.',
    'Các thành viên trong một đội có thể đến từ các khoa hoặc trường khác nhau.',
    'Mỗi sinh viên chỉ được phép tham gia một đội duy nhất.',
    'Các dự án đã đoạt giải ở các cuộc thi khác sẽ không được chấp nhận.',
  ],
};

// Dữ liệu cho tab Nộp bài (Submission)
const submissionData = {
  title: 'Hướng dẫn Nộp bài',
  guidelines: [
    'Dự án phải là sản phẩm sáng tạo gốc được thực hiện trong thời gian diễn ra cuộc thi.',
    'Tất cả mã nguồn và tài liệu phải được nộp thông qua cổng thông tin chính thức của cuộc thi.',
    'Bài thuyết trình cuối cùng phải dài 10 phút, kèm theo 5 phút hỏi đáp (Q&A).',
    'Tất cả các bài nộp phải bao gồm một sản phẩm mẫu (prototype) hoặc bản demo hoạt động được.',
    'Bài nộp muộn sẽ không được chấp nhận trong bất kỳ trường hợp nào.',
  ],
};

// Dữ liệu cho tab Đánh giá (Judging)
const judgingData = {
  title: 'Tiêu chí Đánh giá',
  criteria: [
    { name: 'Tính Đổi mới & Sáng tạo', weight: '30%' },
    { name: 'Tính khả thi Kỹ thuật', weight: '25%' },
    { name: 'Tiềm năng Thị trường', weight: '20%' },
    { name: 'Chất lượng Thuyết trình', weight: '15%' },
    { name: 'Khả năng Hợp tác Nhóm', weight: '10%' },
  ],
};

// === COMPONENT CHÍNH ===

export default function Rules() {
  const [activeTab, setActiveTab] = useState('eligibility');

  const tabs = [
    { id: 'eligibility', label: 'Đối tượng', icon: UserCheck },
    { id: 'submission', label: 'Nộp bài', icon: FileText },
    { id: 'judging', label: 'Đánh giá', icon: Gavel },
  ];

  return (
    <section id="rules" className="bg-white py-16 sm:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-900">
            Thể lệ & Quy định
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Vui lòng đọc kỹ tất cả các quy tắc và quy định trước khi đăng ký tham gia cuộc thi.
          </p>
        </div>

        {/* Thanh điều hướng Tab */}
        <div className="mb-8 flex justify-center p-1 rounded-lg bg-gray-100/80 space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none
                ${activeTab === tab.id
                  ? 'bg-white text-red-800 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200/70'
                }
              `}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Nội dung Tab */}
        <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-md min-h-[350px]">
          {activeTab === 'eligibility' && (
            <GuidelineContent title={eligibilityData.title} guidelines={eligibilityData.guidelines} />
          )}
          {activeTab === 'submission' && (
            <GuidelineContent title={submissionData.title} guidelines={submissionData.guidelines} />
          )}
          {activeTab === 'judging' && (
            <JudgingContent title={judgingData.title} criteria={judgingData.criteria} />
          )}
        </div>
      </div>
    </section>
  );
}


// === CÁC COMPONENT CON CHO NỘI DUNG TAB ===

// Component cho nội dung có dạng danh sách gạch đầu dòng (Eligibility & Submission)
function GuidelineContent({ title, guidelines }: { title: string; guidelines: string[] }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-red-800 mb-6">{title}</h3>
      <ul className="space-y-4">
        {guidelines.map((item, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component cho nội dung Tiêu chí đánh giá (Judging)
function JudgingContent({ title, criteria }: { title: string; criteria: { name: string; weight: string }[] }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-red-800 mb-6">{title}</h3>
      <ul className="space-y-2">
        {criteria.map((item, index) => (
          <li key={index} className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-800">{item.name}</span>
            <span className="font-bold text-red-700 bg-red-100/80 py-1 px-3 rounded-full text-sm">
              {item.weight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
