'use client';

import Image from 'next/image';
import { ExternalLink, Monitor } from 'lucide-react';
import { useState } from 'react';
import GlassCard from '@/components/shared/glass-card';
import SectionHeading from './section-heading';
import type { Project } from './types';

type Props = {
  projects: Project[];
};

type ProjectFilter = 'all' | 'freelance' | 'company';

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <GlassCard className="p-6 lg:p-8 flex flex-col justify-between relative group overflow-hidden rounded-4xl">
      <div>
        <div className="w-full h-48 lg:h-60 rounded-2xl overflow-hidden mb-2 relative border border-white/10">
          <Image src={project.thumbnail} alt={project.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#113af1] bg-[#E1FF00] px-3 py-1.5 rounded-full shadow-lg">
              {project.domain}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl lg:text-3xl font-black text-white group-hover:text-[#E1FF00] transition-colors tracking-tight">{project.name}</h3>
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#E1FF00] hover:text-[#113af1] flex items-center justify-center transition-all border border-white/20 shadow-lg"
            >
              <ExternalLink size={20} />
            </a>
          ) : null}
        </div>

        <p className="text-sm lg:text-base text-white/85 mb-6 leading-relaxed">{project.description}</p>

        <div className="mb-2">
          <div className="text-xs lg:text-sm font-extrabold uppercase text-white/50 tracking-wider mb-2">
            Role: <b className="text-white">{project.role}</b>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs lg:text-sm font-extrabold uppercase text-white/50 tracking-wider mb-3">Tech Stack</div>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs lg:text-sm font-bold bg-white/5 hover:bg-white/15 text-white border border-white/10 px-3.5 py-1.5 rounded-full transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

const FilterButton = ({
  label,
  value,
  currentValue,
  onChange,
}: {
  label: string;
  value: ProjectFilter;
  currentValue: ProjectFilter;
  onChange: (value: ProjectFilter) => void;
}) => {
  const isActive = currentValue === value;

  return (
    <button onClick={() => onChange(value)} className={`px-5 py-2 rounded-full text-xs lg:text-sm font-bold transition-all ${isActive ? 'bg-[#E1FF00] text-[#113af1]' : 'text-white hover:text-[#E1FF00]'}`}>
      {label}
    </button>
  );
};

const ProjectsSection = ({ projects }: Props) => {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all');

  const filteredProjects = projectFilter === 'all' ? projects : projects.filter((project) => project.source === projectFilter);

  return (
    <section id="projects" className="scroll-mt-24 mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <SectionHeading icon={<Monitor size={20} className="text-[#E1FF00]" />} title="Featured Projects" className="mb-0" />

        <div className="flex bg-white/10 p-1.5 rounded-full border border-white/10 self-start">
          <FilterButton label="All" value="all" currentValue={projectFilter} onChange={setProjectFilter} />
          <FilterButton label="Freelance" value="freelance" currentValue={projectFilter} onChange={setProjectFilter} />
          <FilterButton label="Company" value="company" currentValue={projectFilter} onChange={setProjectFilter} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
