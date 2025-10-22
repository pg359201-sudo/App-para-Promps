import React from 'react';

const ClipboardPasteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 2H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/>
    <path d="M12 2v4a2 2 0 0 1-2 2H8"/>
    <rect width="8" height="4" x="16" y="8" rx="1"/>
    <path d="m16 14 2 2 2-2"/>
  </svg>
);

export default ClipboardPasteIcon;