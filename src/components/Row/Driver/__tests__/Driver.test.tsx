import React from 'react'
import { render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom/extend-expect'
import Driver from '../index'

describe('Driver Component', () => {
  it('renders the image when driverPhotoUrl is provided', () => {
    render(<Driver driverPhotoUrl="/path/to/image.png" driverName="Gilberto Marcha Lenta" />);
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', '/path/to/image.png')
    expect(image).toHaveAttribute('alt', 'Gilberto Marcha Lenta')
  })

  it('does not render the image when driverPhotoUrl is not provided', () => {
    render(<Driver driverName="Gilberto Marcha Lenta" />)
    
    const image = screen.queryByRole('img')
    expect(image).toBeNull()
  })

  it('displays the driver name correctly', () => {
    render(<Driver driverPhotoUrl="/path/to/image.png" driverName="Gilberto Marcha Lenta" />)
    
    const name = screen.getByText('Gilberto Marcha Lenta')
    expect(name).toBeInTheDocument()
  })

  it('truncates the driver name with ellipsis if it exceeds the maximum width', () => {
    render(<Driver driverPhotoUrl="/path/to/image.png" driverName="A very long driver name that should be truncated" />)
    
    const nameElement = screen.getByText('A very long driver name that should be truncated')
    expect(nameElement).toHaveStyle('text-overflow: ellipsis')
    expect(nameElement).toHaveStyle('overflow: hidden')
    expect(nameElement).toHaveStyle('white-space: nowrap')
  })
})
