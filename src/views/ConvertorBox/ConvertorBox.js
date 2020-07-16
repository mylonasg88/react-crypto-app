import React from "react";

import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import AddIcon from "@material-ui/icons/Add";
import AutoRenewIcon from "@material-ui/icons/Autorenew";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import {
  InputLabel,
  TextField,
  Select,
  FormControl,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";

// import CurrencyList from "../../components/CurrencyList/CurrencyList";
import CurrencyList from "../../components/CurrencyList/CurrencyList";
import SelectedCurrenciesList from "../SelectedCurrencies/SelectedCurrencies";

import { selectableCurrencies } from "../../utils/dataCurrencies";
import { getCurrencies } from "../../api/conversion";
import { saveUserCurrencies, readUserCurrencies } from "../../utils/tools";

const classes = require("./ConvertorBox.scss");

export default class ConvertorBox extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      convertValue: 5,
      convertedValue: 0,
      convertFrom: selectableCurrencies[0],
      convertTo: selectableCurrencies[0],
      selectedCurrencies: [],
      rates: null,
      currencySelected: "CAD",
      isCurrenciesDisplayed: false
    };
  }

  async componentDidMount() {
    this.inputRef.current.focus();
    const selectedCurrencies = await readUserCurrencies();
    this.setState({ selectedCurrencies });
  }

  convertCurrencies = async (from, to) => {
    const rates = await getCurrencies(from);
    if (!rates) {
      console.log("Error happened");
      return null;
    }

    if (this.state.convertValue === 0) return null;

    const convertedValue = (rates.rates[to] * this.state.convertValue).toFixed(
      3
    );

    this.setState({ convertedValue, rates: rates.rates });
  };

  typeValue = e => {
    const convertValue = e.target.value;
    this.setState({ convertValue });
  };

  onChangeFrom = e => {
    console.log(e.target.value);
    this.setState({ convertFrom: e.target.value });
  };

  onChangeTo = e => {
    this.setState({ convertTo: e.target.value });
  };

  convertCurrencyFromTo = () => {
    this.convertCurrencies(this.state.convertFrom, this.state.convertTo);
  };

  onChangeAddCurrency = e => {
    this.setState({ currencySelected: e.target.value });
  };

  // addCurrency = e => {
  //   let selectedCurrencies = this.state.selectedCurrencies;
  //   selectedCurrencies.push(this.state.currencySelected);
  //   this.setState({ selectedCurrencies });
  //   console.log(this.state.selectedCurrencies);
  // };

  addCurrencyFromList = (event, currency) => {
    const selectedCurrencies = this.state.selectedCurrencies;
    selectedCurrencies.push(currency);

    // Update local state for selected currencies
    saveUserCurrencies(selectedCurrencies);
    this.setState({ selectedCurrencies, isCurrenciesDisplayed: false });
  };

  showCurrenciesList = e => {
    this.setState({ isCurrenciesDisplayed: true });
  };

  render() {
    console.log("selected currency " + this.state.currencySelected);
    return (
      <div className='convertorFromTo'>
        <h3>Convertor Box</h3>
        <div className='inputs'>
          <div className='inline convertValue'>
            <div className='selector'>
              <FormControl variant='outlined' style={{ width: "110px" }}>
                <InputLabel htmlFor='outlined-age-native-simple'>
                  Currency
                </InputLabel>
                <Select
                  native
                  // value={this.state.currencySelected}
                  onChange={this.onChangeFrom}
                  label='Currency'
                >
                  <option aria-label='None' value='' />
                  {selectableCurrencies.map((key, i) => (
                    <option key={i} value={key}>
                      {key}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id='standard-basic'
                label='Value'
                ref={this.inputRef}
                type='number'
                onChange={this.typeValue}
                value={this.state.convertValue}
                // style={{ textAlign: "end", width: "100px" }}
              />
            </div>
          </div>
        </div>

        <div className={"convertSubmit"}>
          <Button
            variant='contained'
            color='primary'
            size='small'
            className={"button"}
            startIcon={<AutoRenewIcon />}
            onClick={this.convertCurrencyFromTo}
          >
            Convert
          </Button>
        </div>

        <SelectedCurrenciesList
          show={this.state.isCurrenciesDisplayed}
          currencies={this.state.selectedCurrencies}
          rates={this.state.rates}
          convertValue={this.state.convertValue}
        />

        {!this.state.isCurrenciesDisplayed && (
          <Button
            variant='contained'
            color='primary'
            size='small'
            className={"button"}
            startIcon={<AddIcon />}
            onClick={this.showCurrenciesList}
          >
            Add Currency
          </Button>
        )}

        {this.state.isCurrenciesDisplayed && (
          <CurrencyList
            setCurrency={this.addCurrencyFromList}
            cancel={event => this.setState({ isCurrenciesDisplayed: false })}
          />
        )}
      </div>
    );
  }
}
