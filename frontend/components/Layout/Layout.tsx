import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ backgroundImage: 'url("/assets/background.png")' }}>
        {children}
      </div>

      <Footer />
    </>
  );
};

export default Layout;
