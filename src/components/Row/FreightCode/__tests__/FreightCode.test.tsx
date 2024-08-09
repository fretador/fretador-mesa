import React from 'react';
import { render, screen } from '@testing-library/react';
import FreightCode from '../index';

describe('FreightCode Component', () => {
  it('renders the freight code correctly', () => {
    const code = 'ABC123';
    render(<FreightCode code={code} />);
    const codeElement = screen.getByText(code);
    expect(codeElement).toBeInTheDocument();
  });
});