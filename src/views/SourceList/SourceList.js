import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

import InfoIcon from "@material-ui/icons/InfoOutlined";

export default function SourceList() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = () => {
    setOpen(1);
  };

  const handleClose = () => {
    setOpen(0);
  };

  return (
    <div>
      <span
        onClick={handleOpen}
        style={{ textDecoration: "underline", cursor: "pointer" }}
      >
        <InfoIcon /> Info
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <br />
    </div>
  );
}
