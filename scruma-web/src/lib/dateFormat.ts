export function formatLocalDate(value?: string | null, includeTime = false) {
  if (!value) return "";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = parsed.getFullYear();

  const datePart = `${day}.${month}.${year}.`;
  if (!includeTime) return datePart;

  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");
  return `${datePart} ${hours}:${minutes}`;
}
