import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCandidate,
  setEditingAgent,
  uploadAvatarAgent,
} from "../../redux/features/login";
import Box from "@material-ui/core/Box";
import EditingAgentDialog from "./EditingAgentDialog";
import IconButton from "@material-ui/core/IconButton";
import { PhotoCamera } from "@material-ui/icons";
import {
  loadAllReviews,
  selectAllReviews,
  selectLoadingReviews,
} from "../../redux/features/review";
import { NavLink } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  avatarButton: {
    opacity: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "150px",
    height: "150px",
    marginTop: 20,
    position: "absolute",
    transition: "300ms",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.45)",
    "&:hover": {
      opacity: 1,
    },
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    color: "whitesmoke",
  },
  paper: {
    color: "black",
    background: "rgb(251, 225, 34)",
    clipPath: "polygon(0px 0px, 100% 35px, 100% 100%, 0px 100%)",
    marginTop: -47,
  },
  paper1: {
    height: 710,
    width: 500,
    marginLeft: 20,
  },
  input: {
    display: "none",
  },
  root: {
    flexGrow: 1,
    display: "flex",
    marginTop: 40,
    height: "288px",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  dialog: {
    background: "rgba(250,205,0,.9)",
    clipPath: "polygon(0 35px, 100% 0, 100% 100%, 0 100%)",
    /*-webkit-clip-path: polygon(0 35px, 100% 0, 100% 100%, 0 100%);*/
    padding: "60px 25px 30px",
    height: "auto",
    width: "auto",
    boxSizing: "revert",
  },
  h6: {
    color: " #000",
    fontSize: 22,
    margin: "0 0 25px 120px",
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    marginBottom: 80,
    color: "#44b700",
    boxShadow: `0 0 0 2.5px #424242 `,
    borderRadius: 20,
    width: 20,
    height: 20,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      marginLeft: "-2px",
      marginTop: "-2px",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "2px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

function AgentCab() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [agentOpen, setAgentOpen] = useState(false);

  const candidate = useSelector(selectCandidate);

  function handleChangeAvatar(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatarAgent(file));
  }

  const handleClickOpenAgent = () => {
    dispatch(setEditingAgent());
  };

  const reviews = useSelector(selectAllReviews);
  const loading = useSelector(selectLoadingReviews);

  useEffect(() => {
    dispatch(loadAllReviews(candidate._id));
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Box
          style={{
            left: 15,
            boxSizing: "border-box",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box className={classes.imageCar}>
            <Box style={{ marginTop: -90 }}>
              <NavLink
                to="/"
                style={{ color: "#fff", fontSize: 12, textDecoration: "none" }}
              >
                Home › Vehicle Grid
              </NavLink>
            </Box>
            <Box>
              <h2
                style={{
                  fontFamily: "Saira Condensed', sans-serif",
                  fontSize: 46,
                  textTransform: "uppercase",
                  margin: 5,
                  color: "#fff",
                }}
              >
                Vehicle Grid
              </h2>
            </Box>
          </Box>
        </Box>
        <Box style={{ textAlign: "center", marginTop: "10%" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <Box
      style={{
        backgroundImage:
          'url("http://podarok.co.ua/land/048/design/megamotors/images/cars4.jpg")',
        height: 986,
      }}
    >
      <Container>
        <Grid container className={classes.root} spacing={2}>
          <Grid
            style={{ marginTop: 30 }}
            container
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <Paper className={classes.paper}>
                <div className={classes.root}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={handleChangeAvatar}
                  />
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={candidate.avatar}
                      style={{ width: 150, height: 150, marginTop: 20 }}
                    />
                    <Box className={classes.avatarButton}>
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="default"
                          aria-label="upload picture"
                          component="span"
                          className={classes.button}
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </Box>
                  </StyledBadge>

                  <Box style={{  }}>
                    <Typography style={{ marginTop: 45 }} variant="h3">
                      <Box>
                        <Typography variant="h6">
                          {candidate.firstName} {candidate.lastName}
                        </Typography>
                        <Typography variant="h6">
                          Город: {candidate.location}
                        </Typography>
                        <Typography variant="h6">
                          Телефон: {candidate.phone}
                        </Typography>
                        <Typography variant="h6">
                          Почта: {candidate.email}
                        </Typography>
                        <Typography variant="h6">
                          О себе: {candidate.description}
                        </Typography>
                      </Box>
                    </Typography>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={handleClickOpenAgent}
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        backgroundColor: "white",
                        color: "black",
                      }}
                    >
                      Редактировать
                    </Button>
                  </Box>
                </div>
              </Paper>

              <Paper
                style={{
                  height: "55%",
                  boxShadow: "none",
                  background: "rgb(251, 225, 34)",
                }}
              >
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Accordion style={{ width: "590px", borderRadius: 10 }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{
                              background: "black",
                              color: "white",
                              borderRadius: 10,
                            }}
                          >
                            <Typography className={classes.heading}>
                              Отзывы
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box>
                              {reviews.map((review) => {
                                return (
                                  <Box
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: 500,
                                      marginBottom: 10,
                                    }}
                                  >
                                    <Box>{review.author.firstName}</Box>
                                    <Box>{review.text}</Box>
                                  </Box>
                                );
                              })}
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Paper
              className={classes.paper1}
              style={{
                webkitClipPath: "polygon(0 35px, 100% 0, 100% 100%, 0 100%)",
                background: "#fbe122",
              }}
            >
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Accordion
                        style={{
                          width: "480px",
                          background: "#fff",
                          borderRadius: 10,
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          style={{
                            background: "black",
                            borderRadius: 10,
                            color: "white",
                          }}
                        >
                          <Typography style={{ margin: "auto", }}>
                            Клиенты
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <AccordionDetails>
                            <Box>
                              {candidate.clients.map((client) => {
                                return (
                                  <Box
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      width: "54%",
                                      marginBottom: 10,
                                    }}
                                  >
                                    <Box>
                                      {client.firstName} {client.lastName}
                                    </Box>
                                  </Box>
                                );
                              })}
                            </Box>
                          </AccordionDetails>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <EditingAgentDialog />
    </Box>
  );
}

export default AgentCab;

//                        {reviews.map((review) => {
//                           return (
//                             <Box
//                               style={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 width: 500,
//                                 marginBottom: 10,
//                               }}
//                             >
//                               <Box>{review.author.firstName}</Box>
//                               <Box>{review.text}</Box>
//                             </Box>
//                           );
