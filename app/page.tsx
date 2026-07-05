import Header from './components/Header';

export default function LandingPage() {

function IconCandidate() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
      <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
      <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
    </svg>
  );
}

function IconEmployer() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
      <path fill-rule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
      <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
    </svg>
  );
}



  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <p className="text-xs tracking-widest text-black uppercase mb-4 py-2 px-4 rounded-full bg-gray-300 inline-block">
            CareerOS · Proof-of-Work Marketplace
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-black mb-4 leading-tight">
            Hiring based on real evidence, not resumes.
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            CareerOS matches candidates and hiring teams on portfolio artifacts and real business challenges. Both sides swipe right before the conversation begins.
          </p>
        </section>

        {/* Two Column Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Candidate Section */}
          <div className="bg-gray-50 p-8 rounded-xl flex flex-col">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-4 mx-auto">
              <div className="text-white">
                <IconCandidate />
              </div>
            </div>
            <h2 className="text-xl font-bold text-black mb-3 text-center">
              Candidate / Student
            </h2>
            <p className="text-sm text-gray-600 mb-4 text-center flex-grow">
              Upload your projects, get AI-evaluated skill tags, and surface in matches for real challenges in your target roles.
            </p>
            <ul className="space-y-2 mb-6 flex-grow">
              <li className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">→</span>
                <span className="text-sm text-gray-700">Build a verified Capability Profile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">→</span>
                <span className="text-sm text-gray-700">See match reasons before you swipe</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">→</span>
                <span className="text-sm text-gray-700">Continue only on mutual interest</span>
              </li>
            </ul>
            <button className="w-full bg-black text-white py-2 px-6 cursor-pointer rounded-full text-sm font-semibold hover:bg-gray-800 transition">
              Continue as Candidate
            </button>
          </div>

          {/* Employer Section */}
          <div className="bg-gray-50 p-8 rounded-xl flex flex-col">
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center mb-4 mx-auto">
              <div className="text-white">
                <IconEmployer />
              </div>
            </div>
            <h2 className="text-xl font-bold text-black mb-3 text-center">
              Employer / Hiring Team
            </h2>
            <p className="text-sm text-gray-600 mb-4 text-center flex-grow">
              Describe the real challenge you need solved. We match you with candidates whose proof-of-work fits — and explain every match.
            </p>
            <ul className="space-y-2 mb-6 flex-grow">
              <li className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">→</span>
                <span className="text-sm text-gray-700">Demand Tickets, not job descriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">→</span>
                <span className="text-sm text-gray-700">Evidence-backed candidate matches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-black font-bold mt-0.5">→</span>
                <span className="text-sm text-gray-700">Mutual swipe before chat, interview, or trial</span>
              </li>
            </ul>
            <button className="w-full bg-black text-white py-2 px-6 cursor-pointer rounded-full text-sm font-semibold hover:bg-gray-800 transition">
              Continue as Employer
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
