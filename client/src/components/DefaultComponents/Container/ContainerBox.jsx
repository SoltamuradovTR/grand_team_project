import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, CardMedia, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllRequests,
  selectAllRequests,
} from "../../../redux/features/requests";
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
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
});

function ContainerBox(props) {
  const dispatch = useDispatch();

  const requests = useSelector(selectAllRequests);

  useEffect(() => {
    dispatch(loadAllRequests());
  }, [dispatch]);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      <Container
        style={{
          justifyContent: "space-around",
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "rgba(0, 0, 0, .6)",
          backdropFilter: "blur(10px)",
          height: 800,
          marginTop: 60
        }}
      >
        {requests.map((request) => {
          return (
            <Box className="container" style={{minWidth: 275, width: 600, borderRadius: 15,  height: 415}}>
              <Box className="card">
                <Box className="face face1">
                  <Box className="content">
                    <h3>{request.title}</h3>
                  </Box>
                </Box>
                <Box className="face face2">
                  <Box className="content">
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                        style={{marginTop: 25, display: 'flex'}}
                      >
                        Город: {request.location}
                      </Typography>
                      <Typography color="textSecondary">
                        {request.author.firstName} {request.author.lastName}
                      </Typography>
                      <Typography variant="body2" component="p">
                        {request.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        className={classes.pos}
                      >
                        Подробнее
                      </Button>
                    </CardActions>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Container>
    </>
  );
}

export default ContainerBox;
