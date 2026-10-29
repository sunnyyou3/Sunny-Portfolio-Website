import { render, screen } from '@testing-library/react';
import { Loader } from '../../loader/Loader';

describe('Loader', () => {
  it('renders all letters of SUNNY', () => {
    render(<Loader />);
    
    const letters = screen.getAllByText(/./);
    expect(letters.length).toBe(5);
  });

  it('renders the letter S', () => {
    render(<Loader />);
    expect(screen.getByText('S')).toBeInTheDocument();
  });

  it('renders the letter U', () => {
    render(<Loader />);
    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it('renders two N letters', () => {
    render(<Loader />);
    const nLetters = screen.getAllByText('N');
    expect(nLetters.length).toBe(2);
  });

  it('renders the letter Y', () => {
    render(<Loader />);
    expect(screen.getByText('Y')).toBeInTheDocument();
  });

  it('has the loader class', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('.loader')).toBeInTheDocument();
  });

  it('renders inside a motion.div', () => {
    const { container } = render(<Loader />);
    const motionDiv = container.querySelector('[style*="position"]');
    expect(motionDiv).toBeInTheDocument();
  });
});
