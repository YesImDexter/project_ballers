export interface CandidateProfile {
  name: string;
  title: string;
  location: string;
  bio: string;
  links: {
    linkedin: string;
    github: string;
    portfolio: string;
  };
}

export interface Resume {
  filename: string;
  uploadDate: string;
  size: string;
}

export interface CandidatePreferences {
  targetRoles: string[];
  workStyle: 'remote' | 'hybrid' | 'onsite';
  relocate: boolean;
  notifications: {
    demandMatches: boolean;
    mentorFeedback: boolean;
    weeklyDigest: boolean;
  };
}

export interface CandidateDetails {
  profile: CandidateProfile;
  resume: Resume;
  preferences: CandidatePreferences;
}

export const candidateDetails: CandidateDetails = {
  profile: {
    name: 'Alex Rivera',
    title: 'Mid-Level Full-Stack Developer',
    location: 'San Francisco, CA',
    bio: 'Passionate about building scalable systems and mentoring junior developers. 5+ years of experience in full-stack development with expertise in cloud architecture, DevOps, and modern web frameworks. Always learning new technologies and contributing to open source projects.',
    links: {
      linkedin: 'linkedin.com/in/alexrivera',
      github: 'github.com/alexrivera',
      portfolio: 'alexrivera.dev',
    },
  },
  resume: {
    filename: 'Alex_Rivera_Resume.pdf',
    uploadDate: 'Nov 15, 2024',
    size: '248 KB',
  },
  preferences: {
    targetRoles: ['Full Stack Developer', 'Backend Engineer', 'DevOps Engineer'],
    workStyle: 'hybrid',
    relocate: true,
    notifications: {
      demandMatches: true,
      mentorFeedback: true,
      weeklyDigest: false,
    },
  },
};
