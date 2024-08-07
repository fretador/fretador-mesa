import React from 'react';
import { render, screen } from '@testing-library/react';
import Route from '../index';

describe('Route component', () => {
  test('renders the origin and destiny states correctly', () => {
    const originState = 'SP';
    const destinyState = 'RJ';

    render(<Route originState={originState} destinyState={destinyState} />);

    const routeElement = screen.getByText(`${originState} X ${destinyState}`);

    expect(routeElement).toBeInTheDocument();
    expect(routeElement).toHaveClass('state');
  });
});
