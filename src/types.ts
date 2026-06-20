export interface ProjectSpecs {
  surface?: string;
  units?: string;
  energy?: string;
  heating?: string;
  volume?: string;
  heritageStat?: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  image: string;
  status: 'active' | 'completed';
  badge?: string;
  description?: string;
  specs?: ProjectSpecs;
  highlights?: string[];
  features?: string[];
  blueprintUrl?: string;
}

export interface Stat {
  id: string;
  count: number;
  suffix: string;
  label: string;
  description: string;
}

export interface TargetAudience {
  id: string;
  type: 'B2B' | 'B2C';
  tag: string;
  title: string;
  description: string;
  checklist: string[];
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
