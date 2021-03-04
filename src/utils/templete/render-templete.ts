import hbs from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import './helpers';

export default function renderTemplete(clients, templeteName) {
  const html = fs.readFileSync(path.join(__dirname, `${templeteName}.hbs`), {
    encoding: 'utf-8',
  });

  hbs.create();

  const templete = hbs.compile(html);
  const rendered = templete(clients);
  return rendered;
}
