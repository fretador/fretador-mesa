import { render, screen } from '@testing-library/react';
import CityState from '../index';

describe('CityState Component', () => {
  test('renders the city and state correctly', () => {
    render(<CityState city="Fortaleza" state="CE" />);
    
    const cityElement = screen.getByText(/Fortaleza/i);
    const stateElement = screen.getByText(/CE/i);
    
    expect(cityElement).toBeInTheDocument();
    expect(stateElement).toBeInTheDocument();
  });

  test('applies the correct CSS classes', () => {
    render(<CityState city="São Paulo" state="SP" />);
    
    const cityElement = screen.getByText(/São Paulo/i);
    const stateElement = screen.getByText(/SP/i);

    expect(cityElement).toHaveClass('cityName');
    expect(stateElement).toHaveClass('stateName');
  });
});
