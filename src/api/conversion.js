export async function getCurrencies(base = "GBP") {
  try {
    const rates = await fetch(
      "https://api.exchangeratesapi.io/latest?base=" + base
    );
    return rates.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
