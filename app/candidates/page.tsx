import '../styles/input.css';
import Header from '../components/Header';

function CheckIcon() {
  return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
  );
}


export default function CandidateLoginPage() {
    

  return (
    <div className="min-h-screen bg-white">
        <Header />

        <main className="mx-auto max-w-6xl px-6 py-16">
            <section className="page-section">
                <div className="grid grid-cols-2">
                    {/* Left Side */}
                    <div className="bg-main text-white p-12 rounded-l-lg">
                        <p className="text-sm font-semibold tracking-wider accent-color mb-4">FOR CANDIDATES</p>
                        <h1 className="text-4xl font-bold mb-6">
                            Find your next <span className="italic">opportunity</span>.
                        </h1>
                        <p className="text-gray-300 mb-8 leading-relaxed">
                            Access job opportunities from leading companies, receive personalized recommendations, and track your application progress all in one place.
                        </p>

                        <div className="space-y-4 mb-12">
                            <div className="flex items-start gap-3">
                                <CheckIcon />
                                <p className="text-gray-200"><span className="font-bold">Personalized job matches</span> tailored to your skills and preferences.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckIcon />
                                <p className="text-gray-200"><span className="font-bold">Real-time updates</span> on your applications and company responses.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckIcon />
                                <p className="text-gray-200"><span className="font-bold">Direct connections</span> with hiring teams across top companies.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex flex-col item-start">
                                <div className="text-2xl font-bold">900+</div>
                                <div className="text-gray-200 text-xs">Hiring Partners</div>
                            </div>

                            <div className="flex flex-col item-start">
                                <div className="text-2xl font-bold">52</div>
                                <div className="text-gray-200 text-xs">Sectors</div>
                            </div>

                            <div className="flex flex-col item-start">
                                <div className="text-2xl font-bold">Live</div>
                                <div className="text-gray-200 text-xs">Outcome Data</div>
                            </div>

                        </div>

                        <div className="border-t border-gray-700 pt-8 mt-8">
                            <p className="text-xs text-gray-400 italic mb-4">Empowering talent to reach their potential.</p>
                            <p className="text-sm accent-color">Career Platform</p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="bg-gray-50 p-12 rounded-r-lg flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Login</h2>
                        <p className="text-gray-600 mb-8">Sign in to your account to explore opportunities.</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-color"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-color"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 accent-color bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-accent-color"
                                />
                                <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                            </div>

                            <a
                                href="/dashboard"
                                className="w-full bg-main hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-200 block"
                            >
                                Sign In
                            </a>
                        </div>

                        <div className="mt-8 pt-6 text-center">
                            <p className="text-sm text-gray-600">Don't have an account? <a href="/signup" className="accent-color hover:text-yellow-600 font-medium">Sign up here</a></p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
  );
}
