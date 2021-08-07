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
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useDispatch} from "react-redux";
import {loginClient} from "../../redux/features/login";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonClose: {
    marginLeft: 300,
    marginTop: -50,
  },
}));

function DialogLoginAgent({ open, setOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleAddPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    dispatch(loginClient(login, password));
  };

  return (
    <Dialog open={open}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classes.paper}>
          <Button className={classes.buttonClose} onClick={handleClose}>
            Закрыть
          </Button>
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
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
                <Link href="#" variant="body2">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Зарегистрироваться"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box mt={8}></Box>
      </Container>
    </Dialog>
  );
}

export default DialogLoginAgent;
