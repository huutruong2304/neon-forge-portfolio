import type { ReactNode } from 'react';
import { Layers, PenTool, Server } from 'lucide-react';
import AppHeader from '../components/layout/app-header';
import AboutSection from '../components/section/about-section';
import ContactSection from '../components/section/contact-section';
import ExperienceSection from '../components/section/experience-section';
import HeroSection from '../components/section/hero-section';
import ProjectsSection from '../components/section/projects-section';
import SkillsSection from '../components/section/skills-section';
import type { Experience, Project, Profile, SkillGroup, SocialLinks, Highlight } from '../components/section/types';
import AppFooter from '@/components/layout/app-footer';
import ScrollToTopButton from '@/components/shared/scroll-to-top-button';
import portfolio from '@/data/portfolio-default.json';

type SkillType = 'frontend' | 'ui-styling' | 'backend-api';

type PortfolioSkillItem = {
  name: string;
  level: number;
};

type PortfolioSkillGroup = {
  type: SkillType;
  category: string;
  items: PortfolioSkillItem[];
};

type PortfolioData = {
  profile: Profile;
  socialLinks: SocialLinks;
  skills: PortfolioSkillGroup[];
  experiences: Experience[];
  projects: Project[];
  highlight: Highlight;
};

export default function App() {
  const data = portfolio as unknown as PortfolioData;

  const getSkillLevelLabel = (level: number) => {
    if (level >= 90) {
      return 'Expert';
    }

    if (level >= 75) {
      return 'Advanced';
    }

    return 'Intermediate';
  };

  const profile: Profile = data.profile;

  const socialLinks: SocialLinks = {
    ...data.socialLinks,
    email: data.socialLinks.email.startsWith('mailto:') ? data.socialLinks.email : `mailto:${data.socialLinks.email}`,
  };

  const highlight: Highlight = {
    yearsOfExperience: data.highlight?.yearsOfExperience,
    awards: data.highlight?.awards,
  };

  const skillIconByType: Record<SkillType, ReactNode> = {
    frontend: <Layers className="text-[#E1FF00]" size={20} />,
    'ui-styling': <PenTool className="text-[#E1FF00]" size={20} />,
    'backend-api': <Server className="text-[#E1FF00]" size={20} />,
  };

  const skills: SkillGroup[] = data.skills.map((skillGroup) => ({
    category: skillGroup.category,
    icon: skillIconByType[skillGroup.type],
    items: skillGroup.items.map((item) => ({
      name: item.name,
      level: item.level,
      label: getSkillLevelLabel(item.level),
    })),
  }));

  const experiences: Experience[] = data.experiences;
  const projects: Project[] = data.projects;

  return (
    <div className="min-h-screen bg-[#113af1] text-white font-sans relative selection:bg-[#E1FF00] selection:text-[#113af1]">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#E1FF00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        <AppHeader socialLinks={socialLinks} />
        <HeroSection profile={profile} socialLinks={socialLinks} highlight={highlight} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <ContactSection />
        <AppFooter profile={profile} socialLinks={socialLinks} />
      </div>

      <ScrollToTopButton />
    </div>
  );
}
