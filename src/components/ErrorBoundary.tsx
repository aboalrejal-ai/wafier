import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  retryLabel?: string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Wafir ErrorBoundary:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "hsl(var(--color-gray-25))",
            fontFamily: "inherit",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: 360 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>
              {this.props.fallbackTitle ?? "Something went wrong"}
            </h1>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              style={{
                padding: "12px 20px",
                borderRadius: 12,
                border: "none",
                background: "hsl(var(--color-sa-600))",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {this.props.retryLabel ?? "Try again"}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
