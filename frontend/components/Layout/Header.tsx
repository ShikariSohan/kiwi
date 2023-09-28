import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ButtonOutline from '../misc/ButtonOutline';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrollActive, setScrollActive] = useState(false);
  const [logged, setLogged] = useState<string | null>();
  useEffect(() => {
    const profile = localStorage.getItem('profile');
    if (profile) setLogged(profile);
  }, [logged]);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          'fixed top-0 z-30  w-full bg-white-500 transition-all ' +
          (scrollActive ? ' pt-0 shadow-md' : '')
        }
      >
        <nav className="mx-auto grid max-w-screen-xl grid-flow-col px-6 py-3 sm:px-8 sm:py-4 lg:px-16">
          <Link
            className="col-start-1 col-end-2 flex items-center"
            href={'/dashboard'}
          >
            <img src="/assets/logo.png" className="h-12 w-auto" />
            <div
              style={{ fontFamily: 'Caveat Brush, cursive', fontSize: '30px' }}
            >
              Kiwi
            </div>
          </Link>
          {pathname === '/' && (
            <div className="col-start-10 col-end-12 flex items-center justify-end font-medium">
              <Link
                href="/login"
                className="mx-2 capitalize tracking-wide text-black-600 transition-all hover:text-green-500 sm:mx-4"
              >
                  Sign In
              </Link>
              <ButtonOutline onClick={() => router.push('/signup')}>
                Sign Up
              </ButtonOutline>
            </div>
          )}
          {/* {logged && (
            <div className="col-start-10 col-end-12 flex items-center justify-end font-medium">
              <ButtonOutline
                onClick={() => {
                  localStorage.removeItem('token');
                  setLogged(null);
                  router.push('/');
                }}
              >
                Logout
              </ButtonOutline>
            </div>
          )} */}
        </nav>
      </header>
    </>
  );
};

export default Header;
