This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

### Useful APIs
From IBAN page map currencies to countries.
https://www.iban.com/currency-codes

Parse all countries and put them in one array.
```
$('tr').each((i, tr) => {
    let country = {country: "", currency: "", code: "", number: 0};
    country.country = $($(tr).find('td')[0]).text();
    country.currency = $($(tr).find('td')[1]).text();
    country.code = $($(tr).find('td')[2]).text();
    country.number = $($(tr).find('td')[3]).text();
    
    countries.push(country);
    console.log(country, i);

});
```
