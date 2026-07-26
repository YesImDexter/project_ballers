export interface Match {
  id: string;
  company: string;
  companyLogo: string;
  role: string;
  matchScore: number;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  location: string;
  type: 'remote' | 'hybrid' | 'onsite';
  why: string;
  description?: string;
}

export const matchesData: Match[] = [
  {
    id: '1',
    company: 'TechVenture Labs',
    companyLogo: 'TV',
    role: 'Senior Full-Stack Engineer',
    matchScore: 92,
    salaryMin: 180000,
    salaryMax: 220000,
    currency: 'USD',
    location: 'San Francisco, CA',
    type: 'hybrid',
    why: 'Your React & Node.js experience aligns perfectly with their stack. They value your DevOps background for infrastructure work.',
    description: 'Leading AI/ML platform startup looking for experienced full-stack engineers to build scalable systems.',
  },
  {
    id: '2',
    company: 'CloudScale Inc',
    companyLogo: 'CS',
    role: 'Backend Engineer',
    matchScore: 85,
    salaryMin: 160000,
    salaryMax: 200000,
    currency: 'USD',
    location: 'Remote',
    type: 'remote',
    why: 'Your Terraform and AWS expertise directly matches their infrastructure needs. PostgreSQL skills are a strong fit.',
    description: 'Infrastructure-first company building next-generation cloud deployment tools.',
  },
  {
    id: '3',
    company: 'DataFlow Systems',
    companyLogo: 'DF',
    role: 'Full-Stack Developer',
    matchScore: 78,
    salaryMin: 150000,
    salaryMax: 185000,
    currency: 'USD',
    location: 'Austin, TX',
    type: 'onsite',
    why: 'Your TypeScript proficiency and GraphQL experience are valuable. Growing team needs your full-stack capabilities.',
    description: 'Real-time data processing platform serving Fortune 500 companies.',
  },
];
