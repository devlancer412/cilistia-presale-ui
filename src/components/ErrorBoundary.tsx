import React, { PropsWithChildren } from 'react';

class ErrorBoundary extends React.Component<PropsWithChildren> {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log(errorInfo);
    console.log({ error, errorInfo });

    localStorage.clear();
    location.reload();
  }
  render() {
    // Check if the error is thrown
    if ((this.state as any).hasError) {
      // You can render any custom fallback UI
      return <div className='bg-gray-900 w-screen h-screen'></div>;
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
