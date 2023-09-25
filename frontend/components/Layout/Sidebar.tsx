import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="fixed-overlay z-10 flex w-80 translate-x-0">
      {/* Curvy shape */}
      <svg
        className="absolute w-full h-full text-white"
        preserveAspectRatio="none"
        viewBox="0 0 309 800"
        fill="#FFF"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z"
          stroke="#6c584c"
          stroke-width="4"
        />
      </svg>

      {/* Sidebar content */}
      <div className="z-10 flex flex-col flex-1">
        <div className="flex-container justify-between w-64 p-4">
          {/* Logo */}
          <a href="#">
            <div style={{ display: 'flex' }}>
              <img src="/assets/logo.png" className="h-12" />
              <span
                style={{
                  fontFamily: 'Caveat Brush, cursive',
                  fontSize: '30px',
                }}
              >
                Kiwi
              </span>
            </div>
          </a>
          {/* Close btn */}
          {/* <ButtonPrimary
              onClick={() => setIsSidebarOpen(false)}
            >
              Close sidebar
            </ButtonPrimary> */}
        </div>
        <nav
          className="flex flex-col flex-1 w-64 p-4 mt-4 justify-start"
          style={{
            fontSize: '20px',
            color: '#6c584c',
          }}
        >
          <Link
            href="/draw-n-learn"
            className="flex-container space-x-2 justify-start"
          >
            <img
              src="/dashboard/icon1.gif"
              className="w-12 h-12"
              aria-hidden="true"
            />
            <span>Draw & Learn</span>
          </Link>
          <Link
            href="/grammar-guru"
            className="flex-container space-x-2 justify-start"
          >
            <img
              src="/dashboard/icon2.gif"
              className="w-12 h-12"
              aria-hidden="true"
            />
            <span>Grammar Guru</span>
          </Link>
          <Link
            href="/chat-buddy"
            className="flex-container space-x-2 justify-start"
          >
            <img
              src="/dashboard/icon3.gif"
              className="w-12 h-12"
              aria-hidden="true"
            />
            <span>Chat Buddy</span>
          </Link>
          <Link href="/story-magic" className="flex-container space-x-2 ">
            <img
              src="/dashboard/icon5.gif"
              className="w-12 h-12"
              aria-hidden="true"
            />
            <span>Story Magic</span>
          </Link>
          <Link href="/talky-pal" className="flex-container space-x-2 ">
            <img
              src="/dashboard/icon4.gif"
              className="w-12 h-12"
              aria-hidden="true"
            />
            <span>Talky Pal</span>
          </Link>
        </nav>
        <div className="flex-container p-4">
          <button className="flex-container space-x-2 text-blue-600">
            <svg
              aria-hidden="true"
              className="w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Logout icon SVG path */}
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
