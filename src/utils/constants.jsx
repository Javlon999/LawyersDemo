export const numberWithSpaces=(x)=> {
  var parts = x.toString().split(".");
  parts = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  var result = parts.toString()
  return result;
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function replaceAll(str, term, replacement) {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

export const base_url = 'http://172.16.2.17:4444';