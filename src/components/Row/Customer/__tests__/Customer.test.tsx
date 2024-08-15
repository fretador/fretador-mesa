import React from 'react';
import { render, screen } from '@testing-library/react';
import Customer from '../index';

describe('Customer Component', () => {
  it('renders the customer name correctly', () => {
    const customerName = 'Joaquim José da Silva Xavier';
    render(<Customer customerName={customerName} />);

    const nameElement = screen.getByText(customerName);

    expect(nameElement).toBeInTheDocument();
  });
});