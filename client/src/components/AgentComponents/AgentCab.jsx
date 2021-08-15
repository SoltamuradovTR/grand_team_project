import React, { useState } from "react";
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
import { selectCandidate, setEditingAgent } from "../../redux/features/login";
import Box from "@material-ui/core/Box";
import EditingAgentDialog from "./EditingAgentDialog";
import IconButton from "@material-ui/core/IconButton";
import { PhotoCamera } from "@material-ui/icons";
import { uploadAvatar } from "../../redux/features/agent";

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
    height: 342,
    width: 600,
  },
  input: {
    display: "none",
  },
  paper1: {
    height: 700,
    width: 600,
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

function AgentCab() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [agentOpen, setAgentOpen] = useState(false);

  const candidate = useSelector(selectCandidate);

  function handleChangeAvatar(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }

  const handleClickOpenAgent = () => {
    dispatch(setEditingAgent());
  };

  return (
    <>
      <Container style={{ display: "flex" }}>
        <Grid container className={classes.root} spacing={2}>
          <Grid container justifyContent="center" spacing={2}>
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
                    <Typography variant="h6">
                      {candidate.firstName} {candidate.lastName}
                    </Typography>
                    <Typography variant="h6">
                      Город: {candidate.location}
                    </Typography>
                    <Typography variant="h6">
                      О себе: {candidate.description}
                    </Typography>
                    <Button onClick={handleClickOpenAgent}>Изменить</Button>
                  </Box>
                </div>
              </Paper>
            </Grid>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Paper style={{ height: 342 }} className={classes.paper1}>
                  <Accordion style={{ width: 600 }}>
                    <AccordionSummary
                      //expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Отзывы
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        {candidate.clients.map((client) => {
                          return (
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: 500,
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
                  </Accordion>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Paper style={{ height: 342 }} className={classes.paper1}>
                  <Accordion style={{ width: 500 }}>
                    <AccordionSummary
                      //expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        Клиенты
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        {candidate.clients.map((client) => {
                          return (
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: 500,
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
                  </Accordion>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <EditingAgentDialog />
    </>
  );
}

export default AgentCab;
