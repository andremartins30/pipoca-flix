import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.warn('Erro capturado:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return null; // Renderiza nada em caso de erro
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 