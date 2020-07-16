import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  List
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/DeleteForever";

import { convertSelectedCurrency } from "../../utils/tools";

const classes = require("../ConvertorBox/ConvertorBox.scss");

const SelectedCurrenciesList = props => {
  const { currencies, rates, convertValue } = props;

  const removeCurrency = key => {
    console.log(key);
  };

  return (
    <div className={"convertToList"}>
      <h3>Your Currencies</h3>
      <List>
        {currencies.map((currency, key) => {
          return (
            <ListItem key={key}>
              <DeleteIcon onClick={event => removeCurrency(key)} />
              <ListItemAvatar>
                <img
                  src={`https://www.countryflags.io/${currency.flag}/flat/64.png`}
                  width={48}
                />
              </ListItemAvatar>
              <ListItemText
                primary={currency.name}
                secondary={currency.code}
                className={"currencyName"}
              />
              <TextField
                disabled
                className={"currencyResultTxt"}
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

export default SelectedCurrenciesList;
