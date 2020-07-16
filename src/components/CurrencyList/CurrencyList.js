import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import { currencies } from "../../utils/dataCurrencies";

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: "10px 0",
    width: "100%"
  },
  textField: { width: "100%", color: "black" },
  list: {
    border: "1px solid grey",
    marginTop: "5px",
    width: "100%",
    "border-radius": "4px",
    // maxWidth: 360,
    maxHeight: 200,
    overflow: "scroll",
    backgroundColor: theme.palette.background.paper
  }
}));

/**
 *
 * @param {setCurrency: function} props
 */
function CurrencyList(props) {
  const { setCurrency, cancel } = props;

  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [search, setSearch] = React.useState();

  const selectCurrency = (event, index) => {
    setSelectedIndex(index);
    if (setCurrency) setCurrency(event, currencies[index]);
  };

  const updateSearch = (event, value) => {
    setSearch(value);
  };

  return (
    <div class={classes.wrapper}>
      <TextField
        className={classes.textField}
        variant='outlined'
        value={search}
        label='Search'
        onChange={event => updateSearch(event, event.target.value)}
      />
      <List className={classes.list}>
        {currencies.map((currency, i) => {
          if (search && search.length > 1) {
            let _search = search.toLocaleLowerCase();
            let _country = currency.country.toLocaleLowerCase();
            let _name = currency.name.toLocaleLowerCase();
            let _code = currency.code.toLocaleLowerCase();

            if (
              _country.indexOf(_search) < 0 &&
              _name.indexOf(_search) < 0 &&
              _code.indexOf(_search) < 0
            )
              return null;
          }

          return (
            <ListItem
              selected={i === selectedIndex}
              button
              onClick={event => selectCurrency(event, i)}
            >
              <ListItemAvatar>
                <img
                  src={`https://www.countryflags.io/${currency.flag}/flat/64.png`}
                  width={48}
                />
              </ListItemAvatar>
              <ListItemText primary={currency.name} secondary={currency.code} />
            </ListItem>
          );
        })}
      </List>
      <Button
        variant='contained'
        color='secondary'
        size='small'
        className={"button"}
        // startIcon={<AddIcon />}
        onClick={event => {
          if (typeof cancel !== "undefined") cancel(event);
        }}
      >
        Cancel
      </Button>
    </div>
  );
}

function SearchCurrencyList(props) {
  const [search, setSearch] = React.useState();

  const handleChange = (event, value) => {
    setSearch(value);
  };

  return (
    <div>
      <input
        type={"text"}
        value={search}
        onChange={event => {
          console.log(event.target.value);
          handleChange(event, event.target.value);
        }}
      />
      {props.children}
    </div>
  );
}

export default CurrencyList;
