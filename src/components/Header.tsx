'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link as ScrollLink } from 'react-scroll';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Về chúng tôi', href: 'about', isScroll: true },
    { name: 'Thể lệ', href: 'rules', isScroll: true },
    { name: 'Timeline', href: 'timeline', isScroll: true },
    { name: 'Giải thưởng', href: 'awards', isScroll: true },
    { name: 'Ban Giám khảo', href: 'judges', isScroll: true },
    { name: 'Tin tức', href: 'news', isScroll: true },
    { name: 'FAQ', href: 'faq', isScroll: true },
    { name: 'Liên hệ', href: 'contact', isScroll: true },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-red-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">SCIC</span>
            </Link>
          </div>
          
          <div className="ml-10 hidden space-x-8 lg:block">
            {navigation.map((link) => (
              link.isScroll ? (
                <ScrollLink
                  key={link.name}
                  to={link.href}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="text-base font-medium text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
                >
                  {link.name}
                </ScrollLink>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
          
          <div className="ml-10 space-x-4 hidden lg:flex">
            <Link
              href="/find-team"
              className="inline-block bg-red-50 py-2 px-4 text-base font-medium text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              Tìm đội
            </Link>
            <Link
              href="/submit"
              className="inline-block bg-red-600 py-2 px-4 text-base font-medium text-white hover:bg-red-700 rounded-lg transition-colors"
            >
              Đăng ký ngay
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((link) => (
                link.isScroll ? (
                  <ScrollLink
                    key={link.name}
                    to={link.href}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </ScrollLink>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="mt-4 space-y-2">
                <Link
                  href="/find-team"
                  className="block w-full bg-red-50 py-2 px-3 text-center text-base font-medium text-red-600 hover:bg-red-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tìm đội
                </Link>
                <Link
                  href="/submit"
                  className="block w-full bg-red-600 py-2 px-3 text-center text-base font-medium text-white hover:bg-red-700 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng ký ngay
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
