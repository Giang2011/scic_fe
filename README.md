# SCIC 2025 Website

Website chính thức của cuộc thi **Student Competition in Innovation & Creativity 2025** - Cuộc thi Sinh viên Sáng tạo và Đổi mới.

## 🚀 Tính năng chính

### Phần công khai
- **Trang chủ**: Thông tin tổng quan về cuộc thi, timeline, giải thưởng, ban giám khảo
- **Nộp bài dự thi**: Form đăng ký và upload bài dự thi với đầy đủ thông tin đội thi
- **Tìm đồng đội**: Hệ thống kết nối thí sinh tìm kiếm đồng đội tham gia

### Phần quản trị (Admin)
- **Dashboard**: Tổng quan hệ thống với thống kê tổng quan
- **Quản lý đơn dự thi**: Xem, xuất Excel danh sách các đội đã nộp bài
- **Quản lý bài đăng**: Tạo, sửa, xóa tin tức và thông báo
- **Quản lý tìm đội**: Theo dõi danh sách thành viên đăng ký tìm đội

## 🛠 Công nghệ sử dụng

- **Framework**: Next.js 15 với Turbopack
- **Styling**: TailwindCSS 4
- **Icons**: Heroicons
- **Forms**: React Hook Form
- **Language**: TypeScript

## 📦 Cài đặt và chạy

1. **Cài đặt dependencies**:
```bash
npm install
```

2. **Chạy development server**:
```bash
npm run dev
```

3. **Build production**:
```bash
npm run build
npm start
```

## 🎨 Thiết kế

Website được thiết kế với:
- **Màu chủ đạo**: Đỏ (#dc2626) và Xanh dương (#1e40af)
- **Typography**: Inter font
- **Layout**: Responsive, mobile-first
- **UI/UX**: Hiện đại, thân thiện với người dùng

## � Cấu trúc Components

### Các Component có thể tùy chỉnh:

#### 1. Hero Section (`src/components/Hero.tsx`)
```tsx
<Hero 
  title="SCIC 2025"
  subtitle="Student Competition in Innovation & Creativity"
  description="Mô tả cuộc thi..."
  primaryButtonText="Tham gia cuộc thi"
  primaryButtonLink="/submit"
  secondaryButtonText="Tìm hiểu thêm"
  backgroundImage="/backgroundscic2025.png"
/>
```

#### 2. Stats Section (`src/components/Stats.tsx`)
```tsx
<Stats 
  stats={[
    { label: 'Người tham gia', value: '500+' },
    { label: 'Giải thưởng', value: '$50K' },
    // ...
  ]}
/>
```

#### 3. About Section (`src/components/About.tsx`)
```tsx
<About 
  title="Về Cuộc thi SCIC"
  description="Mô tả về cuộc thi..."
  sections={[
    {
      title: 'Đối tượng tham gia',
      description: 'Sinh viên đại học...',
      icon: AcademicCapIcon
    },
    // ...
  ]}
/>
```

#### 4. Timeline Section (`src/components/Timeline.tsx`)
```tsx
<Timeline 
  title="Lịch trình cuộc thi"
  description="Theo dõi các mốc thời gian..."
  timeline={[
    { 
      phase: 'Đăng ký', 
      date: '01/03 - 15/03/2025', 
      description: 'Mở đăng ký và nộp bài dự thi' 
    },
    // ...
  ]}
/>
```

#### 5. Awards Section (`src/components/Awards.tsx`)
```tsx
<Awards 
  title="Cơ cấu giải thưởng"
  description="Tổng giải thưởng..."
  awards={[
    { 
      title: 'Giải Nhất', 
      prize: '15,000,000 VNĐ', 
      color: 'bg-yellow-500' 
    },
    // ...
  ]}
/>
```

#### 6. CTA Section (`src/components/CTA.tsx`)
```tsx
<CTA 
  title="Sẵn sàng tham gia cuộc thi?"
  description="Đừng bỏ lỡ cơ hội..."
  primaryButtonText="Nộp bài dự thi"
  primaryButtonLink="/submit"
  secondaryButtonText="Tìm đồng đội"
  secondaryButtonLink="/find-team"
  backgroundColor="bg-red-600"
/>
```

## 🎯 Smooth Scrolling

Website sử dụng `react-scroll` để tạo hiệu ứng smooth scrolling giữa các section:

- Navigation links tự động scroll mượt mà đến section tương ứng
- Thời gian scroll: 500ms
- Hỗ trợ cả desktop và mobile

## 🖼️ Background Image

Hero section sử dụng ảnh background từ `/public/backgroundscic2025.png`. Để thay đổi:

1. Thay thế file ảnh trong thư mục `public/`
2. Cập nhật prop `backgroundImage` trong component `Hero`
3. Hoặc truyền URL ảnh mới khi sử dụng component

```tsx
<Hero backgroundImage="/your-new-background.jpg" />
```
