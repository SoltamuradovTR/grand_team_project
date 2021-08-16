import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch } from "react-redux";
import {
  loginAgent,
  registrationAgent,
} from "../../redux/features/registration";

const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "black",
    color: "white",
    transform: "skewX(-20deg)",
  },
  typography: {
    padding: theme.spacing(2),
    display: "flex",
    margin: "auto",
  },
  buttonClose: {
    marginLeft: 300,
    marginTop: -50,
  },
  dialog: {
    background: "rgba(250,205,0,.9)",
    clipPath: "polygon(0 35px, 100% 0, 100% 810px, 0 100%)",
    /*-webkit-clip-path: polygon(0 35px, 100% 0, 100% 100%, 0 100%);*/
    padding: "60px 25px 30px",
    height: 'auto',
    width: 'auto',
    boxSizing: "revert",
  },
  button: {
    background: 'rgba(255,255,255,0.91)'
  },
  text: {
    color: 'rgb(0 0 0)'
  }
}));

export default function DialogRegisterAgent({ open, setOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddLogin = (e) => {
    setLogin(e.target.value);
  };
  const handleAddPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleAddFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleAddLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleAddDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleAddNumber = (e) => {
    setPhone(e.target.value);
  };
  const handleAddEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleAddLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleRegistration = () => {
    dispatch(
      registrationAgent({
        login,
        password,
        firstName,
        lastName,
        description,
        phone,
        email,
        location,
      })
    );
    setOpen(false);
  };

  function Copyright() {
    return (
      <Typography variant="body2" className={classes.text} color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container className={classes.dialog} component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.button}
                  autoComplete="fname"
                  name="имя"
                  variant="outlined"
                  required
                  fullWidth
                  id="имя"
                  label="Имя"
                  autoFocus
                  value={firstName}
                  onChange={handleAddFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.button}
                  variant="outlined"
                  required
                  fullWidth
                  id="фамилия"
                  label="Фамилия"
                  name="фамилия"
                  autoComplete="name"
                  value={lastName}
                  onChange={handleAddLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.button}
                  variant="outlined"
                  required
                  fullWidth
                  id="Описание"
                  label="Описание"
                  name="Описание"
                  autoComplete="name"
                  value={description}
                  onChange={handleAddDescription}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.button}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleAddEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.button}
                  variant="outlined"
                  required
                  fullWidth
                  id="number"
                  label="number"
                  name="number"
                  autoComplete="number"
                  value={phone}
                  onChange={handleAddNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.button}
                  variant="outlined"
                  required
                  fullWidth
                  id="login"
                  label="login"
                  name="login"
                  autoComplete="login"
                  value={login}
                  onChange={handleAddLogin}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.button}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handleAddPassword}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.button}
                  variant="outlined"
                  required
                  fullWidth
                  id="город"
                  label="Город"
                  name="Город"
                  autoComplete="name"
                  value={location}
                  onChange={handleAddLocation}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ marginRight: 15 }}
              onClick={handleRegistration}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link style={{color: 'black'}} href="/" variant="body2">
                  У вас уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Dialog>
  );
}
