"use client";
import Image from 'next/image';
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { judgesData, sectionContent } from '../data/siteContent';

export default function Judges() {
  return (
    <section id="judges" className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl">
            {sectionContent.judges.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {sectionContent.judges.description}
          </p>
        </div>
        
        {/* Lưới các thẻ giám khảo - Tối đa 3 cột */}
        <div className="mx-auto mt-16 grid max-w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {judgesData.map((judge) => (
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