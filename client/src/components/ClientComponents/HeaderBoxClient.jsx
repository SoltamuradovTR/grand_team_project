import React from "react";
import { Box, Checkbox, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HeaderUserClient from "./HeaderUserClient";
import { NavLink } from "react-router-dom";
import { searchRequest } from "../../redux/features/requests";
import { useDispatch } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import HeaderUser from "../DefaultComponents/Header/HeaderUser";
import SideBar from "./SideBar";

const useStyles = makeStyles((theme) => ({
  logo: {
    top: -8,
    right: 45,
    marginBottom: -48,
    height: "107px",
    width: "33%",
    background: "#fbe122",
    verticalAlign: "middle",
    cursor: "pointer",
    textAlign: "left",
    display: "block",
    lineHeight: 100,
    position: "relative",
    transform: "skew(-35deg)",
  },
  topBlock: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 40,
    width: "100%",
    backgroundColor: "#23292e",
    zIndex: -1,
    boxSizing: "revert",
  },
  threeIcons: {
    padding: "0px 0px 0px 28px",
    marginTop: -7,
  },
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
  // root: {
  //   flexGrow: 1,
  // },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  // title: {
  //   flexGrow: 1,
  //   display: "none",
  //   [theme.breakpoints.up("sm")]: {
  //     display: "block",
  //   },
  // },
  // search: {
  //   position: "relative",
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  //   marginLeft: 0,
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     marginLeft: theme.spacing(1),
  //     width: "auto",
  //   },
  // },
  // searchIcon: {
  //   padding: theme.spacing(0, 2),
  //   height: "100%",
  //   position: "absolute",
  //   pointerEvents: "none",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // inputRoot: {
  //   color: "inherit",
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //   transition: theme.transitions.create("width"),
  //   width: "100%",
  //   [theme.breakpoints.up("sm")]: {
  //     width: "12ch",
  //     "&:focus": {
  //       width: "20ch",
  //     },
  //   },
  // },
}));

function HeaderBoxClient(props) {
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
      <Box component="header">
        {/*Жёлтый блок*/}
        <NavLink to="/">
          <Box className={classes.logo}>
            <img
              src="https://i.imgur.com/Wri1MIh.png"
              style={{
                position: "absolute",
                transform: "skew(35deg)",

                margin: "0% 0% 0% 50%",
                width: "50%",
              }}
            />
          </Box>
        </NavLink>

        {/*Серая полоска*/}
        <Box className={classes.topBlock}></Box>

        <Box>
          {/*Иконки*/}
          <Box
            className={classes.threeIcons}
            style={{ float: "right", display: "flex" }}
          >
            {/*Поиск*/}
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

            {/*Переключатель*/}
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                    icon={<Brightness4Icon style={{ color: "#000000" }} />}
                    checkedIcon={
                      <Brightness7Icon style={{ color: "#000000" }} />
                    }
                  />
                }
              />
            </Box>

            {/*User*/}
            <Box>
              <HeaderUserClient />
            </Box>
            <Box>
              <SideBar />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HeaderBoxClient;

// <Box component="header"
//      style={{
//        backgroundColor: "rgba(0, 0, 0, .7)",
//        backdropFilter: "blur(15px)",
//        marginBottom: 20,
//        color: "white",
//      }}
// >
//   <Box className={classes.root}>
//     <Toolbar>
//       <IconButton
//           edge="start"
//           className={classes.menuButton}
//           color="inherit"
//           aria-label="open drawer"
//       >
//         <MenuIcon />
//       </IconButton>
//       <Typography className={classes.title} variant="h6" noWrap>
//         <NavLink to="/">LOGO</NavLink>
//       </Typography>
//       <Box className={classes.search}>
//         <Box className={classes.searchIcon}>
//           <SearchIcon />
//         </Box>
//         <InputBase
//             placeholder="Search…"
//             onChange={handleSearch}
//             classes={{
//               root: classes.inputRoot,
//               input: classes.inputInput,
//             }}
//             inputProps={{ "aria-label": "search" }}
//         />
//       </Box>
//       <HeaderUserClient />
//     </Toolbar>
//   </Box>
// </Box>
