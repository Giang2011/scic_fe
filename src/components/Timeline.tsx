
import { CalendarDays } from 'lucide-react';
import { timelineData, TimelineItem, sectionContent } from '../data/siteContent';
import RevealOnScroll from './RevealOnScroll';

interface TimelineProps {
  title?: string;
  description?: string;
  timeline?: TimelineItem[];
}

export default function Timeline({
  title = sectionContent.timeline.title,
  description = sectionContent.timeline.description,
  timeline = timelineData
}: TimelineProps) {
  return (
    <section id="timeline" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.8}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-red-900">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {description}
            </p>
          </div>
        </RevealOnScroll>
        
        {/* Bố cục thẻ mới */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <RevealOnScroll key={item.phase} direction="up" delay={index * 0.1} duration={0.6}>
                <div 
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
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
