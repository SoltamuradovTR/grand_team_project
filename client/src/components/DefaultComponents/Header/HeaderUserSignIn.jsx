import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, } from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import DialogLoginAgent from '../../AgentComponents/DialogLoginAgent';
import DialogLoginClient from '../../ClientComponents/DialogLoginClient';


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

function HeaderUserSignIn(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false)
  const [openAgent, setOpenAgent] = useState(false)
  const [openClient, setOpenClient] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickOpenAgent = () => {
    setOpenAgent(true)
  }

  const handleClickOpenClient = () => {
    setOpenClient(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div>
        <Button className={classes.typography} onClick={handleClickOpen}>Войти</Button>
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
                    onClick={handleClickOpenAgent}
                  >
                    Войти как Агент
                  </Button>
          </Box>
            <Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleClickOpenClient}
              >
                Войти как Клиент
              </Button>
            </Box>
        </Container>

      </Dialog>
      <DialogLoginAgent open={openAgent} setOpen={setOpenAgent}/>
      <DialogLoginClient open={openClient} setOpen={setOpenClient}/>
    </>
  );
}

export default HeaderUserSignIn;


