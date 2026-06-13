import Image from 'next/image';
import { Award, Calendar, GraduationCap, MapPin } from 'lucide-react';
import GlassCard from '@/components/shared/glass-card';
import type { Profile } from './types';

type Props = {
  profile: Profile;
};

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const InfoItem = ({ icon, label, value }: InfoItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E1FF00]">
        {icon}
      </div>
      <div>
        <div className="text-[10px] lg:text-xs text-white/50 font-bold uppercase">{label}</div>
        <div className="text-sm lg:text-base font-semibold leading-snug">{value}</div>
      </div>
    </div>
  );
};

const AboutSection = ({ profile }: Props) => {
  return (
    <section id="about" className="scroll-mt-24">
      <GlassCard className="p-6 md:p-8 mb-12 flex flex-col lg:flex-row items-center gap-8 relative z-20 rounded-4xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 flex-1 border-b lg:border-b-0 lg:border-r border-white/15 pb-6 lg:pb-0 lg:pr-8">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-[#E1FF00] absolute -top-1.5 -left-1.5 z-0" />
            <div className="relative z-10 w-24 h-24 rounded-full bg-slate-900 border-4 border-[#113af1] overflow-hidden">
              <Image src={profile.avatar || '/avatar.webp'} alt={`Avatar of ${profile.name}`} fill sizes="96px" className="object-cover" />
            </div>
          </div>
          <div>
            <div className="text-xs lg:text-sm font-bold tracking-widest text-[#E1FF00] mb-1">BIOGRAPHY</div>
            <h2 className="text-3xl lg:text-4xl font-black mb-2">{profile.name}</h2>
            <p className="text-sm lg:text-base text-white/90 leading-relaxed max-w-lg">{profile.bio}</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
          <InfoItem icon={<MapPin size={18} />} label="Location" value={profile.location} />
          <InfoItem icon={<Calendar size={18} />} label="Date of Birth" value={profile.dateOfBirth} />
          <InfoItem icon={<GraduationCap size={18} />} label="Education" value={profile.education || 'N/A'} />
          <InfoItem icon={<Award size={18} />} label="Major" value="E-Commerce" />
        </div>
      </GlassCard>
    </section>
  );
};

export default AboutSection;
