
import React from 'react';
import { LogoIcon } from './icons';

interface HeaderProps {
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="bg-light-frame/80 dark:bg-dark-frame/80 backdrop-blur-sm sticky top-0 z-10 border-b border-black/10 dark:border-white/10">
      <div className="container mx-auto max-w-7xl flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <LogoIcon />
          <h1 className="text-xl sm:text-2xl font-bold text-light-text dark:text-dark-text">
            AI Product Description Generator
          </h1>
        </div>
        {children}
      </div>
    </header>
  );
};
