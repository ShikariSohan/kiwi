import React, { ReactNode } from 'react';

const ButtonPrimary = ({
  children,
  addClass,
  onClick,
  type = 'button',
  disabled = false,
}: {
  children: ReactNode;
  addClass?: string;
  onClick?: VoidFunction;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={
        'py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg  custom-btn-shadow custom-btn-bg-color transition-all outline-none ' +
        addClass
      }
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
