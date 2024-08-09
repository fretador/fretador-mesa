import { render, screen } from '@testing-library/react';
import WhatsApp from '../index';

describe('WhatsApp Component', () => {
  test('formats and displays the WhatsApp number correctly', () => {
    render(<WhatsApp whatsApp="85987654321" />);
    
    const formattedWhatsApp = screen.getByText('85-9.8765-4321');
    
    expect(formattedWhatsApp).toBeInTheDocument();
  });

  test('handles a different WhatsApp number format', () => {
    render(<WhatsApp whatsApp="11912345678" />);
    
    const formattedWhatsApp = screen.getByText('11-9.1234-5678');
    
    expect(formattedWhatsApp).toBeInTheDocument();
  });
});
