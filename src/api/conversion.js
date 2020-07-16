export async function getCurrencies(base = "GBP") {
  console.log("base currency: " + base);
  try {
    const rates = await fetch(
      "https://api.exchangeratesapi.io/latest?base=" + base
    );
    return rates.json();
  } catch (err) {
    console.log(err);
    console.log("base:" + base);
    return null;
  }
}
