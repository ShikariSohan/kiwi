import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: '#EEEFF2' }}>{children}</div>

      <Footer />
    </>
  );
};

export default Layout;
