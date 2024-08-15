import React from 'react';
import { render, screen } from '@testing-library/react';
import TradeName from '../index';

describe('TradeName Component', () => {
  it('renders the trade name correctly', () => {
    const tradeName = 'My Business Name';
    render(<TradeName tradeName={tradeName} />);

    const nameElement = screen.getByText(tradeName);

    expect(nameElement).toBeInTheDocument();
  });
});