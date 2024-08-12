import React from 'react';
import { render } from '@testing-library/react';
import FreightDate from '../index';

test('renders the formatted date', () => {
  const testDate = new Date('2024-08-01T00:00:00.000Z');
  const { getByText } = render(<FreightDate date={testDate} />);

  const formattedDate = testDate.toLocaleDateString();

  expect(getByText(formattedDate)).toBeInTheDocument();
});
