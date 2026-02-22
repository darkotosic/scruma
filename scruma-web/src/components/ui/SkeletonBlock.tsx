export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-black/10 dark:bg-white/10 ${className}`} />;
}
