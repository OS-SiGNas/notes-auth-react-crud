import { Component } from 'react';
import { ErrorComponent } from './ErrorComponent';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBundary extends Component<Props, State> {
  state: State;
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // console.error('ErrorBundary => ', error);
    return { hasError: true, error };
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    if (hasError && error !== undefined) return <ErrorComponent error={error} />;
    return this.props.children;
  }
}
