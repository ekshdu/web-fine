import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null | undefined;   // добавили undefined
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.setState({ errorInfo: errorInfo.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, color: "red", fontFamily: "monospace" }}>
          <h1>Ошибка рендера компонента</h1>
          <p><b>Сообщение:</b> {this.state.error?.message}</p>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fff0f0", padding: 15 }}>
            {this.state.error?.stack}
          </pre>
          <h3>Component Stack:</h3>
          <pre style={{ whiteSpace: "pre-wrap", background: "#fff0f0", padding: 15 }}>
            {this.state.errorInfo}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}