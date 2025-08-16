"use client";

import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: 'Ai có thể tham gia cuộc thi SCIC?',
      answer: 'Tất cả sinh viên đang học tại các trường đại học, cao đẳng trên toàn quốc đều có thể tham gia. Mỗi đội thi từ 1-5 thành viên.'
    },
    {
      question: 'Thời gian nộp bài dự thi là khi nào?',
      answer: 'Thời gian nộp bài từ ngày 01/03/2025 đến 15/03/2025. Các đội thi cần hoàn thành và nộp bài đúng thời hạn.'
    },
    {
      question: 'Định dạng bài dự thi như thế nào?',
      answer: 'Bài dự thi bao gồm: Slide thuyết trình (.pdf, .ppt, .pptx), video demo (không bắt buộc) và các tài liệu kèm theo (.zip, .rar).'
    },
    {
      question: 'Có hỗ trợ tìm đồng đội không?',
      answer: 'Có, website có chức năng hỗ trợ kết nối các thành viên muốn tìm đội. Bạn có thể đăng ký và tìm kiếm đồng đội phù hợp.'
    },
    {
      question: 'Giải thưởng của cuộc thi là gì?',
      answer: 'Tổng giải thưởng lên đến 50,000,000 VNĐ bao gồm: Giải Nhất 15 triệu, Giải Nhì 10 triệu, Giải Ba 5 triệu và các giải khuyến khích.'
    },
    {
      question: 'Làm thế nào để liên hệ Ban Tổ chức?',
      answer: 'Bạn có thể liên hệ qua email: contact@scic2025.vn, hotline: 1900 xxxx hoặc fanpage Facebook của cuộc thi.'
    }
  ];

  // State để theo dõi index của câu hỏi đang được mở
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Hàm xử lý khi người dùng click vào một câu hỏi
  const handleToggle = (index: number) => {
    // Nếu câu hỏi đã mở thì đóng lại, nếu không thì mở nó ra
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Giải đáp những thắc mắc phổ biến về cuộc thi SCIC 2025
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Phần câu hỏi có thể click được */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-red-900">
                    {faq.question}
                  </h3>
                  {/* Icon mũi tên xoay */}
                  <span className="text-red-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                
                {/* Phần câu trả lời chỉ hiện ra khi được chọn */}
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0 animate-fade-in-down">
                    <p className="text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}