import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import DialogRegisterClient from '../../ClientComponents/DialogRegisterClient';
import DialogRegisterAgent from '../../AgentComponents/DialogRegisterAgent';



const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    display: 'flex',
    margin: 'auto'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


function HeaderUserSignUp(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false)
  const [openAgent, setOpenAgent] = useState(false)
  const [openClient, setOpenClient] = useState(false)
  const [openRegisterAgent, setOpenRegisterAgent] = useState(false)
  const [openRegisterClient, setOpenRegisterClient] = useState(false)

const handleRegisterOpenClient = () => {
  setOpenRegisterClient(true)
}

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleRegisterOpenAgent = () => {
    setOpenRegisterAgent(true)
  }

  // const handleClickOpenAgent = () => {
  //   setOpenAgent(true)
  // }

  const handleClickOpenClient = () => {
    setOpenClient(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div>
        <Button className={classes.typography} onClick={handleClickOpen}>Регистрация</Button>
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <Container>
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegisterOpenAgent}
            >
              Зарегистрироваться как Агент
            </Button>
          </Box>
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegisterOpenClient}
            >
              Зарегистрироваться как Клиент
            </Button>
          </Box>
        </Container>

      </Dialog>
      <DialogRegisterAgent open={openRegisterAgent} setOpen={setOpenRegisterAgent}/>
      <DialogRegisterClient open={openRegisterClient} setOpen={setOpenRegisterClient}/>
    </>
  )
}

export default HeaderUserSignUp;