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

  return (
    <section id="faq" className="py-16 bg-gray-50">
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
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              // --- CARD ---
              // Thêm các class transition và hover vào đây
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* --- QUESTION --- */}
                  {/* Đổi màu chữ của câu hỏi thành màu đỏ */}
                  <h3 className="text-lg font-semibold text-red-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}