import React from 'react';
import { render, screen } from '@testing-library/react';
import Value from '../index';

describe('Value Component', () => {
  it('renders the value correctly as currency', () => {
    const value = 123.45;
    render(<Value value={value} />);

    const valueElements = screen.getAllByText((content, element) => {
      const text = element.textContent || '';
      return text.includes('R$') && text.includes('123,45');
    });

    expect(valueElements.length).toBeGreaterThan(0);
    expect(valueElements[0]).toBeInTheDocument();
  });
});