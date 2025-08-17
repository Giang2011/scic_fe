// ===== INTERFACES =====
export interface TimelineItem {
  phase: string;
  date: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Award {
  rank: string;
  title: string;
  prize: string;
  benefits: string[];
  iconName: string; // Sử dụng tên icon thay vì component
  colorClasses: {
    border: string;
    iconBg: string;
    iconText: string;
  };
}

export interface AllParticipantBenefit {
  iconName: string;
  title: string;
  description: string;
}

export interface Judge {
  name: string;
  title: string;
  university: string;
  avatar: string;
  tags: string[];
  bio: string;
  linkedin: string;
  twitter: string;
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  imageUrl: string;
}

export interface Sponsor {
  name: string;
  logo: string;
  website?: string;
}

export interface FeatureCard {
  iconName: string;
  title: string;
  description: string;
}

export interface RulesTab {
  id: string;
  label: string;
  iconName: string;
}

export interface RulesEligibility {
  title: string;
  guidelines: string[];
}

export interface RulesSubmission {
  title: string;
  guidelines: string[];
}

export interface JudgingCriteria {
  name: string;
  weight: string;
}

export interface RulesJudging {
  title: string;
  criteria: JudgingCriteria[];
}

// ===== 1. ABOUT DATA =====
export const aboutData = {
  title: "Về Cuộc thi SCIC 2025",
  description: "SCIC - Student Competition in Innovation & Creativity là cuộc thi dành cho sinh viên với mục tiêu khuyến khích tư duy sáng tạo, đổi mới và khởi nghiệp trong môi trường học thuật.",
  extendedDescription: "Dù bạn đam mê công nghệ, phát triển bền vững, tác động xã hội hay đổi mới kinh doanh, SCIC đều là sân khấu hoàn hảo để biến ý tưởng của bạn thành hiện thực và tranh tài cùng những người giỏi nhất.",
  featureCards: [
    {
      iconName: 'Lightbulb',
      title: 'Tập trung Đổi mới',
      description: 'Phát triển các giải pháp đột phá cho những vấn đề trong thế giới thực.'
    },
    {
      iconName: 'Users',
      title: 'Hợp tác Nhóm',
      description: 'Làm việc cùng các sinh viên tài năng từ nhiều môi trường khác nhau.'
    },
    {
      iconName: 'Award',
      title: 'Sự Công nhận',
      description: 'Nhận được sự công nhận từ các chuyên gia và lãnh đạo trong ngành.'
    },
    {
      iconName: 'Rocket',
      title: 'Phát triển Sự nghiệp',
      description: 'Khởi đầu sự nghiệp với những kinh nghiệm và kết nối quý giá.'
    }
  ] as FeatureCard[]
};

// ===== 2. RULES DATA =====
export const rulesTabsData: RulesTab[] = [
  { id: 'eligibility', label: 'Đối tượng', iconName: 'UserCheck' },
  { id: 'submission', label: 'Nộp bài', iconName: 'FileText' },
  { id: 'judging', label: 'Đánh giá', iconName: 'Gavel' },
];

export const rulesEligibilityData: RulesEligibility = {
  title: 'Điều kiện Tham gia',
  guidelines: [
    'Tất cả thành viên phải là sinh viên đang theo học tại các trường đại học, cao đẳng.',
    'Mỗi đội phải có từ 2 đến 4 thành viên.',
    'Các thành viên trong một đội có thể đến từ các khoa hoặc trường khác nhau.',
    'Mỗi sinh viên chỉ được phép tham gia một đội duy nhất.',
    'Các dự án đã đoạt giải ở các cuộc thi khác sẽ không được chấp nhận.',
  ],
};

export const rulesSubmissionData: RulesSubmission = {
  title: 'Hướng dẫn Nộp bài',
  guidelines: [
    'Dự án phải là sản phẩm sáng tạo gốc được thực hiện trong thời gian diễn ra cuộc thi.',
    'Tất cả mã nguồn và tài liệu phải được nộp thông qua cổng thông tin chính thức của cuộc thi.',
    'Bài thuyết trình cuối cùng phải dài 10 phút, kèm theo 5 phút hỏi đáp (Q&A).',
    'Tất cả các bài nộp phải bao gồm một sản phẩm mẫu (prototype) hoặc bản demo hoạt động được.',
    'Bài nộp muộn sẽ không được chấp nhận trong bất kỳ trường hợp nào.',
  ],
};

export const rulesJudgingData: RulesJudging = {
  title: 'Tiêu chí Đánh giá',
  criteria: [
    { name: 'Tính Đổi mới & Sáng tạo', weight: '30%' },
    { name: 'Tính khả thi Kỹ thuật', weight: '25%' },
    { name: 'Tiềm năng Thị trường', weight: '20%' },
    { name: 'Chất lượng Thuyết trình', weight: '15%' },
    { name: 'Khả năng Hợp tác Nhóm', weight: '10%' },
  ],
};

// ===== 3. TIMELINE DATA =====
export const timelineData: TimelineItem[] = [
  { phase: 'Mở Đăng ký', date: '01/03 - 15/03/2025', description: 'Các đội tiến hành đăng ký và nộp ý tưởng dự thi ban đầu.' },
  { phase: 'Vòng Sơ loại', date: '16/03 - 30/03/2025', description: 'Ban giám khảo đánh giá hồ sơ và chọn lọc các đội xuất sắc nhất.' },
  { phase: 'Vòng Chung kết', date: '01/04 - 15/04/2025', description: 'Các đội финалист thuyết trình dự án trực tiếp và tham gia phần hỏi đáp.' },
  { phase: 'Công bố & Trao giải', date: '16/04/2025', description: 'Công bố kết quả cuối cùng và trao giải cho các đội chiến thắng.' },
];

// ===== 4. AWARDS DATA =====
export const awardsData: Award[] = [
  { 
    rank: 'GIẢI NHẤT', 
    title: 'Quán Quân', 
    prize: '15,000,000 VNĐ', 
    benefits: ['Tiền mặt 15,000,000 VNĐ', 'Cơ hội thực tập', 'Gói cố vấn chuyên sâu', 'Xuất hiện trên các kênh truyền thông'],
    iconName: 'Trophy',
    colorClasses: {
      border: 'border-yellow-500',
      iconBg: 'bg-yellow-100',
      iconText: 'text-yellow-600'
    }
  },
  { 
    rank: 'GIẢI NHÌ', 
    title: 'Á Quân', 
    prize: '10,000,000 VNĐ', 
    benefits: ['Tiền mặt 10,000,000 VNĐ', 'Gói cố vấn chuyên sâu', 'Cơ hội kết nối đầu tư', 'Giấy chứng nhận thành tích'],
    iconName: 'Medal',
    colorClasses: {
      border: 'border-gray-400',
      iconBg: 'bg-gray-100',
      iconText: 'text-gray-600'
    }
  },
  { 
    rank: 'GIẢI BA', 
    title: 'Quý Quân', 
    prize: '5,000,000 VNĐ', 
    benefits: ['Tiền mặt 5,000,000 VNĐ', 'Giấy chứng nhận thành tích', 'Quyền truy cập mạng lưới cựu sinh viên'],
    iconName: 'Award',
    colorClasses: {
      border: 'border-orange-500',
      iconBg: 'bg-orange-100',
      iconText: 'text-orange-600'
    }
  },
  { 
    rank: 'GIẢI SÁNG TẠO', 
    title: 'Đổi mới & Tiềm năng', 
    prize: '2,000,000 VNĐ', 
    benefits: ['Tiền mặt 2,000,000 VNĐ', 'Hỗ trợ đăng ký bản quyền', 'Ưu tiên tham gia vườn ươm khởi nghiệp'],
    iconName: 'Star',
    colorClasses: {
      border: 'border-red-500',
      iconBg: 'bg-red-100',
      iconText: 'text-red-600'
    }
  },
];

export const allParticipantsBenefits: AllParticipantBenefit[] = [
  { iconName: 'GraduationCap', title: 'Giấy chứng nhận', description: 'Giấy chứng nhận tham gia chính thức.' },
  { iconName: 'Users', title: 'Kết nối', description: 'Kết nối với các chuyên gia trong ngành.' },
  { iconName: 'BookOpen', title: 'Học hỏi', description: 'Tham gia các buổi workshop và phát triển kỹ năng.' },
];

// ===== 5. JUDGES DATA =====
export const judgesData: Judge[] = [
  {
    name: 'GS.TS. Nguyễn Văn A',
    title: 'Viện trưởng Viện CNTT',
    university: 'Đại học Quốc gia Hà Nội',
    avatar: '/avatar/avatar1.jpg',
    tags: ['AI/ML', 'Startups', 'Product Strategy'],
    bio: '15+ năm kinh nghiệm lãnh đạo công nghệ, từng làm việc tại Google, cố vấn cho nhiều startup thành công.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'TS. Trần Thị B',
    title: 'Giám đốc Trung tâm Đổi mới Sáng tạo',
    university: 'Đại học Bách khoa Hà Nội',
    avatar: '/avatar/avatar1.jpg',
    tags: ['Innovation', 'Research', 'Academia'],
    bio: 'Nhà nghiên cứu hàng đầu về phương pháp luận đổi mới và chuyển đổi số trong giáo dục đại học.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'ThS. Lê Minh C',
    title: 'CEO Công ty Startup Tech',
    university: 'Chuyên gia Công nghệ',
    avatar: '/avatar/avatar1.jpg',
    tags: ['VC', 'Scaling', 'Business'],
    bio: 'Đã đầu tư vào hơn 50+ startups, cựu giám đốc điều hành với 2 lần thoái vốn thành công.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'TS. Phạm Thu D',
    title: 'Trưởng phòng R&D',
    university: 'Tập đoàn FPT',
    avatar: '/avatar/avatar1.jpg',
    tags: ['Deep Tech', 'R&D', 'Enterprise'],
    bio: 'Dẫn dắt các dự án nghiên cứu và phát triển sản phẩm công nghệ cao cho thị trường doanh nghiệp.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'PGS.TS. Hoàng Kim E',
    title: 'Trưởng khoa Khoa học Máy tính',
    university: 'Đại học Công nghệ',
    avatar: '/avatar/avatar1.jpg',
    tags: ['Algorithms', 'Data Science', 'Education'],
    bio: 'Chuyên gia về thuật toán và khoa học dữ liệu, có nhiều công trình nghiên cứu được công bố quốc tế.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Ông Vũ Thanh F',
    title: 'Giám đốc Quỹ đầu tư mạo hiểm',
    university: 'Future Ventures',
    avatar: '/avatar/avatar1.jpg',
    tags: ['Fintech', 'Investment', 'Strategy'],
    bio: 'Tập trung vào các startup Fintech giai đoạn đầu, giúp các công ty xây dựng chiến lược và mở rộng quy mô.',
    linkedin: '#',
    twitter: '#'
  }
];

// ===== 6. NEWS DATA =====
export const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Thông báo chính thức mở đăng ký SCIC 2025',
    excerpt: 'Cuộc thi SCIC 2025 chính thức mở đăng ký từ ngày 01/03/2025. Các đội thi có thể nộp bài từ hôm nay để nhận được những ưu đãi sớm nhất.',
    publishedAt: '2025-01-15',
    category: 'Nổi bật',
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

// ===== 7. FAQ DATA =====
export const faqData: FAQItem[] = [
  {
    question: 'Ai có thể tham gia cuộc thi SCIC?',
    answer: 'Tất cả sinh viên đang học tại các trường đại học, cao đẳng trên toàn quốc đều có thể tham gia. Mỗi đội thi từ 1-5 thành viên.'
  },
  {
    question: 'Thời gian nộp bài dự thi là khi nào?',
    answer: 'Thời gian nộp bài từ ngày 01/03/2025 đến 15/03/2025. Các đội thi cần hoàn thành và nộp bài đúng thời hạn.'
  },
  {
    question: 'Định dạng bài dự thi như thế nào?',
    answer: 'Bài dự thi bao gồm: Slide thuyết trình (.pdf, .ppt, .pptx), video demo (không bắt buộc) và các tài liệu kèm theo (.zip, .rar).'
  },
  {
    question: 'Có hỗ trợ tìm đồng đội không?',
    answer: 'Có, website có chức năng hỗ trợ kết nối các thành viên muốn tìm đội. Bạn có thể đăng ký và tìm kiếm đồng đội phù hợp.'
  },
  {
    question: 'Giải thưởng của cuộc thi là gì?',
    answer: 'Tổng giải thưởng lên đến 50,000,000 VNĐ bao gồm: Giải Nhất 15 triệu, Giải Nhì 10 triệu, Giải Ba 5 triệu và các giải khuyến khích.'
  },
  {
    question: 'Làm thế nào để liên hệ Ban Tổ chức?',
    answer: 'Bạn có thể liên hệ qua email: contact@scic2025.vn, hotline: 1900 xxxx hoặc fanpage Facebook của cuộc thi.'
  }
];

// ===== 8. SPONSORS DATA =====
export const sponsorsData: Sponsor[] = [
  { name: 'FPT Corporation', logo: '/sponsors/viettel.jpg', website: 'https://fpt.com' },
  { name: 'Viettel Group', logo: '/sponsors/viettel.jpg', website: 'https://viettel.com' },
  { name: 'VinGroup', logo: '/sponsors/viettel.jpg', website: 'https://vingroup.net' },
  { name: 'VNPT', logo: '/sponsors/viettel.jpg', website: '#' },
  { name: 'Microsoft Vietnam', logo: '/sponsors/viettel.jpg', website: 'https://microsoft.com' },
  { name: 'Google Vietnam', logo: '/sponsors/viettel.jpg', website: 'https://google.com' },
  { name: 'MoMo', logo: '/sponsors/viettel.jpg', website: 'https://momo.vn' },
  { name: 'VNG Corporation', logo: '/sponsors/viettel.jpg', website: 'https://vng.com.vn' },
];

// ===== SECTION TITLES & DESCRIPTIONS =====
export const sectionContent = {
  about: {
    title: "Về Cuộc thi SCIC 2025",
    description: "SCIC - Student Competition in Innovation & Creativity là cuộc thi dành cho sinh viên với mục tiêu khuyến khích tư duy sáng tạo, đổi mới và khởi nghiệp trong môi trường học thuật."
  },
  rules: {
    title: "Thể lệ & Quy định",
    description: "Vui lòng đọc kỹ tất cả các quy tắc và quy định trước khi đăng ký tham gia cuộc thi."
  },
  timeline: {
    title: "Lịch trình Cuộc thi",
    description: "Theo dõi các mốc thời gian quan trọng để không bỏ lỡ bất kỳ cơ hội nào."
  },
  awards: {
    title: "Cơ cấu Giải thưởng",
    description: "Tranh tài để nhận giải thưởng giá trị và cơ hội độc quyền để khởi động sự nghiệp của bạn.",
    allParticipantsTitle: "Tất cả thí sinh tham gia đều nhận được"
  },
  judges: {
    title: "Gặp gỡ Ban Giám khảo",
    description: "Các chuyên gia và nhà lãnh đạo tư tưởng trong ngành sẽ đánh giá các giải pháp đổi mới của bạn."
  },
  news: {
    title: "Tin Tức & Cập Nhật Mới Nhất",
    description: "Luôn cập nhật những thông báo, hợp tác và thông tin quan trọng về cuộc thi."
  },
  faq: {
    title: "Câu hỏi thường gặp",
    description: "Giải đáp những thắc mắc phổ biến về cuộc thi SCIC 2025"
  },
  sponsors: {
    title: "Nhà tài trợ & Đối tác",
    description: "Chúng tôi xin chân thành cảm ơn sự đồng hành quý báu của các đối tác và nhà tài trợ đã góp phần tạo nên thành công của cuộc thi."
  }
};
