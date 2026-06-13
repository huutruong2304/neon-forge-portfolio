import { Cpu } from 'lucide-react';
import GlassCard from '@/components/shared/glass-card';
import Reveal from '@/components/shared/reveal';
import SectionHeading from './section-heading';
import type { SkillGroup } from './types';

type Props = {
  skills: SkillGroup[];
};

const SkillCard = ({ skillGroup }: { skillGroup: SkillGroup }) => {
  return (
    <GlassCard className="p-6 lg:p-8 flex flex-col justify-between hover:-translate-y-1">
      <div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          {skillGroup.icon}
          <h3 className="font-extrabold text-sm lg:text-base tracking-wide text-[#E1FF00] uppercase">{skillGroup.category}</h3>
        </div>
        <ul className="space-y-4">
          {skillGroup.items.map((item) => (
            <li key={item.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs lg:text-sm font-bold text-white">{item.name}</span>
                <span className="text-[10px] lg:text-xs text-white/60 bg-white/10 px-2.5 py-0.5 rounded-full font-semibold">{item.label}</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#E1FF00] h-full rounded-full" style={{ width: `${item.level}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
};

const SkillsSection = ({ skills }: Props) => {
  return (
    <section id="skills" className="scroll-mt-24 mb-16">
      <Reveal>
        <SectionHeading icon={<Cpu size={18} className="text-[#E1FF00]" />} title="Professional Skills" />
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skillGroup, index) => (
          <Reveal key={skillGroup.category} delay={index * 80}>
            <SkillCard skillGroup={skillGroup} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
