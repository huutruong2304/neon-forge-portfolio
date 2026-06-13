import type { ReactNode } from 'react';

export type SocialLinks = {
  github: string;
  linkedin: string;
  youtube: string;
  email: string;
};

export type Profile = {
  name: string;
  title: string;
  bio: string;
  dateOfBirth: string;
  location: string;
  email: string;
  phone: string;
  avatar?: string;
  education?: string;
};

export type SkillItem = {
  name: string;
  level: number;
  label: string;
};

export type SkillGroup = {
  category: string;
  icon: ReactNode;
  items: SkillItem[];
};

export type Experience = {
  company: string;
  position: string;
  startDate?: string;
  endDate?: string;
  description: string[];
};

export type Project = {
  name: string;
  source: string;
  domain: string;
  thumbnail: string;
  description: string;
  techStack: string[];
  role: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
};
