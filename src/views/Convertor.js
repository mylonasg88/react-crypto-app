import React, { Fragment } from "react";

import ConvertorBox from "./ConvertorBox/ConvertorBox";
import SourceList from "./SourceList/SourceList";

import {
  dataCurrenciesObj,
  selectableCurrencies
} from "../utils/dataCurrencies";
import { getCurrencies } from "../api/conversion";

import styles from "./Convertor.scss";
import { Box, TextField, Paper, Container } from "@material-ui/core";

export default function Convertor() {
  return (
    <Container>
      <Paper variant='outlined' styles={{ width: "90%" }} className='Convertor'>
        <h2>Convertor</h2>
        <SourceList />
        <ConvertorBox />
        <div className='footer' />
      </Paper>
    </Container>
  );
}
