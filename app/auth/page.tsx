import { Suspense } from "react"
import { AuthPageContent } from "./AuthPageContent"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex">
      <div className="bg-accent p-10 flex flex-col justify-between gap-4 w-110 max-lg:hidden">
        <div className="text-2xl font-bold text-white">
          Career<span className="text-brand">OS</span>
        </div>
        <div>
          <div className="text-xs text-gray-300 uppercase font-normal tracking-widest">
            Proof before claims
          </div>
          <h1 className="text-4xl text-white font-bold mt-3">
            Real work, real challenges, mutual interest.
          </h1>
          <div className="text-sm text-gray-200 leading-relaxed mt-4">
            CareerOS replaces resumes and job descriptions with portfolio
            artifacts and demand tickets. Matches are explained &mdash; not guessed.
          </div>
        </div>
        <div className="text-xs text-gray-400 align-middle">
          @ Career<span className="text-brand">OS</span>
        </div>
      </div>
      <div className="bg-primary flex justify-center items-center flex-1 p-10">
        <div className="w-full max-w-sm">
          <Suspense fallback={<div className="text-center text-muted text-sm">Loading&hellip;</div>}>
            <AuthPageContent />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
