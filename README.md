# Career OS

A talent matchmaking platform connecting job candidates with employers. Career OS streamlines the hiring process by intelligently matching candidates with opportunities based on skills, experience, and preferences.

## Features

- **Candidate Portal**: Browse job opportunities, view career matches, and manage applications
- **Employer Dashboard**: Post job listings, review candidates, and manage hiring pipeline
- **Smart Matching**: AI-powered candidate-to-job matching algorithm
- **Real-time Updates**: Live notifications for new matches and application status changes
- **Responsive Design**: Optimized for desktop and mobile devices

## Tech Stack

### Frontend
- **Next.js 15** (App Router) - React framework with built-in SSR and API routes
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and standards

### Data Layer
- **Static JSON** - Sample data for prototype/demo purposes
- **Next.js API Routes** - Backend API layer
- **In-Memory Session State** - Data mutations for current session

> **Note**: This is a frontend-first prototype. The real backend (Laravel, MySQL, JWT auth) will be integrated separately.

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/career-os.git
cd career-os
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Project Structure

```
career-os/
├── app/
│   ├── api/                  # API routes
│   ├── candidates/           # Candidate pages and flows
│   ├── employers/            # Employer pages and flows
│   ├── components/           # Reusable React components
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── data/                     # Static JSON data files
├── public/                   # Static assets
├── styles/                   # Global and component styles
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build production bundle
npm run build

# Run production server
npm start

# Lint and fix code
npm run lint

# Type check
npm run type-check
```

### Development Conventions

- **API Routes**: Keep thin - read JSON, apply logic, return response
- **Client Components**: Fetch via `fetch()` to API routes only
- **Response Format**: All API responses use envelope format: `{ status, message, data }`
- **Data Access**: No direct JSON imports in components - always use API routes
- **Comments**: Only add comments to non-obvious code

## Deployment

### Deployment to Vercel (Recommended)

Vercel is the optimal platform for Next.js applications.

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Select your GitHub repository
- Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
In Vercel dashboard:
- Go to Settings → Environment Variables
- Add any required variables (e.g., API endpoints, keys)

4. **Deploy**
- Merging to main will trigger automatic deployment
- Check deployment status in Vercel dashboard

### Manual Deployment

1. **Build the project**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

3. **Use a process manager** (for production)
```bash
npm install -g pm2
pm2 start npm --name "career-os" -- start
```

### Docker Deployment

1. **Create Dockerfile** (if not exists)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. **Build and run**
```bash
docker build -t career-os .
docker run -p 3000:3000 career-os
```

## API Endpoints

### Candidates
- `GET /api/candidates` - List all candidates
- `GET /api/candidates/[id]` - Get candidate details
- `POST /api/candidates` - Create candidate
- `GET /api/candidates/[id]/matches` - Get job matches for candidate

### Employers
- `GET /api/employers` - List all employers
- `GET /api/employers/[id]` - Get employer details
- `POST /api/employers` - Create employer
- `GET /api/employers/[id]/matches` - Get candidate matches for employer

### Jobs
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Post new job
- `GET /api/jobs/[id]` - Get job details

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get applications
- `PATCH /api/applications/[id]` - Update application status

## Testing

```bash
# Run tests (when test suite is added)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Performance

- **Build Time**: ~60 seconds
- **Initial Page Load**: < 2 seconds (with optimizations)
- **API Response Time**: < 100ms (static data)

### Optimization Tips

- Use Next.js Image component for images
- Enable Static Site Generation (SSG) where possible
- Implement Progressive Enhancement
- Monitor Core Web Vitals in Vercel Analytics

## Troubleshooting

### Common Issues

**Port 3000 already in use**
```bash
npx kill-port 3000
npm run dev
```

**Module not found errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails**
- Check Node.js version: `node --version` (should be 18+)
- Run `npm run lint` to catch type errors
- Clear build cache: `rm -rf .next`

## Roadmap

- [ ] Real backend integration (Laravel)
- [ ] User authentication (JWT)
- [ ] Database integration (MySQL)
- [ ] Advanced matching algorithm
- [ ] Video profile support
- [ ] Interview scheduling
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

Please ensure code passes linting and type checks before submitting PRs.

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For questions or issues, please open a GitHub issue or contact the development team.

---

**Built with ❤️ for the future of talent matching**