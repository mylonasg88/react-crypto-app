import React, { Fragment } from "react";

import ConvertorFromTo from "./ConvertFromTo/ConvertorFromTo";

import {
  dataCurrenciesObj,
  selectableCurrencies
} from "../utils/dataCurrencies";
import { getCurrencies } from "../api/conversion";

import styles from "./Convertor.scss";
import { Box, TextField } from "@material-ui/core";

export default class Convertor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: dataCurrenciesObj,
      userCurrencies: {
        USD: dataCurrenciesObj.USD,
        GBP: dataCurrenciesObj.GBP
      },
      selectedCode: "USD",
      selectedValue: 0
    };
  }

  componentDidMount() {}

  currencyLi(curr) {
    return <option>{curr}</option>;
  }

  addCurrency(curr) {
    const userCurrs = this.state.userCurrencies.push(dataCurrenciesObj[curr]);
    this.setState({ userCurrencies: userCurrs });
  }

  updateInput = e => {
    const selectedCode = e.target.name;
    const selectedValue = e.target.value;
    console.log("Converting currency code " + selectedCode);
    console.log("Converting currency value " + selectedValue);

    //Convert to user currencies
    let userKeys = Object.keys(this.state.userCurrencies);
    const userCurrencies = this.state.userCurrencies;

    // userKeys.map((currency) => {
    //   console.log("User currency " + currency.code);
    //   if (currency.code !== selectedCode) {
    //     console.log(userCurrencies[currency.code]);
    //
    //     // userCurrencies[currency.code].value = 0;
    //   }
    // });
    // userCurrencies
    this.setState({ userCurrencies, selectedCode, selectedValue });

    // this.convertCurrency(selectedCode);
  };

  convertCurrency = async selectedCode => {
    const rates = await getCurrencies(selectedCode);
    if (!rates) {
      console.log("Error happened");
      return null;
    }

    console.log(rates);
    let selectedCurrencies = ["GBP"];
    // Update inputs with converted values
    let convertToCurrency = this.state.currencies[selectedCode];
    console.log(
      "Converting to " +
        convertToCurrency.code +
        " value " +
        this.state.selectedValue
    );
    let result = rates.rates.GBP * this.state.selectedValue;
    console.log(result);
    // this.setState()

    // const userCurrencies = this.state.userCurrencies;
    // console.log(userCurrencies);
  };

  convertCurrencyFromTo = async (from = "CAD", to = "CAD") => {
    const rates = await getCurrencies(from);
    if (!rates) {
      console.log("Error happened");
      return null;
    }

    console.log(`Converting from ${from} to ${to}`);
  };

  render() {
    // console.log(dataCurrenciesObj);
    let keys = Object.keys(dataCurrenciesObj);
    let userKeys = Object.keys(this.state.userCurrencies);

    return (
      <Box>
        <div className='Convertor'>
          <h2>Convertor</h2>
          <div>
            <span>Apis are from</span>
            <br />
            <ol style={{ textAlign: "left", width: "400px", margin: "0 auto" }}>
              <li>
                <a href='https://exchangeratesapi.io/'>
                  https://exchangeratesapi.io/
                </a>
              </li>
              <li>
                <a href='https://www.iban.com/currency-codes'>
                  https://www.iban.com/currency-codes
                </a>
              </li>
              <li>
                <a href='https://www.countryflags.io/'>
                  https://www.countryflags.io/
                </a>
                <img
                  src='https://www.countryflags.io/GR/shiny/64.png'
                  width={24}
                />
              </li>
            </ol>
            <br />
          </div>

          <div>
            <h3>Selected Currencies</h3>
            <ul style={{ textAlign: "left", width: "400px", margin: "0 auto" }}>
              {userKeys.map((currencyCode, i) => {
                return this.inputCurrency(currencyCode);
              })}
            </ul>
            <button
              onClick={() => {
                console.log("Selected code: " + this.state.selectedCode);
                this.convertCurrency(this.state.selectedCode);
              }}
            >
              Convert
            </button>
          </div>

          <ConvertorFromTo />

          <div className='footer' />
        </div>
      </Box>
    );
  }

  inputCurrency = currencyCode => {
    const curr = this.state.currencies[currencyCode];
    return (
      <li
        style={
          curr.code === this.state.selectedCurrency
            ? { border: "1px solid blue" }
            : null
        }
      >
        <span>{curr.code}</span>
        <input
          type='number'
          value={curr.value}
          name={curr.code}
          onChange={this.updateInput}
        />
        <TextField
          disabled
          id={"h"}
          label='Disabled'
          defaultValue='Hello World'
        />
      </li>
    );
  };
}
