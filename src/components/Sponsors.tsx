import Image from 'next/image';
import { sponsorsData, sectionContent } from '../data/siteContent';

// --- INTERFACES & DATA ---
interface Sponsor {
  name: string;
  logo: string;
  website?: string;
}

interface SponsorsProps {
  title?: string;
  description?: string;
  sponsors?: Sponsor[];
}

// --- COMPONENT ---
export default function Sponsors({
  title = sectionContent.sponsors.title,
  description = sectionContent.sponsors.description,
  sponsors = sponsorsData
}: SponsorsProps) {

  return (
    <section id="sponsors" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
        
        {/* Sponsor Grid */}
        <div className="mx-auto mt-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-xl bg-gray-50 p-6 aspect-[3/2] transition hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
