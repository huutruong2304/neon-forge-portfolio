import { Layers, PenTool, Server } from 'lucide-react';
import AppHeader from '../components/layout/app-header';
import AboutSection from '../components/section/about-section';
import ContactSection from '../components/section/contact-section';
import ExperienceSection from '../components/section/experience-section';
import HeroSection from '../components/section/hero-section';
import ProjectsSection from '../components/section/projects-section';
import SkillsSection from '../components/section/skills-section';
import type { Experience, Project, Profile, SkillGroup, SocialLinks } from '../components/section/types';
import AppFooter from '@/components/layout/app-footer';

export default function App() {
  const profile: Profile = {
    name: 'NGUYEN HUU TRUONG',
    title: 'Full Stack Developer',
    bio: 'Full Stack Developer with 5+ years of experience in the React ecosystem, specializing in ReactJS, Next.js, TypeScript, modern JavaScript, API integration, backend development with Next.js/NestJS and responsive web application development.',
    dateOfBirth: '',
    location: '',
    email: '',
    phone: '',
  };

  const socialLinks: SocialLinks = {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/in//',
    youtube: 'https://www.youtube.com/@',
    email: `mailto:${profile.email}`,
  };

  const skills: SkillGroup[] = [];

  const experiences: Experience[] = [];

  const projects: Project[] = [];

  return (
    <div className="min-h-screen bg-[#113af1] text-white font-sans overflow-x-hidden relative selection:bg-[#E1FF00] selection:text-[#113af1]">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#E1FF00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        <AppHeader socialLinks={socialLinks} />
        <HeroSection profile={profile} socialLinks={socialLinks} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experiences} />
        <ProjectsSection projects={projects} />
        <ContactSection profile={profile} socialLinks={socialLinks} />
        <AppFooter profile={profile} socialLinks={socialLinks} />
      </div>
    </div>
  );
}
