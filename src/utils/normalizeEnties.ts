export function normalizeName(name) {
  if (name != '' && name != null && name != undefined) {
    const text = name
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    return text;
  }
  return name;
}

export function normalizeCpfCnpj(v) {
  if (v != '' && v != null) {
    v = v.replace(/\D/g, '');
    return v;
  }
  return v;
}

export function normalizePhone(v) {
  if (v != '' && v != null) {
    v = v.replace(/\D/g, '');
    return v;
  }
  return v;
}

export function normalizeDate(data) {
  const x = new Date(data);
  return x;
}

export function normalizeCep(v) {
  if (v != '' && v != null && v == isNaN) {
    const x = v.replace(/\D/g, '');
    return x;
  }
  return v;
}

export function normalizeUf(v) {
  if (v != '' && v != null) {
    v = v.replace('[^a-zA-Z]+', '');
    return v.toUpperCase();
  }
  return v;
}

export function normalizeQueryDate() {
  return;
}
