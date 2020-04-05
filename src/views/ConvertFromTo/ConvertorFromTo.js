import React from "react";
// import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button';

import { selectableCurrencies } from "../../utils/dataCurrencies";
import { getCurrencies } from "../../api/conversion";

require("./ConvertFromTo.scss");

export default class ConvertorFromTo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      convertValue: 5,
      convertedValue: 0,
      convertFrom: selectableCurrencies[0],
      convertTo: selectableCurrencies[0],
      selectedCurrencies: [],
      rates: null,
      currencySelected: "CAD"
    };
  }

  convertCurrencies = async (from, to) => {
    const rates = await getCurrencies(from);
    if (!rates) {
      console.log("Error happened");
      return null;
    }

    if (this.state.convertValue === 0) return null;

    console.log(rates);
    console.log(`from = ${from}, to = ${to}`);
    const convertedValue = (rates.rates[to] * this.state.convertValue).toFixed(
      3
    );

    this.setState({ convertedValue, rates:rates.rates });
  };

  typeValue = (e) => {
    const convertValue = e.target.value;
    this.setState({ convertValue });
  };

  onChangeFrom = (e) => {
    console.log(e.target.value);
    this.setState({ convertFrom: e.target.value });
  };

  onChangeTo = (e) => {
    this.setState({ convertTo: e.target.value });
  };

  convertCurrencyFromTo = () => {
    this.convertCurrencies(this.state.convertFrom, this.state.convertTo);
  };

  convertSelectedCurrency = (to) => {
    console.log(this.state.rates);
    if(!this.state.rates) return null;
    // debugger;
    console.log('NOT NULL');
    console.log(to);
    console.log(this.state.convertValue, this.state.rates[to]);

    const amount = (this.state.convertValue * this.state.rates[to]).toFixed(3);
    return amount;
  }

  onChangeAddCurrency = (e) => {
     this.setState({currencySelected: e.target.value});
  }

  addCurrency = (e) => {
    let selectedCurrencies = this.state.selectedCurrencies;
    selectedCurrencies.push(this.state.currencySelected);
    this.setState({selectedCurrencies});
    console.log(this.state.selectedCurrencies);
  }

  render() {
    return (
      <div className="convertorFromTo">
        <h3>Convert</h3>
        <div className="inputs">
          <div className="inline convertValue">
            <label for="inputValue">Add value</label>
            <input
              name="inputValue"
              type="number"
              value={this.state.convertValue}
              onChange={this.typeValue}
            />
          </div>
          <div className="inline convertedValue">
            <span> = {this.state.convertedValue}</span>
          </div>
        </div>
        <div className="selector">
          <h4>From</h4>
          <select onChange={this.onChangeFrom}>
            {selectableCurrencies.map((key, i) => (
              <option key={i} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="selector">
          <h4>To</h4>
          <select onChange={this.onChangeTo}>
            {selectableCurrencies.map((key, i) => (
              <option key={i} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className={"convertSubmit"}>
          <button onClick={this.convertCurrencyFromTo}> Convert </button>
        </div>
        <div className='addCurrency'>
          <select onChange={this.onChangeAddCurrency}>
            {selectableCurrencies.map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
            ))}
          </select>
          <button onClick={this.addCurrency}>Add Currency</button>
        </div>
        <div className={"convertToList"}>
          <ul>
            {this.state.selectedCurrencies.map(key => {
              return <li key={key}>{key} <input type="text" value={this.convertSelectedCurrency(key)} disabled /></li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}
