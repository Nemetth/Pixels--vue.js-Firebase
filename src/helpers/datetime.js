/**
 *
 * @param {Date} date
 * @returns  {string|null}
 */

export function dateToFormattedString(date) {
  if (date == null) return null;
  const dateFormatter = new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
  const hourFormatter = new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);

  return dateFormatter + " " + hourFormatter;
}
