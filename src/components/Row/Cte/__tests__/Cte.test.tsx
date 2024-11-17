import React from 'react';
import { render, screen } from '@testing-library/react';
import Cte from '../index';

describe('Cte component', () => {
  test('renders the provided numCte prop', () => {
    const cteValue = 'Test CTE value';
    
    render(<Cte numCte={cteValue} />);
    
    const cteElement = screen.getByText(cteValue);
    
    expect(cteElement).toBeInTheDocument();
  });
});
