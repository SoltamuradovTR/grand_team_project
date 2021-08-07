import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from "@material-ui/core/Dialog";
import {useDispatch} from "react-redux";
import {registrationClient} from "../../redux/features/registration";



const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    padding: theme.spacing(2),
    display: 'flex',
    margin: 'auto'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  buttonClose: {
    marginLeft: 300,
    marginTop: -50
  }
}));

export default function DialogRegisterAgent({open, setOpen}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [login, setLogin] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();

  const handleClose = () => {
    setOpen(false)
  }
  const handleAddLogin = (e) => {
    setLogin(e.target.value)
  }
  const handleAddPassword = (e) => {
    setPassword(e.target.value)
  }
  const handleAddFirstName = (e) => {
    setFirstName(e.target.value)
  }
  const handleAddLastName = (e) => {
    setLastName(e.target.value)
  }
  const handleAddNumber = (e) => {
    setPhone(e.target.value)
  }
  const handleAddEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleAddLocation = (e) => {
    setLocation(e.target.value)
  }

  const handleRegistration = () => {
    dispatch(registrationClient({login, password, firstName, lastName, phone, email, location}))
  }


  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <Dialog open={open}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classes.paper}>
          <Button className={classes.buttonClose} onClick={handleClose}>Закрыть</Button>
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
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Я хочу получать по почте информацию о новых волонтерских программах"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{marginRight: 15}}
              onClick={handleRegistration}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
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