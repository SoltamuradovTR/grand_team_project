import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { useDispatch, useSelector } from "react-redux";
import { selectCandidate, setEditingAgent } from "../../redux/features/login";
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
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditingAgentDialog from "./EditingAgentDialog";
import { useParams } from "react-router-dom";
import { loadAgentById, selectAgentById } from "../../redux/features/agent";
import { loadAllReviews, selectAllReviews } from "../../redux/features/review";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 342,
    width: 600,
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

function AgentPage() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const classes = useStyles();

  const candidate = useSelector(selectCandidate);

  const agent = useSelector(selectAgentById);

  useEffect(async () => {
    await dispatch(loadAgentById(id));
  }, [dispatch]);

  useEffect(async () => {
    await dispatch(loadAllReviews(id));
  }, [dispatch]);

  const reviews = useSelector(selectAllReviews);

  const client = agent.map((item) => {
    return item.clients.find((elem) => {
      return candidate._id === elem._id;
    });
  });

  return (
    <>
      <Container style={{ display: "flex" }}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
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
                        style={{ width: 150, height: 150 }}
                      />
                    </StyledBadge>
                    <Box>
                      {agent.map((elem) => {
                        return (
                          <>
                            <Typography variant="h6">
                              Имя: {elem.firstName}
                            </Typography>
                            <Typography variant="h6">
                              Фамилия: {elem.lastName}
                            </Typography>
                            <Typography variant="h6">
                              Город: {elem.location}
                            </Typography>
                            {client[0] === undefined ? (
                              <Typography variant="h6">
                                Чтобы увидеть контактную информацию, вам нужно
                                быть киентом
                              </Typography>
                            ) : (
                              <>
                                <Typography variant="h6">
                                  Телефон: {elem.phone}
                                </Typography>
                                <Typography variant="h6">
                                  Почта: {elem.email}
                                </Typography>
                              </>
                            )}
                          </>
                        );
                      })}
                    </Box>
                  </div>
                </Paper>
              </Grid>
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item>
                      <Paper className={classes.paper}>
                        <Accordion style={{ width: 600 }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography className={classes.heading}>
                              Отзывы
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {reviews.map((review) => {
                              return (
                                <div
                                  className="container"
                                  style={{
                                    width: "100%",
                                    border: "2px solid #ccc",
                                    backgroundColor: "#eee",
                                    borderRadius: 5,
                                    padding: 16,
                                    margin: "16px auto",
                                  }}
                                >
                                  <p>
                                    <span
                                      style={{ fontSize: 18, marginRight: 15 }}
                                    >
                                      {review.author.firstName}{" "}
                                      {review.author.lastName}
                                    </span>{" "}
                                    {review.author.location}
                                  </p>
                                  <p>{review.text}</p>
                                </div>
                              );
                            })}
                          </AccordionDetails>
                        </Accordion>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Paper className={classes.paper1}>
                  <Typography variant="h6">Клиенты</Typography>
                  {agent.map((elem) => {
                    return (
                      <>
                        {elem.clients.map((client) => {
                          return (
                            <Typography>
                              {client.firstName} {client.lastName}
                            </Typography>
                          );
                        })}
                      </>
                    );
                  })}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AgentPage;
