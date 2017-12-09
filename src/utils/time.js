export function toHHMMSS(secondsTotal) {
  const secondsNumber = parseInt(secondsTotal, 10);
  const hours = Math.floor(secondsNumber / 3600) % 24;
  const minutes = Math.floor(secondsNumber / 60) % 60;
  const seconds = secondsNumber % 60;
  return [hours, minutes, seconds]
    .map(value => (value < 10 ? `0${value}` : value))
    .join(':');
}
