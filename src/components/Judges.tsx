"use client";
import Image from 'next/image';
import { FaLinkedin, FaFacebook } from "react-icons/fa";

// Cập nhật cấu trúc dữ liệu để chứa nhiều thông tin hơn
const judges = [
  {
    name: 'GS.TS. Nguyễn Văn A',
    title: 'Viện trưởng Viện CNTT',
    university: 'Đại học Quốc gia Hà Nội',
    avatar: '/avatar/avatar1.jpg', // Thay bằng đường dẫn ảnh thật
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

export default function Judges() {
  return (
    <section id="judges" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
            Gặp gỡ Ban Giám khảo
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Các chuyên gia và nhà lãnh đạo tư tưởng trong ngành sẽ đánh giá các giải pháp đổi mới của bạn.
          </p>
        </div>
        
        {/* Lưới các thẻ giám khảo - Tối đa 3 cột */}
        <div className="mx-auto mt-16 grid max-w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {judges.map((judge) => (
            <div key={judge.name} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col text-center items-center transition-transform duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={judge.avatar}
                  alt={`Avatar of ${judge.name}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  // Thêm fallback nếu ảnh lỗi
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/128x128/EFEFEF/AAAAAA?text=IMG'; }}
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900">{judge.name}</h3>
              <p className="text-sm text-red-700 font-semibold">{judge.title}</p>
              <p className="text-sm text-gray-500">{judge.university}</p>
              
              {/* Các thẻ tag */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {judge.tags.map(tag => (
                  <span key={tag} className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="mt-4 text-gray-600 text-sm flex-grow">{judge.bio}</p>
              
              {/* Mạng xã hội */}
              <div className="mt-6 flex space-x-4">
                <a href={judge.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                  <FaLinkedin size={20} />
                </a>
                <a href={judge.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                  <FaFacebook size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}