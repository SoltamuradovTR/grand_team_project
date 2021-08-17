import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { useDispatch, useSelector } from "react-redux";
import { selectCandidate, } from "../../redux/features/login";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClientAddReviewToAgent from '../ClientComponents/ClientAddReviewToAgent';
import { useParams } from "react-router-dom";
import { loadAgentById, selectAgentById } from "../../redux/features/agent";
import { loadAllReviews, selectAllReviews } from "../../redux/features/review";

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

                    <Box>
                      {agent.map((elem) => {
                        return (
                          <div>
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
                                src={elem.avatar}
                                style={{ width: 150, height: 150 }}
                              />
                            </StyledBadge>

                          <Typography style={{marginTop: 45}} variant="h3">
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
                          </Typography>
                          </div>
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
                        {client[0] === undefined ? (
                            <Typography variant="h6">
                              Чтобы добавить отзыв вам нужно быть клиентом
                            </Typography>
                          ) :
                        <ClientAddReviewToAgent agentId={id}/> }
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






//<Grid container className={classes.root} spacing={2}>
//                 <Grid item xs={12}>
//                   <Grid container justifyContent="center" spacing={2}>
//                     <Grid item>
//                       <Paper className={classes.paper}>
//                         {client[0] === undefined ? (
//                             <Typography variant="h6">
//                               Чтобы добавить отзыв вам нужно быть клиентом
//                             </Typography>
//                           ) :
//                         <ClientAddReviewToAgent agentId={id}/> }
//                         <Accordion style={{ width: 600 }}>
//                           <AccordionSummary
//                             expandIcon={<ExpandMoreIcon />}
//                             aria-controls="panel1a-content"
//                             id="panel1a-header"
//                           >
//                             <Typography className={classes.heading}>
//                               Отзывы
//                             </Typography>
//                           </AccordionSummary>
//                           <AccordionDetails>
//                             {reviews.map((review) => {
//                               return (
//                                 <div
//                                   className="container"
//                                   style={{
//                                     width: "100%",
//                                     border: "2px solid #ccc",
//                                     backgroundColor: "#eee",
//                                     borderRadius: 5,
//                                     padding: 16,
//                                     margin: "16px auto",
//                                   }}
//                                 >
//                                   <p>
//                                     <span
//                                       style={{ fontSize: 18, marginRight: 15 }}
//                                     >
//                                       {review.author.firstName}{" "}
//                                       {review.author.lastName}
//                                     </span>{" "}
//                                     {review.author.location}
//                                   </p>
//                                   <p>{review.text}</p>
//                                 </div>
//                               );
//                             })}
//                           </AccordionDetails>
//                         </Accordion>
//                       </Paper>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>