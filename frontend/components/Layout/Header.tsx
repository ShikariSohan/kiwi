import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ButtonOutline from '../misc/ButtonOutline';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrollActive, setScrollActive] = useState(false);
  console.log({ pathname });
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          'fixed top-0 w-full  z-30 bg-white-500 transition-all ' +
          (scrollActive ? ' shadow-md pt-0' : '')
        }
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <img src="/assets/logo.png" className="h-12 w-auto" />
            <div
              style={{ fontFamily: 'Caveat Brush, cursive', fontSize: '30px' }}
            >
              Kiwi
            </div>
          </div>
          {pathname === '/' && (
            <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
              <Link
                href="/login"
                className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-green-500 transition-all"
              >
                  Sign In
              </Link>
              <ButtonOutline onClick={() => router.push('/signup')}>
                Sign Up
              </ButtonOutline>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
