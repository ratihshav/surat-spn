export function dxGridFilter(filter) {
  let filterArray = new Array();
  if (typeof (filter[0]) === 'string') {
    filterArray.push(filter[0] + "|" + filter[2]);
  } else {
    let a;
    filter.forEach((fCol, index) => {
      if (typeof (fCol[0]) === 'string' && (!fCol[1].includes(">=") || !fCol[1].includes("<"))) {
        a = fCol === 'and' ? null : filterArray.push(fCol[0] + "|" + fCol[2]);
      } else if (fCol[1].includes(">=")) {
        a = filterArray.push(fCol[0] + "|" + fCol[2]);
      } else {
        a = fCol === 'and' || fCol[1].includes("<") ? null : filterArray.push(fCol[0][0] + "|" + fCol[0][2]);
      }
    });
  }
  return filterArray;
}

export function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== '';
}