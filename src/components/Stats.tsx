import Link from 'next/link';

interface StatsData {
  label: string;
  value: string;
}

interface StatsProps {
  stats?: StatsData[];
}

const defaultStats: StatsData[] = [
  { label: 'Người tham gia', value: '500+' },
  { label: 'Giải thưởng', value: '$50K' },
  { label: 'Trường Đại học', value: '20+' },
  { label: 'Tháng', value: '3' },
];

export default function Stats({ stats = defaultStats }: StatsProps) {
  return (
    <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl font-bold text-white sm:text-4xl">
            {stat.value}
          </div>
          <div className="mt-1 text-sm text-gray-100">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
