import { render, screen } from '@testing-library/react';
import Cnpj from '../index';
import styles from './cnpj.module.css';

describe('Cnpj Component', () => {
  test('renders the formatted CNPJ correctly', () => {
    render(<Cnpj cnpj="12345678000195" />);
    
    const cnpjElement = screen.getByText("12.345.678/0001-95");
    expect(cnpjElement).toBeInTheDocument();
    expect(cnpjElement).toHaveClass(styles.cnpjValue);
  });
});
