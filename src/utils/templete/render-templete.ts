import hbs from 'handlebars';

export default function renderTemplete(data) {
  const templete = hbs.compile(`<!doctype html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>A simple, clean, and responsive HTML invoice template</title>
      
      <style>
      .center{
        text-align: center;
      }
  
      .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          font-size: 16px;
          line-height: 24px;
          font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color: #555;
      }
      
      .invoice-box table {
          width: 100%;
          line-height: inherit;
          text-align: left;
      }
      
      .invoice-box table td {
          padding: 0px;
          vertical-align: top;
      }
      
      .invoice-box table tr td:nth-child(2) {
          text-align: left;
      }
      
      .invoice-box table tr.top table td {
          padding-bottom: 20px;
      }
      
      .invoice-box table tr.top table td.title {
          font-size: 45px;
          line-height: 45px;
          color: #333;
      }
      
      .invoice-box table tr.information table td {
          padding-bottom: 40px;
      }
      
      .invoice-box table tr.heading td {
          /* background: #eee; */
          border-bottom: 1px solid #ddd;
          font-weight: bold;
      }
      
      .invoice-box table tr.details td {
          padding-bottom: 20px;
      }
      
      .invoice-box table tr.item td{
        font-size: 14px;
          border-bottom: 1px solid #eee;
      }
      
      .invoice-box table tr.item.last td {
          border-bottom: none;
      }
      
      .invoice-box table tr.total td:nth-child(2) {
          border-top: 2px solid #eee;
          font-weight: bold;
      }
      
      @media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td {
              width: 100%;
              display: block;
              text-align: center;
          }
          
          .invoice-box table tr.information table td {
              width: 100%;
              display: block;
              text-align: center;
          }
      }
      
      /** RTL **/
      .rtl {
          direction: ltr;
          font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
      }
      
      .rtl table {
          text-align: left;
      }
      
      .rtl table tr td:nth-child(2) {
          text-align: left;
      }
      </style>
  </head>
  
  <body>
      <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
              <tr class="top">
                  <td colspan="2">
                      <table>
                          <tr>
                              <td class="title">
                                  <img src="https://saibweb.com.br/saibweb/uploads/2019/05/Logo_Saibweb.svg" style="height: 80px; width:100%; max-width:300px;">
                              </td>
                              
                              <td>
                                <strong>Relatório</strong> n° 123<br>
                                  4 Março, 2021
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <h2 class="center">Relatório de Clientes</h2>
          <table>
              <tr class="heading">
                  <td>Nome</td>
                  <td>CPF/CNPJ</td>
                  <td>Telefone</td>
                  <td>Nasc.</td>
                  <td>Criado em</td>
              </tr>
              <tr class="item">
                <td>${data[0].CLI_NOME}</td>
                <td>${data[0].CLI_CPF_CNPJ}</td>
                <td>${data[0].CLI_NOME}</td>
                <td>01-MAI-1994</td>
                <td>05-JAN-2020</td>
              </tr>
              <tr class="item">
                <td>Mariana Campos Sodré</td>
                <td>755.646.371-00</td>
                <td>(62)992822760</td>
                <td>01-MAI-1994</td>
                <td>05-JAN-2020</td>
              </tr>
          </table>
          <div>
          </div>
      </div>
  </body>
  </html>
  `);
  const rendered = templete(data);
  return rendered;
}
