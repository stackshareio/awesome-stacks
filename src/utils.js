export function truncate(str, limit = 12) {
  return str && str.length > limit ? `${str.substring(0, limit).trim()}…` : str
}

export function shortenLargeNumber(num, digits) {
  var units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
    decimal;

  for (var i = units.length - 1; i >= 0; i--) {
    decimal = Math.pow(1000, i + 1);

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(digits) + units[i];
    }
  }

  return num;
}