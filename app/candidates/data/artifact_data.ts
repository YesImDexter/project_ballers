export interface ArtifactTag {
  name: string;
  type: 'technical' | 'tool' | 'domain';
  confidence: 'high' | 'medium' | 'low';
}

export interface ActivityEvent {
  timestamp: string;
  action: 'uploaded' | 'processed' | 'tag_edited' | 'description_updated' | 're-matched';
  description: string;
}

export interface DemandMatch {
  id: string;
  company: string;
  role: string;
  matchScore: number;
  matchedTags: string[];
  matchReason: string;
}

export interface ArtifactDetail {
  id: string;
  title: string;
  type: 'Project' | 'Assignment' | 'Task';
  filename: string;
  uploadDate: string;
  lastUpdatedDate: string;
  status: 'processing' | 'processed' | 'needs_review';
  
  // Description & Context
  aiSummary: string;
  userDescription: string;
  filePreview: {
    type: 'pdf' | 'code' | 'document' | 'link';
    url: string;
    thumbnail?: string;
  };
  
  // Tags & Skills
  tags: ArtifactTag[];
  
  // Demand Matches
  demandMatches: DemandMatch[];
  
  // Activity History
  activityHistory: ActivityEvent[];
}

export const artifactDetailData: { [key: string]: ArtifactDetail } = {
  '1': {
    id: '1',
    title: 'E-Commerce Platform',
    type: 'Project',
    filename: 'ecommerce_platform.zip',
    uploadDate: 'Oct 20, 2024',
    lastUpdatedDate: 'Oct 25, 2024',
    status: 'processed',
    
    aiSummary: 'Full-stack e-commerce marketplace built with React frontend and Node.js backend. Features include product catalog, shopping cart, payment processing with Stripe, and AWS cloud hosting. PostgreSQL database with optimized queries. Demonstrates full SDLC knowledge.',
    
    userDescription: 'My capstone project from university. Built with a team of 3 engineers over 4 months. Handles 10k+ concurrent users with auto-scaling on AWS. Revenue processing is live for small merchants.',
    
    filePreview: {
      type: 'code',
      url: 'https://github.com/example/ecommerce-platform',
      thumbnail: '/images/artifacts/ecommerce-thumb.png',
    },
    
    tags: [
      { name: 'React', type: 'technical', confidence: 'high' },
      { name: 'Node.js', type: 'technical', confidence: 'high' },
      { name: 'PostgreSQL', type: 'technical', confidence: 'high' },
      { name: 'AWS', type: 'tool', confidence: 'high' },
      { name: 'Payment Integration', type: 'domain', confidence: 'medium' },
      { name: 'Stripe', type: 'tool', confidence: 'high' },
      { name: 'Docker', type: 'tool', confidence: 'medium' },
      { name: 'REST APIs', type: 'technical', confidence: 'high' },
    ],
    
    demandMatches: [
      {
        id: 'demand-1',
        company: 'TechCorp Inc',
        role: 'Senior Full-Stack Engineer',
        matchScore: 92,
        matchedTags: ['React', 'Node.js', 'AWS'],
        matchReason: 'Strong match on core stack; 5+ years experience needed, candidate has demonstrated expertise',
      },
      {
        id: 'demand-2',
        company: 'PaymentPro',
        role: 'Payment Systems Engineer',
        matchScore: 87,
        matchedTags: ['Payment Integration', 'Stripe', 'Node.js'],
        matchReason: 'Direct experience with payment processing systems; proven ability to handle transactions at scale',
      },
      {
        id: 'demand-3',
        company: 'CloudScale Solutions',
        role: 'AWS DevOps Engineer',
        matchScore: 78,
        matchedTags: ['AWS', 'Docker'],
        matchReason: 'Infrastructure experience demonstrated; would need to deepen containerization knowledge',
      },
    ],
    
    activityHistory: [
      {
        timestamp: 'Oct 20, 2024 2:15 PM',
        action: 'uploaded',
        description: 'Artifact uploaded',
      },
      {
        timestamp: 'Oct 20, 2024 2:45 PM',
        action: 'processed',
        description: 'AI processing completed - 8 skills extracted',
      },
      {
        timestamp: 'Oct 22, 2024 10:30 AM',
        action: 'tag_edited',
        description: 'Added "Payment Integration" tag - removed "GraphQL"',
      },
      {
        timestamp: 'Oct 25, 2024 4:00 PM',
        action: 'description_updated',
        description: 'Added personal context and team size information',
      },
      {
        timestamp: 'Oct 25, 2024 4:05 PM',
        action: 're-matched',
        description: 'Re-matched against all open demands - 3 new matches found',
      },
    ],
  },
  
  '2': {
    id: '2',
    title: 'Infrastructure as Code',
    type: 'Project',
    filename: 'terraform_configs.tar.gz',
    uploadDate: 'Oct 15, 2024',
    lastUpdatedDate: 'Oct 20, 2024',
    status: 'processed',
    
    aiSummary: 'Comprehensive Infrastructure as Code implementation using Terraform. Manages multi-region AWS deployment with auto-scaling groups, load balancers, and managed databases. CI/CD pipeline integration with GitHub Actions.',
    
    userDescription: 'Terraform configurations for a production environment I built. Manages infrastructure for a 50+ person engineering team. Includes monitoring, logging, and disaster recovery setup.',
    
    filePreview: {
      type: 'code',
      url: 'https://github.com/example/terraform-infra',
      thumbnail: '/images/artifacts/terraform-thumb.png',
    },
    
    tags: [
      { name: 'Terraform', type: 'technical', confidence: 'high' },
      { name: 'AWS', type: 'tool', confidence: 'high' },
      { name: 'CI/CD', type: 'domain', confidence: 'high' },
      { name: 'GitHub Actions', type: 'tool', confidence: 'high' },
      { name: 'Docker', type: 'technical', confidence: 'medium' },
      { name: 'Kubernetes', type: 'technical', confidence: 'low' },
      { name: 'Infrastructure', type: 'domain', confidence: 'high' },
    ],
    
    demandMatches: [
      {
        id: 'demand-4',
        company: 'CloudOps Ltd',
        role: 'Infrastructure Engineer',
        matchScore: 95,
        matchedTags: ['Terraform', 'AWS', 'Infrastructure'],
        matchReason: 'Perfect match - exactly what role requires. Direct production experience.',
      },
      {
        id: 'demand-5',
        company: 'DevFlow Systems',
        role: 'DevOps Engineer',
        matchScore: 88,
        matchedTags: ['CI/CD', 'GitHub Actions', 'AWS'],
        matchReason: 'Strong pipeline and deployment automation experience aligns well',
      },
    ],
    
    activityHistory: [
      {
        timestamp: 'Oct 15, 2024 3:20 PM',
        action: 'uploaded',
        description: 'Artifact uploaded',
      },
      {
        timestamp: 'Oct 15, 2024 4:00 PM',
        action: 'processed',
        description: 'AI processing completed - 7 skills extracted',
      },
      {
        timestamp: 'Oct 20, 2024 9:15 AM',
        action: 'tag_edited',
        description: 'Lowered confidence on "Kubernetes" tag (not primary in this project)',
      },
    ],
  },
  
  '3': {
    id: '3',
    title: 'API Documentation',
    type: 'Assignment',
    filename: 'api_docs.md',
    uploadDate: 'Oct 1, 2024',
    lastUpdatedDate: 'Oct 1, 2024',
    status: 'processed',
    
    aiSummary: 'Comprehensive REST and GraphQL API documentation with OpenAPI/Swagger specifications. Includes endpoint examples, error handling patterns, authentication flows, and rate limiting documentation.',
    
    userDescription: 'Documentation I wrote for an internal API during my internship. Helped the team standardize how we document endpoints.',
    
    filePreview: {
      type: 'document',
      url: '/artifacts/api_docs_preview.html',
      thumbnail: '/images/artifacts/api-docs-thumb.png',
    },
    
    tags: [
      { name: 'GraphQL', type: 'technical', confidence: 'high' },
      { name: 'REST APIs', type: 'technical', confidence: 'high' },
      { name: 'TypeScript', type: 'technical', confidence: 'medium' },
      { name: 'OpenAPI', type: 'tool', confidence: 'high' },
      { name: 'Documentation', type: 'domain', confidence: 'high' },
    ],
    
    demandMatches: [
      {
        id: 'demand-6',
        company: 'APIFirst Corp',
        role: 'API Product Manager',
        matchScore: 82,
        matchedTags: ['GraphQL', 'REST APIs', 'Documentation'],
        matchReason: 'Shows API design understanding and communication skills valuable for product role',
      },
    ],
    
    activityHistory: [
      {
        timestamp: 'Oct 1, 2024 11:00 AM',
        action: 'uploaded',
        description: 'Artifact uploaded',
      },
      {
        timestamp: 'Oct 1, 2024 12:30 PM',
        action: 'processed',
        description: 'AI processing completed - 5 skills extracted',
      },
    ],
  },
};
