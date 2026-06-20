import React, { Component, ErrorInfo, ReactNode } from 'react';
import { log } from '../utils/logger';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    log.error(`ErrorBoundary caught an error in section "${this.props.sectionName || 'Unknown'}":`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-8 border border-red-200 bg-red-50 text-red-900 rounded-xl my-4 text-center">
          <h2 className="font-serif text-lg font-bold mb-2">Une anomalie est survenue</h2>
          <p className="text-xs font-sans text-red-700">
            Ce composant n'a pas pu s'afficher correctement. Nos équipes ont été notifiées.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
