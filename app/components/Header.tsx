export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            Career<span className="text-amber-600">OS</span>
          </div>

          {/* Right side - Navigation and Buttons */}
          <div className="flex items-center gap-8">
            {/* <nav className="hidden sm:flex items-center gap-6">
              <a href="#" className="text-sm cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                For talent
              </a>
              <a href="#" className="text-sm cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                For employers
              </a>
              <a href="#" className="text-sm cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                For universities
              </a>
            </nav> */}

            <div className="flex items-center gap-3">
              <button className="text-sm cursor-pointer font-medium text-gray-700 hover:text-gray-900 px-4 py-2">
                Log in
              </button>
              <button className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gray-900 px-6 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
