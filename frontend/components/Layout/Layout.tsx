import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ backgroundImage: 'url("/assets/background.jpg")' }}>
        {children}
      </div>

      <Footer />
    </>
  );
};

export default Layout;
