"use client";

import { StatusState } from "@/components/ui/StatusState";

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
    <StatusState variant="error" title={title} details={details} onRetry={onRetry} />
  );
}
