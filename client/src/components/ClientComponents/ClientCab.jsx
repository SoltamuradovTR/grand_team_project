import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
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
  setEditingClient,
  uploadAvatarClient,
} from "../../redux/features/login";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClientAddRequest from "./ClientAddRequest";
import { loadAllRequests, removeRequest } from "../../redux/features/requests";
import EditingClientDialog from "./EditingClientDialog";
import { NavLink } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { PhotoCamera } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  avatarButton: {
    opacity: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "150px",
    height: "150px",
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
    background: 'rgb(251, 225, 34)',
    clipPath: 'polygon(0px 0px, 100% 35px, 100% 100%, 0px 100%)',
  },
  paper1: {
    height: 710,
    width: 500,
    marginLeft: 20
  },
  input: {
    display: "none",
  },
  root: {
    flexGrow: 1,
    display: "flex",
    marginTop: 40,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  dialog: {
    background: "rgba(250,205,0,.9)",
    clipPath: "polygon(0 35px, 100% 0, 100% 100%, 0 100%)",
    /*-webkit-clip-path: polygon(0 35px, 100% 0, 100% 100%, 0 100%);*/
    padding: "60px 25px 30px",
    height: 'auto',
    width: 'auto',
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

function ClientCab() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [clientOpen, setClientOpen] = useState(false);

  useEffect(() => {
    dispatch(loadAllRequests());
  }, [dispatch]);

  const requests = useSelector((state) => state.requests.items);
  const candidate = useSelector(selectCandidate);

  const handleClickOpenClient = () => {
    dispatch(setEditingClient());
  };

  const handleClickDeleteRequest = (id) => {
    dispatch(removeRequest(id));
  };

  function handleChangeAvatar(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatarClient(file));
  }

  return (
    <Box style={{backgroundImage: 'url("http://podarok.co.ua/land/048/design/megamotors/images/cars4.jpg")', height: 986}}>
      <Container>
        <Grid container className={classes.root} >
          <Grid style={{marginTop: 30}} container  justifyContent="center" spacing={2}>
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
                    style={{ width: 150, height: 150 }}
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
                <Box>
                  <Typography variant="h3">
                    {candidate.firstName} {candidate.lastName}
                  </Typography>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleClickOpenClient}
                  >
                    Изменить
                  </Button>
                </Box>
              </div>
              <Paper style={{height: '100%', background: 'rgb(251, 225, 34)'}}>
                <Grid container className={classes.root} spacing={2}>
                  <Grid item xs={12}>
                    <Grid container  spacing={2}>
                      <Grid item>

                        <Accordion style={{ width: '100%' }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Мои записи
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Box>
                              {requests.map((request) => {
                                if (candidate._id === request.author._id) {
                                  return (
                                    <Box
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: '54%',
                                        marginBottom: 10,
                                      }}
                                    >
                                      <Box>
                                        <NavLink to={`/request/${request._id}`}>
                                          <Typography
                                            variant="h6"
                                            style={{ width: 400 }}
                                          >
                                            {request.title}
                                          </Typography>
                                        </NavLink>
                                      </Box>
                                      <Box>
                                        <Typography variant="h6">
                                          {request.active === false
                                            ? "Завершено"
                                            : "В работе"}
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={() =>
                                            handleClickDeleteRequest(request._id)
                                          }
                                        >
                                          Удалить
                                        </Button>
                                      </Box>
                                    </Box>
                                  );
                                }
                              })}
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Paper>

            <Paper className={classes.paper1} style={{webkitClipPath: 'polygon(0 35px, 100% 0, 100% 100%, 0 100%)', background: '#fbe122' }}>
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <Grid container  spacing={2}>
                    <Grid item>
                        <ClientAddRequest candidateId={candidate._id} />
                      {/*<img src="http://podarok.co.ua/land/048/design/megamotors/images/toyota.gif" style={{marginLeft: 40, marginTop: 140}}/>*/}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>


      <EditingClientDialog
        setClientOpen={setClientOpen}
        clientOpen={clientOpen}
      />
    </Box>
  );
}

export default ClientCab;
