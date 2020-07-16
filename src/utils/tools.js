/**
 *
 * @param to
 * @param rates
 * @param convertValue
 * @returns {string|null}
 */
export const convertSelectedCurrency = (to, rates, convertValue) => {
  // console.log(rates);
  if (!rates) return 0;
  // debugger;
  // console.log("to: " + to);
  // console.log("convertValue: " + convertValue, "to: " + rates[to]);

  // console.log(
  //   `Convert ${rates[to].toFixed(3)} to ${to} amount of ${convertValue}`
  // );
  return (convertValue * rates[to]).toFixed(3);
};

export const saveUserCurrencies = currencies => {
  localStorage.setItem("userCurrencies", JSON.stringify(currencies));
};

export const readUserCurrencies = () => {
  return JSON.parse(localStorage.getItem("userCurrencies")) || [];
};
