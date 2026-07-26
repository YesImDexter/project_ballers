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
    company_name: 'Sime Darby Technology',
    sector: 'Technology',
    location: 'Kuala Lumpur, Malaysia',
    verifications: ['verified', 'certified'],
    company_image: '/images/discovery/sime-darby.png',
    ratings: 4.8,
    followers: 12500,
    open_jobs: 24,
    tenure: '10+ years',
    programs: ['internship', 'mentorship', 'graduate'],
  },
  {
    id: '2',
    company_name: 'Maybank',
    sector: 'Finance',
    location: 'Kuala Lumpur, Malaysia',
    verifications: ['verified'],
    company_image: '/images/discovery/maybank-2.png',
    ratings: 4.6,
    followers: 8300,
    open_jobs: 15,
    tenure: '15+ years',
    programs: ['graduate', 'executive'],
  },
  {
    id: '3',
    company_name: 'AirAsia',
    sector: 'Aviation',
    location: 'Kuala Lumpur, Malaysia',
    verifications: ['verified', 'certified'],
    company_image: '/images/discovery/air-asia.png',
    ratings: 4.9,
    followers: 6700,
    open_jobs: 18,
    tenure: '20+ years',
    programs: ['internship', 'graduate'],
  },
  {
    id: '4',
    company_name: 'PETRONAS',
    sector: 'Energy',
    location: 'Kuala Lumpur, Malaysia',
    verifications: ['verified', 'certified'],
    company_image: '/images/discovery/petronas.png',
    ratings: 4.7,
    followers: 9200,
    open_jobs: 22,
    tenure: '30+ years',
    programs: ['mentorship', 'graduate', 'internship'],
  },
  {
    id: '5',
    company_name: 'Axiata',
    sector: 'Telecommunications',
    location: 'Petaling Jaya, Selangor',
    verifications: ['verified'],
    company_image: '/images/discovery/axiata.png',
    ratings: 4.5,
    followers: 5400,
    open_jobs: 12,
    tenure: '15+ years',
    programs: ['internship', 'graduate'],
  },
  {
    id: '6',
    company_name: 'Lazada Malaysia',
    sector: 'E-commerce',
    location: 'Selangor, Malaysia',
    verifications: ['verified', 'certified'],
    company_image: '/images/discovery/lazada.png',
    ratings: 4.3,
    followers: 11000,
    open_jobs: 31,
    tenure: '10+ years',
    programs: ['graduate', 'internship'],
  },
];

export const sectors = [
  'Technology',
  'Finance',
  'Energy',
  'Aviation',
  'Telecommunications',
  'E-commerce',
  'Manufacturing',
  'Hospitality',
];

export const locations = [
  'Kuala Lumpur, Malaysia',
  'Petaling Jaya, Selangor',
  'Shah Alam, Selangor',
  'Penang, Malaysia',
  'Johor Bahru, Johor',
  'Kota Kinabalu, Sabah',
  'Kuching, Sarawak',
  'Subang Jaya, Selangor',
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
