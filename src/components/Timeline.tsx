import { CalendarDays } from 'lucide-react'; // Import icon cho thêm phần sinh động

// Interface và dữ liệu mặc định không thay đổi
interface TimelineItem {
  phase: string;
  date: string;
  description: string;
}

interface TimelineProps {
  title?: string;
  description?: string;
  timeline?: TimelineItem[];
}

const defaultTimeline: TimelineItem[] = [
  { phase: 'Mở Đăng ký', date: '01/03 - 15/03/2025', description: 'Các đội tiến hành đăng ký và nộp ý tưởng dự thi ban đầu.' },
  { phase: 'Vòng Sơ loại', date: '16/03 - 30/03/2025', description: 'Ban giám khảo đánh giá hồ sơ và chọn lọc các đội xuất sắc nhất.' },
  { phase: 'Vòng Chung kết', date: '01/04 - 15/04/2025', description: 'Các đội финалист thuyết trình dự án trực tiếp và tham gia phần hỏi đáp.' },
  { phase: 'Công bố & Trao giải', date: '16/04/2025', description: 'Công bố kết quả cuối cùng và trao giải cho các đội chiến thắng.' },
];

export default function Timeline({
  title = "Lịch trình Cuộc thi",
  description = "Theo dõi các mốc thời gian quan trọng để không bỏ lỡ bất kỳ cơ hội nào.",
  timeline = defaultTimeline
}: TimelineProps) {
  return (
    <section id="timeline" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-red-900">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
        
        {/* Bố cục thẻ mới */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="space-y-6">
            {timeline.map((item) => (
              <div 
                key={item.phase} 
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  {/* Phần nội dung bên trái */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-900">{item.phase}</h3>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                  
                  {/* Phần ngày tháng bên phải (dạng badge) */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center font-semibold text-red-800 bg-red-100 py-1.5 px-4 rounded-full text-sm">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
