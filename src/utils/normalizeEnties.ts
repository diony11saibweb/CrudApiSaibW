export function normalizeName(name) {
  if (name != '' || name != null || undefined) {
    console.log(name);
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
  if (v != '' || v != null) {
    v = v.replace(/\D/g, '');
    return v;
  }
  return v;
}

export function normalizePhone(v) {
  if (v != '' || v != null) {
    v = v.replace(/\D/g, '');
    return v;
  }
  return v;
}

export function normalizeDate(data) {
  const x = new Date(data);
  return x;
}
