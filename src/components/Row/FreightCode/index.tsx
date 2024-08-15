import React from 'react';

interface FreightCodeProps {
  code: string;
}

const FreightCode: React.FC<FreightCodeProps> = ({ code }) => {
  return (
      <p>#{code}</p>
  );
};

export default FreightCode;