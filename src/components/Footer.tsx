import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="md:flex md:items-center md:space-x-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-white">SCIC 2025</span>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-400">
              Student Competition in Innovation & Creativity
            </p>
            <p className="text-sm text-gray-400">
              Cuộc thi Sinh viên Sáng tạo và Đổi mới
            </p>
          </div>
        </div>
        
        <div className="mt-8 md:mt-0">
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            
            <Link
              href="#"
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <span className="sr-only">Email</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </Link>
          </div>
          
          <div className="mt-4 text-sm text-gray-400">
            <p>Email: contact@scic2025.vn</p>
            <p>Hotline: 1900 xxxx</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <p className="text-center text-sm text-gray-400">
            © 2025 SCIC. Bản quyền thuộc về Ban Tổ chức cuộc thi SCIC.
          </p>
        </div>
      </div>
    </footer>
  );
}
