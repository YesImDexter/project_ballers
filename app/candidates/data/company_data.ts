export interface Company {
  id: string;
  company_name: string;
  sector: string;
  location: string;
  verifications: string[];
  company_image: string;
  ratings: number;
  followers: number;
  open_jobs: number;
  tenure: string;
  programs: string[];
}

export const companies: Company[] = [
  {
    id: '1',
    company_name: 'TechVision Labs',
    sector: 'Technology',
    location: 'San Francisco, CA',
    verifications: ['verified', 'certified'],
    company_image: '/placeholder.jpg',
    ratings: 4.8,
    followers: 12500,
    open_jobs: 24,
    tenure: '10+ years',
    programs: ['internship', 'mentorship', 'graduate'],
  },
  {
    id: '2',
    company_name: 'FinanceFirst',
    sector: 'Finance',
    location: 'New York, NY',
    verifications: ['verified'],
    company_image: '/placeholder.jpg',
    ratings: 4.6,
    followers: 8300,
    open_jobs: 15,
    tenure: '15+ years',
    programs: ['graduate', 'executive'],
  },
  {
    id: '3',
    company_name: 'GreenEarth Solutions',
    sector: 'Sustainability',
    location: 'Seattle, WA',
    verifications: ['verified', 'certified', 'eco-friendly'],
    company_image: '/placeholder.jpg',
    ratings: 4.9,
    followers: 6700,
    open_jobs: 18,
    tenure: '5-10 years',
    programs: ['internship', 'graduate'],
  },
  {
    id: '4',
    company_name: 'HealthWave Innovations',
    sector: 'Healthcare',
    location: 'Boston, MA',
    verifications: ['verified', 'certified'],
    company_image: '/placeholder.jpg',
    ratings: 4.7,
    followers: 9200,
    open_jobs: 22,
    tenure: '10+ years',
    programs: ['mentorship', 'graduate', 'internship'],
  },
  {
    id: '5',
    company_name: 'Creative Studios Inc',
    sector: 'Creative',
    location: 'Los Angeles, CA',
    verifications: ['verified'],
    company_image: '/placeholder.jpg',
    ratings: 4.5,
    followers: 5400,
    open_jobs: 12,
    tenure: '3-5 years',
    programs: ['internship', 'freelance'],
  },
  {
    id: '6',
    company_name: 'RetailMax Global',
    sector: 'Retail',
    location: 'Chicago, IL',
    verifications: ['verified', 'certified'],
    company_image: '/placeholder.jpg',
    ratings: 4.3,
    followers: 11000,
    open_jobs: 31,
    tenure: '20+ years',
    programs: ['graduate', 'internship'],
  },
];

export const sectors = [
  'Technology',
  'Finance',
  'Sustainability',
  'Healthcare',
  'Creative',
  'Retail',
  'Manufacturing',
  'Education',
];

export const locations = [
  'San Francisco, CA',
  'New York, NY',
  'Seattle, WA',
  'Boston, MA',
  'Los Angeles, CA',
  'Chicago, IL',
  'Austin, TX',
  'Denver, CO',
];

export const ratings = [
  { label: '4.5+', value: 4.5 },
  { label: '4.6+', value: 4.6 },
  { label: '4.7+', value: 4.7 },
  { label: '4.8+', value: 4.8 },
  { label: '4.9+', value: 4.9 },
];

export const tenures = [
  '0-2 years',
  '3-5 years',
  '5-10 years',
  '10+ years',
  '15+ years',
  '20+ years',
];

export const programs = [
  'internship',
  'graduate',
  'mentorship',
  'executive',
  'freelance',
];
