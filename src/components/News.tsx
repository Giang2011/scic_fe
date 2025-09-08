"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sectionContent } from '../data/siteContent';
import RevealOnScroll from './RevealOnScroll';

interface NewsPost {
  _id: string;
  title: string;
  content: string;
  images: Array<{
    url: string;
    fileId: string;
  }>;
  videos: Array<{
    url: string;
    fileId: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export default function News() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsData, setNewsData] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_POSTS_API}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Không thể tải tin tức');
        }
        const data = await response.json();
        // Lấy tối đa 5 bài viết mới nhất, sắp xếp theo thời gian giảm dần
        const sortedData = data
          .sort((a: NewsPost, b: NewsPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        setNewsData(sortedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? newsData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === newsData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleReadMore = (postId: string) => {
    router.push(`/news/${postId}`);
  };

  if (loading) {
    return (
      <section id="news" className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
              {sectionContent.news.title}
            </h2>
            <div className="mt-16 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="news" className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
              {sectionContent.news.title}
            </h2>
            <p className="mt-6 text-lg text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (newsData.length === 0) {
    return (
      <section id="news" className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
              {sectionContent.news.title}
            </h2>
            <p className="mt-6 text-lg text-gray-600">Chưa có tin tức nào được đăng.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.8}>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
              {sectionContent.news.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {sectionContent.news.description}
            </p>
          </div>
        </RevealOnScroll>

        {/* Carousel Container */}
        <RevealOnScroll direction="up" delay={0.2} duration={0.8}>
          <div className="mt-16 relative max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="overflow-hidden rounded-lg shadow-xl border border-gray-200">
            <div key={currentIndex} className="grid grid-cols-1 lg:grid-cols-2 items-center bg-white animate-fade-in">
              {/* Image Section */}
              <div className="relative w-full h-64 lg:h-96">
                <img
                  src={newsData[currentIndex].images?.[0]?.url || '/placeholder-news.svg'}
                  alt={newsData[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center h-full">
                <div className="flex items-center gap-4 text-sm">
                  <span className="inline-flex items-center px-3 py-1 rounded-full font-medium bg-red-100 text-red-800">
                    Tin tức
                  </span>
                  <span className="text-gray-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {new Date(newsData[currentIndex].createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900 leading-tight">
                  {newsData[currentIndex].title}
                </h3>
                <p className="mt-4 text-base text-gray-600 line-clamp-3">
                  {newsData[currentIndex].content.length > 150 
                    ? newsData[currentIndex].content.substring(0, 150) + '...'
                    : newsData[currentIndex].content
                  }
                </p>
                <div className="mt-8">
                  <button 
                    onClick={() => handleReadMore(newsData[currentIndex]._id)}
                    className="bg-red-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-red-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mr-4"
                  >
                    Đọc thêm
                  </button>
                  <button 
                    onClick={() => router.push('/news')}
                    className="border border-red-600 text-red-600 px-5 py-2.5 rounded-md font-semibold hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Xem tất cả
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {newsData.length > 1 && (
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
          )}

          {/* Navigation Dots */}
          {newsData.length > 1 && (
            <div className="flex justify-center gap-3 mt-8">
              {newsData.map((_, slideIndex) => (
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
          )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
