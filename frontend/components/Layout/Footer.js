import React from 'react';
// import LogoVPN from "../../public/assets/Logo.svg";
// import Facebook from "../../public/assets/Icon/facebook.svg";
// import Twitter from "../../public/assets/Icon/twitter.svg";
// import Instagram from "../../public/assets/Icon/instagram.svg";
const Footer = () => {
  return (
    <div className="bg-white-300 pt-4 pb-4">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
          <div className="col-start-1 col-end-2 flex items-center">
            <img src="/assets/logo.png" className="h-12 w-auto" />
            <div
              style={{ fontFamily: 'Caveat Brush, cursive', fontSize: '30px' }}
            >
              Kiwi
            </div>
          </div>

          <p className="text-gray-400">
            ©{new Date().getFullYear()} - LaslesVPN
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
