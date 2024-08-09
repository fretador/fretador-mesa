import { render, screen } from '@testing-library/react';
import Vehicle from '../index';

describe('Vehicle Component', () => {
  test('renders the vehicle prop correctly', () => {
    render(<Vehicle vehicle="Truck" />);
    
    const vehicleElement = screen.getByText(/Truck/i);
    
    expect(vehicleElement).toBeInTheDocument();
  });

  test('handles a different vehicle prop', () => {
    render(<Vehicle vehicle="Bi-Truck" />);
    
    const vehicleElement = screen.getByText(/Bi-Truck/i);
    
    expect(vehicleElement).toBeInTheDocument();
  });
});
