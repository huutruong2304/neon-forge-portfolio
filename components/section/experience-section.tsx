import { Briefcase } from 'lucide-react';
import GlassCard from '@/components/shared/glass-card';
import Reveal from '@/components/shared/reveal';
import SectionHeading from './section-heading';
import type { Experience } from './types';

type Props = {
  experiences: Experience[];
};

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <GlassCard className="p-6 lg:p-8 flex flex-col justify-between rounded-4xl">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-black text-xl lg:text-2xl text-[#E1FF00]">{experience.company}</h4>
            <p className="text-xs lg:text-sm font-semibold text-white/70">{experience.position}</p>
          </div>

          {experience.startDate && experience.endDate ? (
            <span className="text-[10px] lg:text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
              {experience.startDate} - {experience.endDate}
            </span>
          ) : null}
        </div>

        <ul className="space-y-3 mt-4">
          {experience.description.map((desc) => (
            <li key={desc} className="text-sm lg:text-base text-white/80 leading-relaxed flex items-start gap-2">
              <span className="text-[#E1FF00] mt-1 shrink-0">•</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
};

const ExperienceSection = ({ experiences }: Props) => {
  return (
    <section id="experience" className="scroll-mt-24 mb-16">
      <Reveal>
        <SectionHeading icon={<Briefcase size={18} className="text-[#E1FF00]" />} title="Work Experience" />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {experiences.map((experience, index) => (
          <Reveal key={experience.company} delay={index * 90} className="flex">
            <ExperienceCard experience={experience} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
