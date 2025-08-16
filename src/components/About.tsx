import { Lightbulb, Users, Award, Rocket } from 'lucide-react';
import Image from 'next/image';

// Định nghĩa kiểu dữ liệu cho props của component
interface AboutProps {
  title?: string;
  description?: string;
}

// Component About với background section đã được cập nhật
export default function About({
  title = "Về Cuộc thi SCIC 2025",
  description = "SCIC - Student Competition in Innovation & Creativity là cuộc thi dành cho sinh viên với mục tiêu khuyến khích tư duy sáng tạo, đổi mới và khởi nghiệp trong môi trường học thuật.",
}: AboutProps) {
  return (
    // THAY ĐỔI Ở ĐÂY: Thêm thẻ section với id và className bạn muốn
    <section id="about" className="py-16 bg-white text-gray-800 font-sans">
      <main className="container mx-auto px-4 max-w-6xl">
        
        {/* === PHẦN GIỚI THIỆU CUỘC THI === */}
        <section className="mb-20">
          <h1 className="text-4xl font-bold text-red-900 mb-8 text-center">
            {title}
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dù bạn đam mê công nghệ, phát triển bền vững, tác động xã hội hay đổi mới kinh doanh, SCIC đều là sân khấu hoàn hảo để biến ý tưởng của bạn thành hiện thực và tranh tài cùng những người giỏi nhất.
              </p>
              <button className="bg-red-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-900 transition-colors duration-300 shadow-md">
                Xem Thể lệ & Quy định
              </button>
            </div>

            <div className="relative">
              <Image
                src="/aboutimage.png"
                alt="Các bạn sinh viên đang hợp tác"
                width={600}
                height={400}
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
              <div className="absolute bottom-5 left-5 bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-md shadow-lg">
                Thời gian: 3 Tháng
              </div>
            </div>
          </div>
        </section>

        {/* === PHẦN CÁC TÍNH NĂNG NỔI BẬT === */}
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Lightbulb className="h-8 w-8 text-red-800" />}
              title="Tập trung Đổi mới"
              description="Phát triển các giải pháp đột phá cho những vấn đề trong thế giới thực."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-red-800" />}
              title="Hợp tác Nhóm"
              description="Làm việc cùng các sinh viên tài năng từ nhiều môi trường khác nhau."
            />
            <FeatureCard
              icon={<Award className="h-8 w-8 text-red-800" />}
              title="Sự Công nhận"
              description="Nhận được sự công nhận từ các chuyên gia và lãnh đạo trong ngành."
            />
            <FeatureCard
              icon={<Rocket className="h-8 w-8 text-red-800" />}
              title="Phát triển Sự nghiệp"
              description="Khởi đầu sự nghiệp với những kinh nghiệm và kết nối quý giá."
            />
          </div>
        </section>

      </main>
    </section>
  );
}

// Component FeatureCard không thay đổi
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    // Đổi nền của card thành màu trắng để nổi bật trên nền xám
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center">
      <div className="mb-5 inline-flex items-center justify-center h-20 w-20 rounded-full bg-red-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-red-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}