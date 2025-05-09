import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // TODO: Send error to logging service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-red-500 text-5xl mb-4">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Quelque chose s'est mal passé
            </h1>
            <p className="text-gray-600 mb-6">
              Nous nous excusons pour ce désagrément. Notre équipe a été notifiée et travaille sur la résolution du problème.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <i className="fas fa-redo mr-2"></i>
                Rafraîchir la page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <i className="fas fa-home mr-2"></i>
                Retour à l'accueil
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-6 text-left">
                <details className="cursor-pointer">
                  <summary className="text-sm text-gray-500 hover:text-gray-700">
                    Détails techniques (Development only)
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-4 rounded overflow-auto">
                    {this.state.error.toString()}
                    {'\n'}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
