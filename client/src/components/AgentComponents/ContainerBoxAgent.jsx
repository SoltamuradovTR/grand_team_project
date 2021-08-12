import React, { useEffect } from "react";
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Container, } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {
  addAppraiser,
  loadAllRequests,
  selectAllRequests,
} from "../../redux/features/requests";
import { NavLink } from "react-router-dom";
import { selectCandidate } from "../../redux/features/login";

const useStyles = makeStyles( {
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  respond: {
    backgroundColor: "white", color: 'black',
      marginBottom: 12,
  },
});


function ContainerBox(props) {
  const dispatch = useDispatch();

  const requests = useSelector(selectAllRequests);
  const candidate = useSelector(selectCandidate);

  useEffect(() => {
    dispatch(loadAllRequests());
  }, [dispatch]);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleAddAppraiser = (request, agent) => {
    dispatch(addAppraiser(request, agent));
  };

  return (
    <>
      <Container
        style={{
          justifyContent: "space-around",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {requests.map((request) => {
          return (
            <Card
              variant="outlined"
              id="card"
              className={classes.root}
              style={{ marginBottom: 25, width: 600 }}
            >
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {request.location}
                </Typography>
                <Typography variant="h5" component="h2" className={classes.pos}>
                  {request.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {request.author.firstName} {request.author.lastName}
                </Typography>
                <Typography variant="body2" component="p">
                  {request.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" size="small" className={classes.pos}>
                  <NavLink to={`request/${request._id}`}>Подробнее</NavLink>
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddAppraiser(request._id, candidate._id)}
                  size="small"
                  className={classes.respond}
                >
                  Откликнуться
                  <PersonAddIcon fontSize="small" />
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default ContainerBox;
