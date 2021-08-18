import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import DialogRegisterClient from "../../ClientComponents/DialogRegisterClient";
import DialogRegisterAgent from "../../AgentComponents/DialogRegisterAgent";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    display: "flex",
    margin: "auto",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "black",
    color: "white",
    transform: "skewX(-20deg)",
  },
  dialog: {
    background: "rgba(250,205,0,.9)",
    clipPath: "polygon(0 35px, 100% 0, 100% 310px, 0 100%)",
    padding: "60px 25px 30px",
    height: 265,
    width: 450,
    boxSizing: "revert",
  },
  h6: {
    color: " #000",
    fontSize: 22,
    margin: "0 0 25px 120px",
  },
}));

function HeaderUserSignUp(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [openRegisterAgent, setOpenRegisterAgent] = useState(false);
  const [openRegisterClient, setOpenRegisterClient] = useState(false);

  const handleRegisterOpenClient = () => {
    setOpenRegisterClient(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRegisterOpenAgent = () => {
    setOpenRegisterAgent(true);
  };

  const handleClickOpenClient = () => {
    setOpenClient(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Button className={classes.typography} onClick={handleClickOpen}>
          Регистрация
        </Button>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Box className={classes.dialog}>
          <h6 className={classes.h6}>Зарегистрироваться</h6>
          <Box>
            <input type="hidden" name="value" value="Консультация" />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRegisterOpenAgent}
              className={classes.submit}
            >
              как Агент
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleRegisterOpenClient}
              className={classes.submit}
            >
              как Клиент
            </Button>
          </Box>
        </Box>
      </Dialog>
      <DialogRegisterAgent
        open={openRegisterAgent}
        setOpen={setOpenRegisterAgent}
      />
      <DialogRegisterClient
        open={openRegisterClient}
        setOpen={setOpenRegisterClient}
      />
    </>
  );
}

export default HeaderUserSignUp;
