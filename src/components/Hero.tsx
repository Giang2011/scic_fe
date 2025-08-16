import Link from 'next/link';
import { PlayIcon } from '@heroicons/react/24/outline';
import Stats from './Stats';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  backgroundImage?: string;
}

export default function Hero({
  title = "SCIC 2025",
  subtitle = "Student Competition in Innovation & Creativity",
  description = "Tham gia nền tảng cuối cùng dành cho những nhà đổi mới sinh viên. Cạnh tranh, hợp tác và tạo ra những giải pháp định hình tương lai.",
  primaryButtonText = "Tham gia cuộc thi",
  primaryButtonLink = "/submit",
  secondaryButtonText = "Tìm hiểu thêm",
  backgroundImage = "/backgroundscic2025.png"
}: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-red-900 text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-white">SCIC</span>{' '}
            <span className="text-yellow-400">2025</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-white/90 max-w-3xl mx-auto">
            {subtitle}
          </p>
          <p className="mt-4 text-lg text-gray-100 max-w-4xl mx-auto">
            {description}
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={primaryButtonLink}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center gap-2 shadow-lg border-2 border-white/20"
            >
              {primaryButtonText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all duration-300 flex items-center gap-2">
              <PlayIcon className="h-5 w-5" />
              {secondaryButtonText}
            </button>
          </div>
          
          {/* Stats Component */}
          <Stats />
        </div>
      </div>
    </section>
  );
}
