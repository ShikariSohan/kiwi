import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
export default function Sidebar() {
  const router = useRouter();
  return (
    <>
      <div className="bg-gray-50 flex min-h-screen flex-auto flex-shrink-0 flex-col antialiased">
        <div className="bg-white fixed left-0 top-0 flex h-full w-64 flex-col ">
          <svg
            className="text-white absolute h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 309 800"
            fill="#f1faee"
            xmlns="http://www.w3.org/2000/svg"
            style={{ zIndex: -5 }}
          >
            {/* Your new SVG path here */}
            <path
              d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z"
              stroke="#6c584c"
              strokeWidth="4"
            />
          </svg>
          <div className="ml-12 flex h-14 pt-5">
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
                color: '#000',
                zIndex: 10,
                paddingLeft: '5px',
              }}
            >
              Kiwi
            </div>
          </div>
          <div className="flex-grow overflow-y-auto overflow-x-hidden pt-9">
            <ul className="flex flex-col space-y-1 py-4">
              <li className="px-5">
                <div className="flex h-8 flex-row items-center">
                  <div className="text-sidebar-header tracking-wide">
                    Learning & Fun
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/draw-n-learn"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center  pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/2.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Draw & Learn
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/grammar-guru"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/1.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Grammar Guru
                  </span>
                </Link>
              </li>

              <li className="px-5 pt-5">
                <div className="flex h-8 flex-row items-center">
                  <div className="text-sidebar-header font-light tracking-wide">
                    Creative Corner
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/story-magic"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/3.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Magical Story
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/talky-pal"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/4.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Talky pal
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/chat-buddy"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/6.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Chat Buddy
                  </span>
                </Link>
              </li>

              <li className="px-5 pt-5">
                <div className="flex h-8 flex-row items-center">
                  <div className="text-sidebar-header font-light tracking-wide">
                    Play & Explore
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/pop-count"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/10.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Pop Count
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/picture-puzzle"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/9.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Picture Puzzle
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/animation-island"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/11.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Anim-land
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/fun-cam"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/12.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Fun Cam
                  </span>
                </Link>
              </li>

              {/* <li className="px-5 pt-5">
                <div className="flex h-8 flex-row items-center">
                  <div className="text-sidebar-header font-light tracking-wide">
                    Personalization
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:bg-gray-50 relative flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/7.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10 }}
                  >
                    Profile
                  </span>
                </Link>
              </li> */}

              <li>
                <Link
                  href={'/'}
                  onClick={() => {
                    localStorage.removeItem('token');
                  }}
                  className="fixed flex h-11 flex-row items-center pr-6 focus:outline-none"
                >
                  <span className="ml-4 mr-4 inline-flex items-center justify-center">
                    <img
                      src="/dashboard/8.png"
                      className=" h-7 w-7"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="text-sidebar ml-2 truncate tracking-wide"
                    style={{ zIndex: 10, color: 'red' }}
                    onClick={() => {
                      localStorage.removeItem('token');
                      // localStorage.removeItem('profile');
                      router.push('/');
                    }}
                  >
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
