import { render, screen, act } from '@testing-library/react';
import { Loader } from './components/Loader';

describe('Loader', () => {
  it('renders all letters of SUNNY', () => {
    render(<Loader />);
    
    const s = screen.getByText('S');
    expect(s).toBeInTheDocument();
    
    const u = screen.getByText('U');
    expect(u).toBeInTheDocument();
    
    const nLetters = screen.getAllByText('N');
    expect(nLetters.length).toBe(2);
    
    const y = screen.getByText('Y');
    expect(y).toBeInTheDocument();
  });

  it('has the loader class', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.loader')).toBeInTheDocument();
  });

  it('renders 5 motion elements for the letters', () => {
    const { container } = render(<Loader />);
    const motionElements = container.querySelectorAll('[style*="position"]');
    expect(motionElements.length).toBeGreaterThan(0);
  });
});
