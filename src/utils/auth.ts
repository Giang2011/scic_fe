// Utility functions for authentication
export const auth = {
  // Kiểm tra xem user đã đăng nhập chưa
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    // Kiểm tra xem có email trong localStorage không (tạm thời)
    const userEmail = localStorage.getItem('userEmail');
    return !!userEmail;
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: (): { email: string } | null => {
    if (typeof window === 'undefined') return null;
    
    const userEmail = localStorage.getItem('userEmail');
    return userEmail ? { email: userEmail } : null;
  },

  // Đăng xuất
  logout: (): void => {
    if (typeof window === 'undefined') return;
    
    // Xóa thông tin user khỏi localStorage
    localStorage.removeItem('userEmail');
    
    // Gọi API logout để xóa cookie ở server
    fetch('http://localhost:8000/api/v1/user/logout', {
      method: 'POST',
      credentials: 'include'
    }).catch(console.error);
    
    // Chuyển hướng về trang chủ
    window.location.href = '/';
  },

  // Gọi API với authentication
  fetchWithAuth: async (url: string, options: RequestInit = {}): Promise<Response> => {
    return fetch(url, {
      ...options,
      credentials: 'include', // Luôn gửi cookie
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }
};

// Function để kiểm tra auth và redirect
export const requireAuth = (): boolean => {
  if (typeof window !== 'undefined' && !auth.isAuthenticated()) {
    window.location.href = '/login';
    return false;
  }
  return true;
};
