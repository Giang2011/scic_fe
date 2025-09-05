import Link from 'next/link';

// --- INTERFACE & PROPS ---
interface CTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

// --- COMPONENT (Đã được cập nhật) ---
export default function CTA({
  title = "Sẵn sàng tham gia cuộc thi?",
  description = "Đừng bỏ lỡ cơ hội thể hiện tài năng và giành những giải thưởng hấp dẫn. Đăng ký ngay hôm nay!",
  primaryButtonText = "Nộp bài dự thi",
  primaryButtonLink = "/submit",
  secondaryButtonText = "Tìm hiểu thêm",
  secondaryButtonLink = "#",
}: CTAProps) {
  return (
    <section id="cta" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        {/* Container chính với nền trắng, viền đỏ và bóng đổ */}
        <div className="relative isolate overflow-hidden rounded-3xl bg-white px-6 py-24 text-center shadow-lg ring-1 ring-red-900/10 sm:px-16">
          
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-red-600 sm:text-4xl">
            {title}
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            {description}
          </p>
          
          {/* Các nút bấm */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={primaryButtonLink}
              className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonLink}
              className="text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-gray-700"
            >
              {secondaryButtonText} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}