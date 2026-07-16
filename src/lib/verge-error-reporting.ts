type vergeErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type vergeEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: VergeErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __vergeEvents?: vergeEvents;
  }
}

export function reportvergeError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__vergeEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
