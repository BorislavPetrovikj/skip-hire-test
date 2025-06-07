import React from 'react';
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex items-center space-x-3 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <h2 className="text-xl font-semibold">Something went wrong</h2>
            </div>
            <p className="text-gray-600">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => window.location.reload()}
                variant="default"
                className="w-full"
              >
                Refresh Page
              </Button>
              <Button
                onClick={() => this.setState({ hasError: false, error: null })}
                variant="outline"
                className="w-full"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 