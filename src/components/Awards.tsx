import { Trophy, Medal, Award as AwardIcon, Star, GraduationCap, Users, BookOpen } from 'lucide-react';

// Cập nhật Interface để chứa nhiều thông tin hơn
interface Award {
  rank: string;
  title: string;
  prize: string;
  benefits: string[];
  icon: React.ElementType;
  colorClasses: {
    border: string;
    iconBg: string;
    iconText: string;
  };
}

// Dữ liệu giải thưởng mới, chi tiết hơn
const defaultAwards: Award[] = [
  { 
    rank: 'GIẢI NHẤT', 
    title: 'Quán Quân', 
    prize: '15,000,000 VNĐ', 
    benefits: ['Tiền mặt 15,000,000 VNĐ', 'Cơ hội thực tập', 'Gói cố vấn chuyên sâu', 'Xuất hiện trên các kênh truyền thông'],
    icon: Trophy,
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
    icon: Medal,
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
    icon: AwardIcon,
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
    icon: Star,
    colorClasses: {
      border: 'border-red-500',
      iconBg: 'bg-red-100',
      iconText: 'text-red-600'
    }
  },
];

export default function Awards() {
  const title = "Cơ cấu Giải thưởng";
  const description = "Tranh tài để nhận giải thưởng giá trị và cơ hội độc quyền để khởi động sự nghiệp của bạn.";

  const allParticipantsBenefits = [
      { icon: GraduationCap, title: 'Giấy chứng nhận', description: 'Giấy chứng nhận tham gia chính thức.' },
      { icon: Users, title: 'Kết nối', description: 'Kết nối với các chuyên gia trong ngành.' },
      { icon: BookOpen, title: 'Học hỏi', description: 'Tham gia các buổi workshop và phát triển kỹ năng.' },
  ];

  return (
    <section id="awards" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
        
        {/* Lưới các thẻ giải thưởng */}
        <div className="mx-auto mt-16 grid max-w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {defaultAwards.map((award) => (
            <div key={award.title} className={`bg-white rounded-xl shadow-lg p-8 flex flex-col text-left border-t-4 ${award.colorClasses.border} transition-transform duration-300 hover:-translate-y-2`}>
              <div className="flex-grow">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${award.colorClasses.iconBg}`}>
                  <award.icon className={`w-8 h-8 ${award.colorClasses.iconText}`} />
                </div>
                <p className="mt-6 text-sm font-semibold text-gray-500 uppercase">{award.rank}</p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">{award.title}</h3>
                <p className="mt-2 text-3xl font-extrabold text-red-700">{award.prize}</p>
                <ul className="mt-6 space-y-3 text-gray-600">
                  {award.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1.5">&#8226;</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Quyền lợi chung */}
        <div className="mt-20 bg-red-800 text-white rounded-xl p-10">
            <h3 className="text-2xl font-bold text-center mb-8">Tất cả thí sinh tham gia đều nhận được</h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {allParticipantsBenefits.map((benefit) => (
                    <div key={benefit.title} className="text-center flex flex-col items-center">
                        <div className="bg-red-700/80 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <benefit.icon className="w-8 h-8 text-white"/>
                        </div>
                        <h4 className="font-semibold text-lg">{benefit.title}</h4>
                        <p className="text-red-200 text-sm">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
