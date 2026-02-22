"use client";

export function ApiErrorState({
  title = "Сервис тренутно није доступан",
  details,
  onRetry,
}: {
  title?: string;
  details?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-black/10 p-6 dark:border-white/10">
      <div className="text-lg font-semibold">{title}</div>
      {details ? <div className="mt-2 whitespace-pre-wrap text-sm opacity-80">{details}</div> : null}
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-4 rounded-xl border border-black/15 px-4 py-2 transition hover:shadow-md dark:border-white/15"
        >
          Покушај поново
        </button>
      ) : null}
    </div>
  );
}
