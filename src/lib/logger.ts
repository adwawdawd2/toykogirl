export type LogLevel = "debug" | "user_error" | "system_exception";

export interface LogPayload {
  event: string;
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
}

type Reporter = (level: LogLevel, payload: LogPayload) => void;

let reporter: Reporter | null = null;

export const setLogReporter = (nextReporter: Reporter | null) => {
  reporter = nextReporter;
};

const consoleMethodMap: Record<LogLevel, "debug" | "warn" | "error"> = {
  debug: "debug",
  user_error: "warn",
  system_exception: "error",
};

export const logEvent = (
  level: LogLevel,
  event: string,
  message: string,
  context?: Record<string, unknown>,
) => {
  const payload: LogPayload = {
    event,
    message,
    context,
    timestamp: new Date().toISOString(),
  };

  if (reporter) {
    reporter(level, payload);
    return;
  }

  if (level === "debug" && !import.meta.env.DEV) {
    return;
  }

  const method = consoleMethodMap[level];
  console[method](`[${event}] ${message}`, payload);
};
