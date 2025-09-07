import { Trophy, Medal, Award as AwardIcon, Star, GraduationCap, Users, BookOpen } from 'lucide-react';
import { awardsData, allParticipantsBenefits, sectionContent } from '../data/siteContent';
import RevealOnScroll from './RevealOnScroll';

// Hàm để lấy component icon từ tên
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ElementType } = {
    Trophy,
    Medal,
    Award: AwardIcon,
    Star,
    GraduationCap,
    Users,
    BookOpen
  };
  return iconMap[iconName] || Trophy;
};

export default function Awards() {
  return (
    <section id="awards" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <RevealOnScroll direction="up" duration={0.8}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
              {sectionContent.awards.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {sectionContent.awards.description}
            </p>
          </div>
        </RevealOnScroll>
        
        {/* Lưới các thẻ giải thưởng */}
        <div className="mx-auto mt-16 grid max-w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {awardsData.map((award, index) => {
            const IconComponent = getIconComponent(award.iconName);
            return (
            <RevealOnScroll key={award.title} direction="up" delay={index * 0.1} duration={0.6}>
              <div className={`bg-white rounded-xl shadow-lg p-8 flex flex-col text-left border-t-4 ${award.colorClasses.border} transition-transform duration-300 hover:-translate-y-2`}>
                <div className="flex-grow">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${award.colorClasses.iconBg}`}>
                    <IconComponent className={`w-8 h-8 ${award.colorClasses.iconText}`} />
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
            </RevealOnScroll>
            );
          })}
        </div>

        {/* Banner Quyền lợi chung */}
        <RevealOnScroll direction="up" delay={0.5} duration={0.8}>
          <div className="mt-20 bg-red-800 text-white rounded-xl p-10">
              <h3 className="text-2xl font-bold text-center mb-8">{sectionContent.awards.allParticipantsTitle}</h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  {allParticipantsBenefits.map((benefit) => {
                      const BenefitIcon = getIconComponent(benefit.iconName);
                      return (
                      <div key={benefit.title} className="text-center flex flex-col items-center">
                          <div className="bg-red-700/80 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                              <BenefitIcon className="w-8 h-8 text-white"/>
                          </div>
                          <h4 className="font-semibold text-lg">{benefit.title}</h4>
                          <p className="text-red-200 text-sm">{benefit.description}</p>
                      </div>
                      );
                  })}
              </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
