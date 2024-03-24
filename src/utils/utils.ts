export function formatDate(date: Date): string {
  const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  } as Intl.DateTimeFormatOptions;

  const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(date);

  return formattedDate.toString();
}
