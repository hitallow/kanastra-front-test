export function timestempToDate(timestamp: number): string {
  const d = new Date(timestamp * 1000);

  let day: string | number = d.getDate();
  let month: string | number = d.getMonth() + 1;
  const year = d.getFullYear();

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;

  return `${day}/${month}/${year}`;
}
