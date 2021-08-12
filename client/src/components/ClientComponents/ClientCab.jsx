import React from "react";
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
import { useSelector } from "react-redux";
import { selectCandidate } from "../../redux/features/login";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  const [spacing, setSpacing] = React.useState(2);

  const candidate = useSelector(selectCandidate);
  return (
    <>
      <Container>
        <Grid container className={classes.root} spacing={2}>
          <Grid container justifyContent="center" spacing={spacing}>
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
                    ФИО: {candidate.firstName} {candidate.lastName}
                  </Typography>
                  <Typography variant="h6">
                    О себе: Lorem ipsum.Lorem ipsum.Lorem ipsum.Lorem
                    ipsum.Lorem ipsum.Lorem ipsum.Lorem ipsum.Lorem ipsum.Lorem
                    ipsum
                  </Typography>
                  <Button color="primary" variant="outlined">
                    Изменить
                  </Button>
                </Box>
              </div>
            </Paper>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={spacing}>
                  <Grid item>
                    <Paper className={classes.paper}>
                      <Accordion style={{ width: 900 }}>
                        <AccordionSummary
                          //expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography
                            style={{ margin: "auto" }}
                            className={classes.heading}
                          >
                            Добавить запись
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box>
                            <Typography>Добавить заголовок</Typography>
                            <TextField
                              style={{
                                width: 860,
                                height: 100,
                              }}
                              label="Ввести заголовок"
                            />
                            <Typography>Добавить описание</Typography>
                            <TextareaAutosize
                              style={{
                                width: 860,
                                height: 100,
                              }}
                              aria-label="Заполнить описание"
                            />
                          </Box>
                        </AccordionDetails>
                      </Accordion>
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
                            <Box>Запись 1</Box>
                            <Box>Запись 2</Box>
                            <Box>Запись 3</Box>
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
    </>
  );
}

export default ClientCab;
