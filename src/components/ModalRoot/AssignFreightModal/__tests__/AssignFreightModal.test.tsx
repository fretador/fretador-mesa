import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssignFreightModal from '../../AssignFreightModal';

describe('AssignFreightModal', () => {
  test('renders the modal with initial state', () => {
    render(<AssignFreightModal isOpen={true} onRequestClose={() => {}} />);
    expect(screen.getByText('Direcionar Frete')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF Motorista')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o CPF do motorista')).toBeInTheDocument();
  });

  test('filters drivers based on CPF input', () => {
    render(<AssignFreightModal isOpen={true} onRequestClose={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText('Digite o CPF do motorista'), { target: { value: '000.000.000-00' } });
    expect(screen.getByText('000.000.000-00 - João da Silva Pereira - Placa KKK-0A12')).toBeInTheDocument();
  });

  test('selects a driver and displays details', () => {
    render(<AssignFreightModal isOpen={true} onRequestClose={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText('Digite o CPF do motorista'), { target: { value: '000.000.000-00' } });
    fireEvent.click(screen.getByText('000.000.000-00 - João da Silva Pereira - Placa KKK-0A12'));
    expect(screen.getByText('Motorista: João da Silva Pereira')).toBeInTheDocument();
    expect(screen.getByText('Veículo: KKK-0A12')).toBeInTheDocument();
    expect(screen.getByText('Placa: KKK-0A12')).toBeInTheDocument();
    expect(screen.getByText('Placa do Cavalo: KKK-0A12')).toBeInTheDocument();
  });

  test('clears selected driver on confirm', () => {
    render(<AssignFreightModal isOpen={true} onRequestClose={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText('Digite o CPF do motorista'), { target: { value: '000.000.000-00' } });
    fireEvent.click(screen.getByText('000.000.000-00 - João da Silva Pereira - Placa KKK-0A12'));
    fireEvent.click(screen.getByText('Confirmar'));
    expect(screen.queryByText('Motorista: João da Silva Pereira')).not.toBeInTheDocument();
  });
});
