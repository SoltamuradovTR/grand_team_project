import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCandidate, setEditingClient } from "../../redux/features/login";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClientAddRequest from "./ClientAddRequest";
import requests, {
  loadAllRequests,
  removeRequest,
  selectAllRequests,
} from "../../redux/features/requests";
import EditingClientDialog from "./EditingClientDialog";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 342,
    width: 900,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
  },
  paper1: {
    height: 700,
    width: 500,
  },
  root: {
    flexGrow: 1,
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
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

  return (
    <>
      <Container>
        <Grid container className={classes.root} spacing={2}>
          <Grid container justifyContent="center" spacing={2}>
            <Paper className={classes.paper}>
              <div className={classes.root}>
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
                    src="https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
                    style={{
                      width: 200,
                      height: 200,
                      backgroundColor: "white",
                    }}
                  />
                </StyledBadge>
                <Box>
                  <Typography variant="h3">
                    {candidate.firstName} {candidate.lastName}
                  </Typography>
                  <Typography variant="h6">
                    О себе: Lorem ipsum.Lorem ipsum.Lorem ipsum.Lorem
                    ipsum.Lorem ipsum.Lorem ipsum.Lorem ipsum.Lorem ipsum.Lorem
                    ipsum
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
            </Paper>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item>
                    <Paper className={classes.paper}>
                      <ClientAddRequest candidateId={candidate._id} />
                      <Accordion style={{ width: 900 }}>
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
                                      width: 860,
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
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <EditingClientDialog
        setClientOpen={setClientOpen}
        clientOpen={clientOpen}
      />
    </>
  );
}

export default ClientCab;
