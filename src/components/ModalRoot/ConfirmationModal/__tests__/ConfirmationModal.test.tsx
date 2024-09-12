import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmationModal from '../../ConfirmationModal';

describe('ConfirmationModal', () => {
  const defaultProps = {
    isOpen: true,
    onRequestClose: jest.fn(),
    title: 'Confirmation Title',
    message: 'Are you sure you want to proceed?',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  it('renders the modal with the correct title and message', () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByText('Confirmation Title')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
  });

  it('calls onConfirm when the confirm button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />);
    const confirmButton = screen.getByText('SIM');
    fireEvent.click(confirmButton);
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />);
    const cancelButton = screen.getByText('NÃO');
    fireEvent.click(cancelButton);
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it('calls onRequestClose when the modal is closed', () => {
    render(<ConfirmationModal {...defaultProps} />);
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(defaultProps.onRequestClose).toHaveBeenCalled();
  });
});
