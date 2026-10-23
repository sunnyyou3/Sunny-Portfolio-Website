import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioMenu } from '../PortfolioMenu';

describe('PortfolioMenu', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the menu header', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.getByText('MENU')).toBeInTheDocument();
    expect(screen.getByText('MAIN MENU')).toBeInTheDocument();
  });

  it('renders all 4 section buttons', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Career')).toBeInTheDocument();
  });

  it('does not render a back button (back is handled by ScrollManager)', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.queryByText('BACK')).not.toBeInTheDocument();
  });

  it('calls onSelect when a section is clicked', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    const projectsButton = screen.getByText('Projects');
    fireEvent.click(projectsButton);
    expect(mockOnSelect).toHaveBeenCalledWith('projects');
  });

  it('highlights the first item by default', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    const projectsButton = screen.getByText('Projects');
    expect(projectsButton.closest('button')).toHaveClass('border-accent-orange');
  });

  it('updates selection on hover', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    const galleryButton = screen.getByText('Gallery');
    fireEvent.mouseEnter(galleryButton);
    expect(galleryButton.closest('button')).toHaveClass('border-accent-orange');
  });

  it('renders section descriptions', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.getByText('My work')).toBeInTheDocument();
    expect(screen.getByText('Photography')).toBeInTheDocument();
    expect(screen.getByText('Skills & Bio')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders navigation hint', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.getByText(/USE.*TO NAVIGATE/i)).toBeInTheDocument();
  });

  it('renders the selected item counter', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.getByText('1/4 SELECTED')).toBeInTheDocument();
  });

  it('navigates selection with arrow keys', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    const menu = document.querySelector('[tabindex="0"]');
    
    fireEvent.keyDown(menu, { key: 'ArrowRight' });
    // Second item should now be highlighted
    const galleryButton = screen.getByText('Gallery');
    expect(galleryButton.closest('button')).toHaveClass('border-accent-orange');
  });

  it('selects with Enter key', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    const menu = document.querySelector('[tabindex="0"]');
    
    fireEvent.keyDown(menu, { key: 'Enter' });
    expect(mockOnSelect).toHaveBeenCalledWith('projects');
  });
});
