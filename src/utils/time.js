export function toHHMMSSFFF(secondsTotal) {
  const secondsNumber = parseInt(secondsTotal, 10);
  const hours = Math.floor(secondsNumber / 3600) % 24;
  const minutes = Math.floor(secondsNumber / 60) % 60;
  const seconds = secondsNumber % 60;
  const milliseconds = (secondsTotal - Math.floor(secondsTotal)).toFixed(3) * 1000;
  const values = [hours, minutes, seconds].map(value => (value < 10 ? `0${value}` : value));
  values.push((`00${milliseconds}`).slice(-3));
  return values.join(':');
}
