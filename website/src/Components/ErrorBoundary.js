import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#f6f4ef',
          fontFamily: "'Bitcount Grid Single', monospace",
          textAlign: 'center',
          padding: 20,
        }}>
          <p style={{ fontSize: 14, color: '#e8b6a2', marginBottom: 8 }}>Something went wrong</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding: '8px 16px',
              background: '#e8b6a2',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontFamily: "'Bitcount Grid Single', monospace",
              fontSize: 12,
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
