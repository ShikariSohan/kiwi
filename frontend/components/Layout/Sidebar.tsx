import Link from 'next/link';
export default function Sidebar() {
  return (
    <>
      <div className="bg-gray-50 flex min-h-screen flex-auto flex-shrink-0 flex-col antialiased">
        <div
          className="bg-white fixed left-0 top-0 flex h-full w-64 flex-col border-r"
          style={{ backgroundColor: 'white' }}
        >
          <div className="flex h-14 items-center justify-center border-b">
            <div className="flex-container w-64 justify-between p-4">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/assets/logo.png"
                  className="logo-icon h-12"
                  style={{
                    transition: 'transform 0.3s ease-in-out', // Add a transition for smooth animation
                  }}
                />
                <div
                  style={{
                    fontFamily: 'Caveat Brush, cursive',
                    fontSize: '30px',
                  }}
                >
                  Kiwi
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto overflow-x-hidden">
            <ul className="flex flex-col space-y-1 py-4">
              <li className="px-5">
                <div className="flex h-8 flex-row items-center">
                  <div className="text-sm font-light tracking-wide">
                    Learning & Fun
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/draw-n-learn"
                  className="hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/icon1.gif"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Draw, Learn
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/grammar-guru"
                  className="hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/icon2.gif"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Grammar Guru
                  </span>
                </Link>
              </li>

              <li className="px-5">
                <div className="flex h-8 flex-row items-center">
                  <div className="text-sm font-light tracking-wide">
                    Creative Corner
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/story-magic"
                  className="hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/icon3.gif"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Magical Story
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/talky-pal"
                  className="hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/icon4.gif"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Talky pal
                  </span>
                </Link>
              </li>

              <li className="px-5">
                <div className="flex h-8 flex-row items-center">
                  <div className="text-sm font-light tracking-wide">
                    Play & Explore
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/animation"
                  className="hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/icon1.gif"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Animation
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/grammar-guru"
                  className="hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/icon2.gif"
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Chat Buddy
                  </span>
                </Link>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:bg-gray-50 text-gray-600 hover:text-gray-800 hover:border-indigo-500 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 focus:outline-none"
                >
                  <span className="ml-4 inline-flex items-center justify-center">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-2 truncate text-sm tracking-wide">
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
