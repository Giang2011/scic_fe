"use client"
import { useState } from 'react';

// Bạn có thể cần import 'Image' từ Next.js để tối ưu hóa hình ảnh
// import Image from 'next/image';

export default function News() {
  // Thêm dữ liệu để có đủ 5 tin và thêm trường 'imageUrl' cho mỗi tin
  const news = [
    {
      id: 1,
      title: 'Thông báo chính thức mở đăng ký SCIC 2025',
      excerpt: 'Cuộc thi SCIC 2025 chính thức mở đăng ký từ ngày 01/03/2025. Các đội thi có thể nộp bài từ hôm nay để nhận được những ưu đãi sớm nhất.',
      publishedAt: '2025-01-15',
      category: 'Nổi bật',
      // Thay thế bằng đường dẫn hình ảnh thực tế của bạn
      imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Hướng dẫn chi tiết cách nộp bài dự thi',
      excerpt: 'Để giúp các đội thi hiểu rõ quy trình nộp bài, Ban Tổ chức đã chuẩn bị hướng dẫn chi tiết, bao gồm các biểu mẫu và tiêu chí chấm điểm.',
      publishedAt: '2025-01-12',
      category: 'Hướng dẫn',
      imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1740&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Công bố danh sách Ban Giám khảo SCIC 2025',
      excerpt: 'Ban Tổ chức vinh dự công bố danh sách Ban Giám khảo gồm các chuyên gia hàng đầu trong ngành công nghệ và khởi nghiệp sáng tạo.',
      publishedAt: '2025-01-10',
      category: 'Thông báo',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1740&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Cập nhật thể lệ và quy chế cuộc thi',
      excerpt: 'Một số thay đổi quan trọng trong thể lệ cuộc thi SCIC 2025 đã được cập nhật. Các đội thi vui lòng xem chi tiết để đảm bảo tuân thủ.',
      publishedAt: '2025-01-08',
      category: 'Cập nhật',
      imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1740&auto=format&fit=crop',
    },
    {
      id: 5,
      title: 'Gặp gỡ các nhà tài trợ kim cương SCIC 2025',
      excerpt: 'SCIC 2025 hân hạnh nhận được sự đồng hành của các nhà tài trợ hàng đầu, mang đến nhiều cơ hội cho các thí sinh.',
      publishedAt: '2025-01-05',
      category: 'Đối tác',
      imageUrl: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=1740&auto=format&fit=crop',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? news.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === news.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
  setCurrentIndex(slideIndex);
};

  return (
    <section id="news" className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
            Tin Tức & Cập Nhật Mới Nhất
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Luôn cập nhật những thông báo, hợp tác và thông tin quan trọng về cuộc thi.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="overflow-hidden rounded-lg shadow-xl border border-gray-200">
            <div key={currentIndex} className="grid grid-cols-1 lg:grid-cols-2 items-center bg-white animate-fade-in">
              {/* Image Section */}
              <div className="relative w-full h-64 lg:h-96">
                {/* Sử dụng component Image của Next.js để tối ưu hóa
                  <Image
                    src={news[currentIndex].imageUrl}
                    alt={news[currentIndex].title}
                    layout="fill"
                    objectFit="cover"
                  />
                */}
                <img
                  src={news[currentIndex].imageUrl}
                  alt={news[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center h-full">
                <div className="flex items-center gap-4 text-sm">
                  <span className="inline-flex items-center px-3 py-1 rounded-full font-medium bg-red-100 text-red-800">
                    {news[currentIndex].category}
                  </span>
                  <span className="text-gray-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {new Date(news[currentIndex].publishedAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 leading-tight">
                  {news[currentIndex].title}
                </h3>
                <p className="mt-4 text-base text-gray-600 line-clamp-3">
                  {news[currentIndex].excerpt}
                </p>
                <div className="mt-8">
                  <button className="bg-red-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-red-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    Đọc thêm
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden sm:block">
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 -left-6 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 z-10"
              aria-label="Tin trước"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute top-1/2 -right-6 -translate-y-1/2 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 z-10"
              aria-label="Tin tiếp theo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {news.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === slideIndex ? 'bg-red-600 w-6' : 'bg-gray-300 w-2.5'
                }`}
                aria-label={`Đi đến tin ${slideIndex + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}