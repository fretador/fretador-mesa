import React from 'react';
import { render, screen } from '@testing-library/react';
import OccurrenceType from '../index';

describe('OccurrenceType Component', () => {
  it('renders the occurrence type correctly', () => {
    const occurrenceType = 'Delivery';
    render(<OccurrenceType occurrenceType={occurrenceType} />);

    const occurrenceTypeElement = screen.getByText(occurrenceType);

    expect(occurrenceTypeElement).toBeInTheDocument();
  });
});