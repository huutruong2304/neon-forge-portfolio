import Image from 'next/image';
import { Award, Code, Star } from 'lucide-react';
import GlassCard from '@/components/shared/glass-card';
import type { Profile, SocialLinks } from './types';

type Props = {
  profile: Profile;
  socialLinks: Pick<SocialLinks, 'github'>;
};

const HeroSection = ({ profile, socialLinks }: Props) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/10">
          HELLO, I&apos;M TRUONG <span className="text-sm animate-bounce">👋</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-black leading-[0.85] tracking-tighter mb-4 uppercase">
          FULL STACK <br />
          <span className="relative">
            DEVELOPER
            <svg className="absolute -bottom-4 left-0 w-full h-6 text-[#E1FF00]" viewBox="0 0 300 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 15C50 -2 150 18 298 5" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="mt-8 text-white/90 max-w-lg text-lg lg:text-xl mb-8 leading-relaxed">
          I am a Full Stack Developer with over <strong>5 years of hands-on experience</strong>. Specializing in crafting modern, highly-performant,
          and scalable web ecosystems.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="bg-[#E1FF00] text-[#113af1] font-extrabold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-white transition-colors shadow-xl shadow-[#E1FF00]/20 text-sm lg:text-base"
          >
            <Code size={20} /> VIEW MY PROJECTS
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-4 rounded-full hover:bg-white/10 transition-colors font-bold border border-white/20 text-sm lg:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
              />
            </svg>
            GITHUB PROFILE
          </a>
        </div>
      </div>

      <div className="relative h-[500px] w-full mt-12 lg:mt-0 select-none">
        <Image
          src={profile.avatar || '/avatar.webp'}
          alt={`Avatar of ${profile.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center rounded-4xl border border-white/10 shadow-2xl"
        />

        <GlassCard className="absolute sm:top-52 top-6 sm:-left-14 -left-6 px-5 py-3 flex items-center gap-3 shadow-2xl z-20">
          <span className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs lg:text-sm font-black tracking-wider text-white">AVAILABLE FOR HIRE</span>
          </div>
        </GlassCard>

        <GlassCard className="absolute sm:bottom-48 bottom-40 -right-30 px-5 py-3.5 flex items-center gap-3 shadow-2xl z-20">
          <div className="w-10 h-10 rounded-full bg-[#E1FF00] flex items-center justify-center text-[#113af1] shadow-lg shadow-[#E1FF00]/30">
            <Star size={20} fill="currentColor" />
          </div>
          <div className="font-extrabold leading-tight text-sm lg:text-base tracking-wide text-white">5+ YEARS OF EXPERIENCE</div>
        </GlassCard>

        <GlassCard className="absolute bottom-10 -left-3 px-5 py-3.5 flex items-center gap-3 shadow-2xl z-20 bg-white/15">
          <div className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-white shadow-lg shadow-cyan-400/30">
            <Award size={18} />
          </div>
          <div className="font-extrabold leading-tight text-sm lg:text-base tracking-wide text-white">Top 100 FPT SOFTWARE GAM 2023</div>
        </GlassCard>
      </div>
    </section>
  );
};

export default HeroSection;
