"use client";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API URLs from environment
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const POST_DETAIL_API = process.env.NEXT_PUBLIC_POST_DETAIL_API;
  const POSTS_API = process.env.NEXT_PUBLIC_POSTS_API;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiUrl = `${API_BASE_URL}${POST_DETAIL_API}/${params.id}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Không thể tải bài viết');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const apiUrl = `${API_BASE_URL}${POSTS_API}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Không thể tải tin tức gần đây');
        }
        const data = await response.json();
        // Lấy 5 bài mới nhất, sắp xếp theo thời gian giảm dần
        const sortedData = data
          .sort((a: NewsPost, b: NewsPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        
        // Lọc ra 4 bài khác bài hiện tại
        const filteredPosts = sortedData.filter((item: NewsPost) => item._id !== params.id).slice(0, 4);
        setRecentPosts(filteredPosts);
      } catch (err) {
        console.error('Lỗi tải tin tức gần đây:', err);
      }
    };

    if (params.id) {
      fetchPost();
      fetchRecentPosts();
    }
  }, [params.id, API_BASE_URL, POST_DETAIL_API, POSTS_API]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={() => router.back()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Không tìm thấy bài viết</p>
            <button
              onClick={() => router.back()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Main content with sidebar */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main article content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Post header */}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Ngày đăng: {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                    {post.updatedAt !== post.createdAt && (
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Cập nhật: {new Date(post.updatedAt).toLocaleDateString('vi-VN')}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                    {post.title}
                  </h1>

                  {/* Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="mb-8">
                      {post.images.length === 1 ? (
                        <img
                          src={post.images[0].url}
                          alt={post.title}
                          className="w-full h-auto rounded-lg shadow-md"
                        />
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {post.images.map((image, index) => (
                            <img
                              key={image.fileId}
                              src={image.url}
                              alt={`${post.title} - Hình ${index + 1}`}
                              className="w-full h-auto rounded-lg shadow-md"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
                    />
                  </div>

                  {/* Videos if any */}
                  {post.videos && post.videos.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Video</h3>
                      <div className="space-y-4">
                        {post.videos.map((video, index) => (
                          <video
                            key={video.fileId}
                            src={video.url}
                            controls
                            className="w-full rounded-lg shadow-md"
                          >
                            Trình duyệt của bạn không hỗ trợ video.
                          </video>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>

            {/* Sidebar - Recent Posts */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center sticky top-0 bg-white pb-2 border-b border-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Tin tức gần đây
                </h3>
                
                <div className="space-y-4 pt-2">
                  {recentPosts.length > 0 ? (
                    recentPosts.map((recentPost) => (
                      <div 
                        key={recentPost._id}
                        onClick={() => router.push(`/news/${recentPost._id}`)}
                        className="group cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              src={recentPost.images?.[0]?.url || '/placeholder-news.svg'}
                              alt={recentPost.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                              {recentPost.title}
                            </h4>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(recentPost.createdAt).toLocaleDateString('vi-VN')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Không có tin tức gần đây
                    </p>
                  )}
                </div>
                
                {/* View all news link */}
                <div className="mt-6 pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
                  <button
                    onClick={() => router.push('/#news')}
                    className="w-full text-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Xem tất cả tin tức →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
