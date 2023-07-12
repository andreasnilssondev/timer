export function formatTime(time: number): string {
  return Math.floor(time).toString().padStart(2, '0');
}
