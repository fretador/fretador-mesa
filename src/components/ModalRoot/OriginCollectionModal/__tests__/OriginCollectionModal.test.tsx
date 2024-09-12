import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OriginCollectionModal from '../index';

describe('OriginCollectionModal', () => {
  const defaultProps = {
    isOpen: true,
    onRequestClose: jest.fn(),
  };

  it('renders the modal with the correct title', () => {
    render(<OriginCollectionModal {...defaultProps} />);
    expect(screen.getByText('Origem - Local de Coleta')).toBeInTheDocument();
  });

  it('renders the city input field', () => {
    render(<OriginCollectionModal {...defaultProps} />);
    expect(screen.getByLabelText('Cidade origem')).toBeInTheDocument();
  });

  it('updates the city input field correctly', () => {
    render(<OriginCollectionModal {...defaultProps} />);
    const cityInput = screen.getByLabelText('Cidade origem') as HTMLInputElement;
    fireEvent.change(cityInput, { target: { value: 'São Paulo' } });
    expect(cityInput.value).toBe('São Paulo');
  });

  it('renders the radio buttons for sender information', () => {
    render(<OriginCollectionModal {...defaultProps} />);
    expect(screen.getByText('Não informar dados do Remetente')).toBeInTheDocument();
    expect(screen.getByText('Informar dados do Remetente')).toBeInTheDocument();
  });

  it('shows sender information fields when "Informar dados do Remetente" is selected', () => {
    render(<OriginCollectionModal {...defaultProps} />);
    const informarRadio = screen.getByLabelText('Informar dados do Remetente') as HTMLInputElement;
    fireEvent.click(informarRadio);
    expect(screen.getByLabelText('CNPJ')).toBeInTheDocument();
    expect(screen.getByLabelText('Razão Social')).toBeInTheDocument();
    expect(screen.getByLabelText('Endereço')).toBeInTheDocument();
  });

  it('hides sender information fields when "Não informar dados do Remetente" is selected', () => {
    render(<OriginCollectionModal {...defaultProps} />);
    const naoInformarRadio = screen.getByLabelText('Não informar dados do Remetente') as HTMLInputElement;
    fireEvent.click(naoInformarRadio);
    expect(screen.queryByLabelText('CNPJ')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Razão Social')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Endereço')).not.toBeInTheDocument();
  });

  it('calls onRequestClose when the confirm button is clicked', () => {
    render(<OriginCollectionModal {...defaultProps} />);
    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);
    expect(defaultProps.onRequestClose).toHaveBeenCalled();
  });
});
