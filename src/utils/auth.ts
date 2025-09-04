// Utility functions for authentication
export const auth = {
  // Kiểm tra xem user đã đăng nhập chưa và token còn hiệu lực
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    const userEmail = localStorage.getItem('userEmail');
    const loginTime = localStorage.getItem('loginTime');
    
    if (!userEmail || !loginTime) return false;
    
    // Kiểm tra xem token đã hết hạn chưa (1 tiếng = 3600000 ms)
    const currentTime = Date.now();
    const tokenExpiry = parseInt(loginTime) + (60 * 60 * 1000); // 1 tiếng
    
    if (currentTime > tokenExpiry) {
      // Token đã hết hạn, tự động logout
      auth.logout();
      return false;
    }
    
    return true;
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: (): { email: string } | null => {
    if (typeof window === 'undefined') return null;
    
    // Kiểm tra authentication trước khi trả về user
    if (!auth.isAuthenticated()) return null;
    
    const userEmail = localStorage.getItem('userEmail');
    return userEmail ? { email: userEmail } : null;
  },

  // Lưu thông tin đăng nhập
  setUserSession: (email: string): void => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loginTime', Date.now().toString());
  },

  // Đăng xuất
  logout: (): void => {
    if (typeof window === 'undefined') return;
    
    // Xóa thông tin user khỏi localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginTime');
    
    // Gọi API logout để xóa cookie ở server
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.NEXT_PUBLIC_LOGOUT_API}`, {
      method: 'POST',
      credentials: 'include'
    }).catch(console.error);
    
    // Chuyển hướng về trang chủ
    window.location.href = '/';
  },

  // Gọi API với authentication và xử lý token expiration
  fetchWithAuth: async (url: string, options: RequestInit = {}): Promise<Response> => {
    // Kiểm tra authentication trước khi gọi API
    if (!auth.isAuthenticated()) {
      throw new Error('Token đã hết hạn');
    }

    const isFormData = options.body instanceof FormData;
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Luôn gửi cookie
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    });

    // Kiểm tra xem response có báo lỗi authentication không
    if (response.status === 401 || response.status === 403) {
      // Token không hợp lệ hoặc đã hết hạn
      auth.logout();
      throw new Error('Phiên đăng nhập đã hết hạn');
    }

    return response;
  },

  // Kiểm tra thời gian còn lại của token
  getTokenTimeRemaining: (): number => {
    if (typeof window === 'undefined') return 0;
    
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) return 0;
    
    const currentTime = Date.now();
    const tokenExpiry = parseInt(loginTime) + (60 * 60 * 1000); // 1 tiếng
    const timeRemaining = tokenExpiry - currentTime;
    
    return Math.max(0, timeRemaining);
  },

  // Format thời gian còn lại thành string readable
  formatTokenTimeRemaining: (): string => {
    const timeRemaining = auth.getTokenTimeRemaining();
    if (timeRemaining <= 0) return 'Đã hết hạn';
    
    const minutes = Math.floor(timeRemaining / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
