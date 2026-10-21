import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';

const ErrorContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
    padding: '20px',
    textAlign: 'center',
});

const ErrorTitle = styled(Typography)({
    color: '#f6f4ef',
    fontSize: 'clamp(14px, 2vw, 20px)',
    fontWeight: 800,
    marginBottom: '8px',
    fontFamily: "'Bitcount Grid Single', monospace",
});

const ErrorMessage = styled(Typography)({
    color: 'rgba(246,244,239,0.6)',
    fontSize: 'clamp(9px, 1.2vw, 14px)',
    lineHeight: 1.5,
    marginBottom: '16px',
    fontFamily: "'Bitcount Grid Single', monospace",
});

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer>
                    <ErrorTitle>Something went wrong</ErrorTitle>
                    <ErrorMessage>
                        {this.state.error?.message || 'An unexpected error occurred'}
                    </ErrorMessage>
                    <Button
                        variant="contained"
                        onClick={this.handleReset}
                        sx={{
                            fontFamily: "'Bitcount Grid Single', monospace",
                            fontSize: 'clamp(8px, 1vw, 12px)',
                        }}
                    >
                        Try Again
                    </Button>
                </ErrorContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
