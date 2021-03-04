import hbs from 'handlebars';

hbs.registerHelper('normalizeNome', function (v) {
  if (v != '' && v != null && v === undefined) {
    const text = v
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    return text;
  }
  return v;
});

hbs.registerHelper('normalizeCpf', function (str) {
  if (str != '' && str != null) {
    str = str.replace(/\D/g, ''); //Remostre tudo o que não é dígito
    if (str.length <= 11) {
      str = str.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
      str = str.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
      //de nostro (para o segundo bloco de números)
      str = str.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
      return str;
    } else {
      str = str
        .replace(/\D/g, '')
        .match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
      str = !str[2]
        ? str[1]
        : str[1] +
          '.' +
          str[2] +
          '.' +
          str[3] +
          '/' +
          str[4] +
          (str[5] ? '-' + str[5] : '');
      return str;
    }
  }
  return str;
});

hbs.registerHelper('normalizeCep', function (v) {
  v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
  v = v.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/, '$1.$2-$3');

  return v;
});

hbs.registerHelper('normalizeData', function (str) {
  const a = new Date(str);
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = date + ' ' + month + ' ' + year;
  return time;
});

hbs.registerHelper('normalizeFone', function (label) {
  if (label != '' && label != null) {
    let v = label.replace(/\D/g, ''); //Remove tudo o que não é dígito
    if (label.length < 15) {
      v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
      v = v.replace(/^(\d\d)(\d)/g, '($1) $2'); //Coloca parênteses em volta dos dois primeiros dígitos
      v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
      return v;
    } else {
      v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
      v = v.replace(/^(\d\d)(\d)/g, '($1) $2'); //Coloca parênteses em volta dos dois primeiros dígitos
      v = v.replace(/(\d{5})(\d)/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
    }
  }
  return label;
});
