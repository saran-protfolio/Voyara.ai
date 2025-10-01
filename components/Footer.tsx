import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-brand-green/80 dark:text-brand-cream/70 transition-colors duration-300">
        <p>&copy; {new Date().getFullYear()} Voyara. All rights reserved.</p>
        <p className="text-sm mt-1">Where AI Meets Your Next Adventure.</p>
      </div>
    </footer>
  );
};

export default Footer;