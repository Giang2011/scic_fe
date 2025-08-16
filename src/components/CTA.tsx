import Link from 'next/link';

interface CTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundColor?: string;
}

export default function CTA({
  title = "Sẵn sàng tham gia cuộc thi?",
  description = "Đừng bỏ lỡ cơ hội thể hiện tài năng và giành những giải thưởng hấp dẫn. Đăng ký ngay hôm nay!",
  primaryButtonText = "Nộp bài dự thi",
  primaryButtonLink = "/submit",
  secondaryButtonText = "Tìm đồng đội",
  secondaryButtonLink = "/find-team",
  backgroundColor = "bg-red-600"
}: CTAProps) {
  return (
        <section id="cta" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-red-100">
            {description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={primaryButtonLink}
              className="bg-white px-8 py-3 text-sm font-semibold text-red-600 shadow-sm hover:bg-gray-50 rounded-lg transition-colors"
            >
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonLink}
              className="border border-white px-8 py-3 text-sm font-semibold text-white hover:bg-red-700 rounded-lg transition-colors"
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
