import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalRoot from './index';

describe('ModalRoot', () => {
  it('renders the modal when isOpen is true', () => {
    render(
      <ModalRoot isOpen={true} onRequestClose={() => {}}>
        <p>Test Content</p>
      </ModalRoot>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render the modal when isOpen is false', () => {
    render(
      <ModalRoot isOpen={false} onRequestClose={() => {}}>
        <p>Test Content</p>
      </ModalRoot>
    );

    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('calls onRequestClose when the close button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <ModalRoot isOpen={true} onRequestClose={handleClose}>
        <p>Test Content</p>
      </ModalRoot>
    );

    fireEvent.click(screen.getByText('OK'));
    expect(handleClose).toHaveBeenCalled();
  });
});