export function sanitise(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

export function sanitiseObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const result = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'string') {
      result[key] = sanitise(val);
    } else if (typeof val === 'object') {
      result[key] = sanitiseObject(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}