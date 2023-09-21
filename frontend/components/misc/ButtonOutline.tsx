import React from 'react';

const ButtonOutline = ({ children, onClick }) => {
  return (
    <button
      className="font-medium tracking-wide py-2 px-5 sm:px-8 rounded-l-full rounded-r-full capitalize transition-all btn-outline"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonOutline;
