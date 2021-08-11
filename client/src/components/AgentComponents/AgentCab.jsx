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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditingAgentDialog from "./EditingAgentDialog";

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

function AgentCab() {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  const [agentOpen, setAgentOpen] = useState(false);

  const candidate = useSelector(selectCandidate);

  const handleClickOpenAgent = (agent) => {
    dispatch(setEditingAgent(agent));
  };

  return (
    <>
      <Container style={{ display: "flex" }}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={spacing}>
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
                      <Typography variant="h6">
                        Имя: {candidate.firstName}
                      </Typography>
                      <Typography variant="h6">
                        Фамилия: {candidate.lastName}
                      </Typography>
                      <Typography variant="h6">
                        Город: {candidate.location}
                      </Typography>
                      <Button onClick={() => handleClickOpenAgent(candidate)}>
                        Изменить
                      </Button>
                    </Box>
                  </div>
                </Paper>
              </Grid>
              <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" spacing={spacing}>
                    <Grid item>
                      <Paper className={classes.paper}>
                        <Typography variant="h6">Отзывы</Typography>
                        <Box>
                          <Typography variant="h6">Name</Typography>
                          <Typography>
                            description.description.description.description
                          </Typography>
                          <Typography>12.07.2021 10:10</Typography>
                        </Box>
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
            <Grid container justifyContent="center" spacing={spacing}>
              <Grid item>
                <Paper className={classes.paper1}>
                  <Typography variant="h6">Личные данные</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Accordion style={{ marginLeft: 32, width: 1143 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
            <img
              src="https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg"
              alt="avatar"
              style={{
                float: "left",
                marginRight: 20,
                borderRadius: "50%",
                width: 90,
              }}
            />
            <p>
              <span style={{ fontSize: 18, marginRight: 15 }}>
                Марина Белова
              </span>{" "}
              г. Москва
            </p>
            <p>Качество товара отличное, доставка быстрая.</p>
          </div>
        </AccordionDetails>
      </Accordion>
      <EditingAgentDialog setAgentOpen={setAgentOpen} agentOpen={agentOpen} />
    </>
  );
}

export default AgentCab;
