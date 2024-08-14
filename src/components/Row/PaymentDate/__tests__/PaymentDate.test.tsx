import React from 'react';
import { render } from '@testing-library/react';
import PaymentDate from '../index';

test('renders the formatted date', () => {
  const testDate = new Date('2023-10-01T00:00:00.000Z');
  const { getByText } = render(<PaymentDate date={testDate} />);

  const formattedDate = testDate.toLocaleDateString('pt-BR');

  expect(getByText(formattedDate)).toBeInTheDocument();
});