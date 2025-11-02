import React from 'react';

const RefineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 12h2.5" />
    <path d="M19.5 12h2.5" />
    <path d="M12 2v2.5" />
    <path d="M12 19.5v2.5" />
    <path d="M5.5 18.5l-1-1" />
    <path d="M19.5 5.5l-1-1" />
    <path d="M5.5 5.5l-1 1" />
    <path d="M19.5 18.5l-1 1" />
    <path d="M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z" />
  </svg>
);

export default RefineIcon;