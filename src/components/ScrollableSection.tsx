import React from 'react';
import SimpleBar from 'simplebar-react';

interface ScrollableSectionProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
}

const ScrollableSection: React.FC<ScrollableSectionProps> = ({ 
  children, 
  maxHeight = '500px',
  className = '' 
}) => {
  return (
    <SimpleBar 
      style={{ maxHeight }} 
      className={className}
      autoHide={false}
    >
      {children}
    </SimpleBar>
  );
};

export default ScrollableSection;
