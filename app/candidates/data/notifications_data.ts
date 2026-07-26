export type CandidateNotificationType =
  | 'match'
  | 'recommendation'
  | 'application'
  | 'artifact'
  | 'feedback'
  | 'profile'
  | 'digest'

export interface CandidateNotification {
  id: string
  type: CandidateNotificationType
  title: string
  description: string
  timeAgo: string
  url: string
  read: boolean
}

export const candidateNotifications: CandidateNotification[] = [
  {
    id: 'cn1',
    type: 'match',
    title: 'New 92% match',
    description: 'TechVenture Labs matched your profile for Senior Full-Stack Engineer.',
    timeAgo: '8m ago',
    url: '/candidates/matches',
    read: false,
  },
  {
    id: 'cn2',
    type: 'recommendation',
    title: 'Recommendation updated',
    description: 'Advanced System Design moved to the top of your next best actions.',
    timeAgo: '42m ago',
    url: '/candidates/recommendations',
    read: false,
  },
  {
    id: 'cn3',
    type: 'application',
    title: 'Application status changed',
    description: 'Grab moved your Product Analyst application to offer stage.',
    timeAgo: '2h ago',
    url: '/candidates/activity/applications',
    read: false,
  },
  {
    id: 'cn4',
    type: 'artifact',
    title: 'Artifact re-matched',
    description: 'E-Commerce Platform found 3 new employer demand matches.',
    timeAgo: '5h ago',
    url: '/candidates/activity/artifacts',
    read: false,
  },
  {
    id: 'cn5',
    type: 'feedback',
    title: 'Mentor feedback ready',
    description: 'Your mentor left feedback on leadership and system design gaps.',
    timeAgo: '1d ago',
    url: '/candidates/compass',
    read: true,
  },
  {
    id: 'cn6',
    type: 'profile',
    title: 'Profile strength improved',
    description: 'Adding infrastructure artifacts improved your profile completeness.',
    timeAgo: '2d ago',
    url: '/candidates/profile',
    read: true,
  },
  {
    id: 'cn7',
    type: 'match',
    title: 'Remote role match',
    description: 'CloudScale Inc matched your Terraform and AWS experience.',
    timeAgo: '3d ago',
    url: '/candidates/matches',
    read: true,
  },
  {
    id: 'cn8',
    type: 'digest',
    title: 'Weekly career digest',
    description: 'You completed 2 actions and unlocked 4 stronger role signals this week.',
    timeAgo: '5d ago',
    url: '/candidates',
    read: true,
  },
]
