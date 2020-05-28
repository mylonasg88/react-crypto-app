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
import MyComp from "../../components/MyComp";
import { selectableCurrencies } from "../../utils/dataCurrencies";
import { getCurrencies } from "../../api/conversion";
import {
  convertSelectedCurrency,
  saveUserCurrencies,
  readUserCurrencies
} from "../../utils/tools";

const classes = require("./ConvertFromTo.scss");

export default class ConvertorFromTo extends React.Component {
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

    console.log(rates);
    console.log(`from = ${from}, to = ${to}`);
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

  addCurrency = e => {
    let selectedCurrencies = this.state.selectedCurrencies;
    selectedCurrencies.push(this.state.currencySelected);
    this.setState({ selectedCurrencies });
    console.log(this.state.selectedCurrencies);
  };

  addCurrencyFromList = (event, currency) => {
    console.log(currency);
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
    return (
      <div className='convertorFromTo'>
        <h3>Convertor Box</h3>
        <div className='inputs'>
          <div className='inline convertValue'>
            <div className='selector'>
              <h4>From</h4>
              <select onChange={this.onChangeFrom}>
                {selectableCurrencies.map((key, i) => (
                  <option key={i} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              {/* <FormControl variant='outlined'>
                <InputLabel htmlFor='outlined-age-native-simple'>
                  Currency
                </InputLabel>
                <Select
                  native
                  value={this.state.currencySelected}
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
              </FormControl> */}
            </div>
            <label for='inputValue'>Add value</label>
            <input
              name='inputValue'
              type='number'
              value={this.state.convertValue}
              onChange={this.typeValue}
              ref={this.inputRef}
            />
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

        <div className='addCurrency'>
          {/* <FormControl variant='outlined'>
            <InputLabel htmlFor='outlined-age-native-simple'>
              Currency
            </InputLabel>
            <Select
              native
              value={this.state.currencySelected}
              onChange={this.onChangeAddCurrency}
              label='Currency'
            >
              <option aria-label='None' value='' />
              {selectableCurrencies.map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </Select>
          </FormControl> */}
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
        </div>

        <SelectedCurrenciesList
          show={this.state.isCurrenciesDisplayed}
          currencies={this.state.selectedCurrencies}
          rates={this.state.rates}
          convertValue={this.state.convertValue}
        />

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

const SelectedCurrenciesList = props => {
  const { currencies, rates, convertValue } = props;
  console.log(currencies);
  return (
    <div className={"convertToList"}>
      <h3>SelectedCurrenciesList</h3>
      {/* <Button
        variant='contained'
        color='primary'
        size='small'
        className={"button"}
        startIcon={<AddIcon />}
        onClick={() => {}}
      >
        Add Currency
      </Button> */}
      <List>
        {currencies.map((currency, key) => {
          console.log(currency);
          return (
            <ListItem key={key}>
              <ListItemAvatar>
                <img
                  src={`https://www.countryflags.io/${currency.flag}/flat/64.png`}
                  width={48}
                />
              </ListItemAvatar>
              <ListItemText primary={currency.name} secondary={currency.code} />
              <TextField
                disabled
                className={classes.currencyResultTxt}
                id={key}
                label=''
                variant='outlined'
                value={convertSelectedCurrency(
                  currency.code,
                  rates,
                  convertValue
                )}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
