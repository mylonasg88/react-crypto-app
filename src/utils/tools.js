/**
 *
 * @param to
 * @param rates
 * @param convertValue
 * @returns {string|null}
 */
export const convertSelectedCurrency = (to, rates, convertValue) => {
  console.log(rates);
  if (!rates) return 0;
  // debugger;
  console.log("NOT NULL");
  console.log(to);
  console.log(convertValue, rates[to]);

  return (convertValue * rates[to]).toFixed(3);
};

export const saveUserCurrencies = currencies => {
  localStorage.setItem("userCurrencies", JSON.stringify(currencies));
};

export const readUserCurrencies = () => {
  return JSON.parse(localStorage.getItem("userCurrencies")) || [];
};
