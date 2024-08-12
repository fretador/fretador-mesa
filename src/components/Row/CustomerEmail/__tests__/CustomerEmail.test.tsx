import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomerEmail from '../index';

describe('CustomerEmail Component', () => {
  it('renders the email address correctly', () => {
    const email = 'user@example.com';
    render(<CustomerEmail email={email} />);

    const emailElement = screen.getByText(email);

    expect(emailElement).toBeInTheDocument();
  });
});