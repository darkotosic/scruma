"use client";

type StatusStateVariant = "loading" | "empty" | "error";

export function StatusState({
  variant,
  title,
  details,
  onRetry,
}: {
  variant: StatusStateVariant;
  title: string;
  details?: string;
  onRetry?: () => void;
}) {
  return (
    <div className={`status-state status-state-${variant}`} role={variant === "error" ? "alert" : "status"}>
      <div className="status-state-icon" aria-hidden="true">
        {variant === "loading" ? "⏳" : variant === "empty" ? "📭" : "⚠️"}
      </div>
      <h3 className="status-state-title">{title}</h3>
      {details ? <p className="status-state-details">{details}</p> : null}
      {variant === "error" && onRetry ? (
        <button type="button" className="status-state-retry" onClick={onRetry}>
          Покушај поново
        </button>
      ) : null}
    </div>
  );
}

