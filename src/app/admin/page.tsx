'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/utils/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminPage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra authentication
    if (!auth.isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Nếu đã đăng nhập, chuyển hướng đến dashboard
    router.push('/admin/dashboard');
  }, [router]);

  const handleLogout = () => {
    auth.logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Trang này sẽ redirect, không hiển thị gì
  return null;
}
