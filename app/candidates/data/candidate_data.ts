export type ApplicationStage = 'applied' | 'screening' | 'interview' | 'offer';

export interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  location: string;
  stage: ApplicationStage;
  fit: number; // percentage
  logo: string;
}

export const candidateApplications: JobApplication[] = [
  {
    id: '1',
    jobTitle: 'Product Analyst',
    company: 'Grab',
    salaryMin: 4500,
    salaryMax: 6000,
    currency: 'RM',
    location: 'Singapore / KL',
    stage: 'offer',
    fit: 84,
    logo: '/images/applications/grab.png',
  },
  {
    id: '2',
    jobTitle: 'Senior Frontend Engineer',
    company: 'TikTok',
    salaryMin: 8000,
    salaryMax: 12000,
    currency: 'SGD',
    location: 'Singapore',
    stage: 'interview',
    fit: 78,
    logo: '/images/applications/tiktok.png',
  },
  {
    id: '3',
    jobTitle: 'UX/UI Designer',
    company: 'Shopee',
    salaryMin: 5500,
    salaryMax: 7500,
    currency: 'RM',
    location: 'Kuala Lumpur',
    stage: 'screening',
    fit: 91,
    logo: '/images/applications/shopee.png',
  },
];
