import { ArrowUpRight } from 'lucide-react';
import React from 'react';

type Props = {
  socialLinks: {
    linkedin: string;
  };
};

const AppHeader = ({ socialLinks }: Props) => {
  return (
    <nav className="flex items-center justify-between mb-16 sticky top-0 z-30 py-3 bg-[#113af1]/85 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="text-3xl font-black text-[#E1FF00] tracking-tighter bg-white/10 px-3 py-1 rounded-2xl border border-white/20">
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8 text-sm lg:text-base font-semibold">
        <a href="#about" className="hover:text-[#E1FF00] transition-colors">
          About
        </a>
        <a href="#skills" className="hover:text-[#E1FF00] transition-colors">
          Skills
        </a>
        <a href="#experience" className="hover:text-[#E1FF00] transition-colors">
          Experience
        </a>
        <a href="#projects" className="hover:text-[#E1FF00] transition-colors">
          Projects
        </a>
        <a href="#contact" className="hover:text-[#E1FF00] transition-colors">
          Contact
        </a>
      </div>

      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noreferrer"
        className="hidden sm:flex border border-white/30 hover:border-[#E1FF00] hover:bg-[#E1FF00] hover:text-[#113af1] transition-all rounded-full px-6 py-2.5 items-center gap-2 text-sm lg:text-base font-bold shadow-lg"
      >
        LINKEDIN <ArrowUpRight size={16} />
      </a>
    </nav>
  );
};

export default AppHeader;
