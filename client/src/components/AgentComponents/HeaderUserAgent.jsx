import React, { useState } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Popover } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/login";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    display: "flex",
    margin: "auto",
  },
}));

function HeaderUserAgent(props) {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState({
    light: true,
  });

  const handleChangeTheme = (event) => {
    setTheme({ ...theme, [event.target.name]: event.target.checked });
  };

  const currentTheme = theme.light === true ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);

  const toggleTheme = (
    <Switch
      checked={theme.light}
      onChange={handleChangeTheme}
      name="light"
      color="default"
      inputProps={{ "aria-label": "checkbox with default color" }}
    />
  );
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div>
        <CardMedia style={{ marginRight: 200 }}>
          <a
            aria-describedby={id}
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            <PersonIcon style={{ fontSize: 40, cursor: "pointer" }} />
          </a>
        </CardMedia>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Button className={classes.typography}>
            <NavLink
              style={{ textDecoration: "none", color: "inherit" }}
              to="/cab"
            >
              Личный кабинет
            </NavLink>
          </Button>
          <Button className={classes.typography} onClick={handleLogout}>
            <NavLink
              style={{ textDecoration: "none", color: "inherit" }}
              to="/"
            >
              Выйти
            </NavLink>
          </Button>
        </Popover>
      </div>
      {/*<FormControlLabel control={toggleTheme} />*/}
    </>
  );
}

export default HeaderUserAgent;
