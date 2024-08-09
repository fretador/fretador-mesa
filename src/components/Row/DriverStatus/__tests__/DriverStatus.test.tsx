import { render, screen } from '@testing-library/react';
import DriverStatus from '../index';
import styles from './driverStatus.module.css';

describe('DriverStatus Component', () => {
  test('renders with "aprovado" status', () => {
    render(<DriverStatus driverStatus="aprovado" />);
    
    const statusElement = screen.getByText(/aprovado/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass(styles.driverStatus);
    expect(statusElement).toHaveClass(styles.approved);
  });

  test('renders with "aguardando" status', () => {
    render(<DriverStatus driverStatus="aguardando" />);
    
    const statusElement = screen.getByText(/aguardando/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass(styles.driverStatus);
    expect(statusElement).toHaveClass(styles.awaiting);
  });

  test('renders with "bloqueado" status', () => {
    render(<DriverStatus driverStatus="bloqueado" />);
    
    const statusElement = screen.getByText(/bloqueado/i);
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveClass(styles.driverStatus);
    expect(statusElement).toHaveClass(styles.blocked);
  });
});
