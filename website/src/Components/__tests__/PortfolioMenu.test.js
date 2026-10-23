import { render, screen, fireEvent } from '@testing-library/react';
import { PortfolioMenu } from '../PortfolioMenu';

describe('PortfolioMenu', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the menu header with name', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.getByText('Sunny You')).toBeInTheDocument();
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

  it('renders section descriptions', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.getByText('Web applications & interactive experiences')).toBeInTheDocument();
    expect(screen.getByText('Photography collection')).toBeInTheDocument();
    expect(screen.getByText('Skills & background')).toBeInTheDocument();
    expect(screen.getByText('Experience & education')).toBeInTheDocument();
  });

  it('renders navigation hint', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.getByText(/SELECT ENTER/i)).toBeInTheDocument();
  });

  it('renders the developer & photographer label', () => {
    render(<PortfolioMenu onSelect={mockOnSelect} />);
    expect(screen.getByText('DEV & PHOTO')).toBeInTheDocument();
  });
});
