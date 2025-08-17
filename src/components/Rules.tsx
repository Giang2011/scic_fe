'use client'; // Thêm dòng này ở đầu file để sử dụng State

import React, { useState } from 'react';
import { UserCheck, FileText, Gavel, CheckCircle2 } from 'lucide-react';
import { 
  rulesTabsData, 
  rulesEligibilityData, 
  rulesSubmissionData, 
  rulesJudgingData,
  sectionContent 
} from '../data/siteContent';

// Hàm để lấy component icon từ tên
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ElementType } = {
    UserCheck,
    FileText,
    Gavel,
  };
  return iconMap[iconName] || UserCheck;
};

// === COMPONENT CHÍNH ===

export default function Rules() {
  const [activeTab, setActiveTab] = useState('eligibility');

  return (
    <section id="rules" className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Tiêu đề */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-900">
            {sectionContent.rules.title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {sectionContent.rules.description}
          </p>
        </div>

        {/* Thanh điều hướng Tab */}
        <div className="mb-8 flex justify-center p-1 rounded-lg bg-gray-100/80 space-x-1">
          {rulesTabsData.map((tab) => {
            const IconComponent = getIconComponent(tab.iconName);
            return (
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
              <IconComponent className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
            );
          })}
        </div>

        {/* Nội dung Tab */}
        <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-md min-h-[350px]">
          {activeTab === 'eligibility' && (
            <GuidelineContent title={rulesEligibilityData.title} guidelines={rulesEligibilityData.guidelines} />
          )}
          {activeTab === 'submission' && (
            <GuidelineContent title={rulesSubmissionData.title} guidelines={rulesSubmissionData.guidelines} />
          )}
          {activeTab === 'judging' && (
            <JudgingContent title={rulesJudgingData.title} criteria={rulesJudgingData.criteria} />
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
