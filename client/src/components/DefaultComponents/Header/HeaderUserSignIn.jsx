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
  // dialog: {
  //   background: "rgba(250,205,0,.9)",
  //   clipPath: "polygon(0 35px, 100% 0, 100% 310px, 0 100%)",
  //   padding: "60px 25px 30px",
  //   height: 265,
  //   width: 450
  // }
  // dialog: {
  //   background: 'rgba(250,205,0,.9)',
  //   clipPath: 'polygon(0 35px, 100% 0, 100% 100%, 0 100%)',
  //   webkitClipPath: 'polygon(0 35px, 100% 0, 100% 100%, 0 100%)',
  //   padding: '60px 25px 30px'
  // }
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>

      <Box className="item cons">
        <h6>Войти</h6>
        <Box className="form_block form">
            <Box className="wrapper">

              <input type="hidden" name="value" value="Консультация" />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClickOpenClient}
                className={classes.submit}
              >
                Войти как Клиент
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClickOpenAgent}
                className={classes.submit}
              >
                <span>как Агент</span>
              </Button>
            </Box>
        </Box>
      </Box>
      </Dialog>
      <DialogLoginAgent open={openAgent} setOpen={setOpenAgent}/>
      <DialogLoginClient open={openClient} setOpen={setOpenClient}/>
    </>
  );
}

export default HeaderUserSignIn;






//         <Container>
//           <Box>

//           </Box>
//             <Box>

//             </Box>
//         </Container>
//
