export function getQueryArray() {
  let ret = location.hash.substr(1).split('&')
  return ret
}
