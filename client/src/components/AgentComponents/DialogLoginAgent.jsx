import React, { useState } from "react";
import {
  Checkbox,
  CssBaseline,
  Dialog,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { loginAgent } from "../../redux/features/login";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    marginTop: 'auto',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'black',
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "black",
    color: "white",
    transform: "skewX(-20deg)",
  },
  buttonClose: {
    marginLeft: 300,
    marginTop: -50,
  },
  dialog: {
    background: "rgba(250,205,0,.9)",
    clipPath: "polygon(0 35px, 100% 0, 100% 505px, 0 100%)",
    /*-webkit-clip-path: polygon(0 35px, 100% 0, 100% 100%, 0 100%);*/
    padding: "60px 25px 30px",
    height: 455,
    width: 'auto',
    boxSizing: "revert",
  },
  login: {
    background: 'rgba(255,255,255,0.91)'
  },
  password: {
    background: 'rgba(255,255,255,0.91)'
  }
}));

function DialogLoginAgent({open, setOpen}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");


  const handleClose = (e) => {
    setOpen(e.target.value);
  };

  const handleAddLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleAddPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    dispatch(loginAgent(login, password));
  };

  return (
    <>
    <Dialog open={open} onClick={handleClose} aria-labelledby="form-dialog-title">
      <Container className={classes.dialog} component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              value={login}
              label="Login"
              name="login"
              onChange={handleAddLogin}
              autoComplete="login"
              autoFocus
              className={classes.login}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleAddPassword}
              autoComplete="current-password"
              className={classes.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"  />}
              label="Запомнить меня"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item xs>
                <Link style={{color: 'black'}} href="#" variant="body2">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link style={{color: 'black'}} href="#" variant="body2">
                  {"Зарегистрироваться"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box mt={8}></Box>
      </Container>
    </Dialog>
    </>
  );
}

export default DialogLoginAgent;
