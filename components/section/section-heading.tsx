import type { ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  title: string;
  className?: string;
};

const SectionHeading = ({ icon, title, className = '' }: Props) => {
  return (
    <div className={`flex items-center gap-3 text-white/80 mb-8 font-bold uppercase text-sm lg:text-base ${className}`}>
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default SectionHeading;
