import React from "react";
import { Box, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HeaderUser from "./HeaderUser";
import { NavLink } from "react-router-dom";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { searchRequest } from "../../../redux/features/requests";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function HeaderBox(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searchRequest(e.target.value));
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <>
      <Box component="header" style={{ background: "white", height: 107 }}>
        <Box className="container">
          <Box className="row">
            <Box id="header">
              <Box className="header-container">
                {/*Логотип*/}
                <Box className="header-logo">
                  <NavLink
                    to="/"
                    className="logo"
                    title="Harrier – Car Dealer WordPress Theme"
                  >
                    <Box>
                      <img src="https://klbtheme.com/harrier/wp-content/uploads/2019/05/logo.png" />
                    </Box>
                  </NavLink>
                </Box>

                <Box className="header__nav">
                  <Box className="header-banner"></Box>

                  {/*User*/}
                  <Box className="fl-header-right">
                    <Box className="fl-links">
                      <Box className="no-js">
                        <Box className="clicker">
                          <HeaderUser />
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/*Переключатель*/}
                  <Box className="fl-switch-contain">
                    <Box className="mini-switch">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={state.checkedB}
                            onChange={handleChange}
                            name="checkedB"
                            color="primary"
                            icon={
                              <Brightness4Icon style={{ color: "#000000" }} />
                            }
                            checkedIcon={
                              <Brightness7Icon style={{ color: "#000000" }} />
                            }
                          />
                        }
                      />
                    </Box>
                  </Box>

                  {/*Поиск*/}
                  <Box className="collapse navbar-collapse">
                    <Box className={classes.search}>
                      <Box className={classes.searchIcon}>
                        <SearchIcon />
                      </Box>
                      <InputBase
                        placeholder="Search…"
                        onChange={handleSearch}
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HeaderBox;

//      <Box component='header' style={{ backgroundColor: "rgba(0, 0, 0, .7)", backdropFilter: "blur(15px)", marginBottom: 20, color: 'white'}} >
//         <Box className={classes.root}>
//           <Toolbar>
//             <IconButton
//               edge='start'
//               className={classes.menuButton}
//               color="inherit"
//               aria-label="open drawer"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography className={classes.title} variant="h6" noWrap>
//               <NavLink to="/">
//                 LOGO
//               </NavLink>
//             </Typography>

//             <HeaderUser />
//           </Toolbar>
//         </Box>
//       </Box>
