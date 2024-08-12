import { render, screen } from '@testing-library/react';
import CorporateName from '../index';

describe('CorporateName Component', () => {
  it('should render the corporate name', () => {
    const corporateName = 'My Corporate Name';
    
    render(<CorporateName corporateName={corporateName} />);
    
    const corporateNameElement = screen.getByText(corporateName);
    
    expect(corporateNameElement).toBeInTheDocument();
  });
});
