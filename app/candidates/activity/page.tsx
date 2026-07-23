import AppShell from '@/app/candidates/component/AppShell';
import { candidateApplications, type ApplicationStage } from '@/app/candidates/data/candidate_data';

const stageLabels: Record<ApplicationStage, string> = {
  applied: 'APPLIED',
  screening: 'SCREENING',
  interview: 'INTERVIEW',
  offer: 'OFFER',
};

const stageOrder: ApplicationStage[] = ['applied', 'screening', 'interview', 'offer'];

function StageTimeline({ currentStage }: { currentStage: ApplicationStage }) {
  const currentIndex = stageOrder.indexOf(currentStage);

  return (
    <div className="my-4">
      <div className="flex items-center gap-2">
        {stageOrder.map((stage, index) => (
          <div key={stage} className="flex items-center flex-1">
            <div className="flex justify-center flex-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index <= currentIndex
                    ? 'bg-green-600'
                    : 'bg-gray-300'
                }`}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Line */}
            {index < stageOrder.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  index < currentIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 text-xs text-gray-600 font-semibold mt-2">
        {stageOrder.map((stage) => (
          <div key={stage} className="flex-1 text-center">
            {stageLabels[stage]}
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplicationCard({ application }: { application: typeof candidateApplications[0] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            {application.logo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {application.company} · {application.jobTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {application.currency} {application.salaryMin.toLocaleString()}-{application.salaryMax.toLocaleString()} · {application.location} · {application.fit}% fit
            </p>
          </div>
        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
          Offer
        </button>
      </div>

      <StageTimeline currentStage={application.stage} />

      <div className="flex gap-3 mt-6">
        {application.stage === 'offer' && (
          <>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Review offer
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              View role
            </button>
            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium ml-auto">
              Decline
            </button>
          </>
        )}
        {application.stage === 'interview' && (
          <>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              View details
            </button>
            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium ml-auto">
              More options
            </button>
          </>
        )}
        {application.stage === 'screening' && (
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View role
          </button>
        )}
        {application.stage === 'applied' && (
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View application
          </button>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <AppShell />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Left Sidebar (Small) */}
          <div className="col-span-1 space-y-6">
            {/* User Profile Row */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-600">Senior Developer</p>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Content (Big) */}
          <div className="col-span-3 bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
            <main className="content-container">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Applications</h1>
              <div className="space-y-4">
                {candidateApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
