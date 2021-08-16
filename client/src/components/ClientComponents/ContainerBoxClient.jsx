import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllRequests,
  selectAllRequests,
} from "../../redux/features/requests";
import { NavLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import TimeToLeaveIcon from "@material-ui/icons/TimeToLeave";

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
  imageCar: {
    padding: "168px 0 70px 0",
    backgroundSize: "cover",
    borderBottom: "none",
    textAlign: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage:
      "url(//klbtheme.com/harrier/wp-content/themes/harrier/images/category-bg.jpg)",
    boxSizing: "revert",
    backgroundPosition: "bottom",
  },
});

function ContainerBoxClient() {
  const dispatch = useDispatch();
  const requests = useSelector(selectAllRequests);
  const classes = useStyles();

  useEffect(() => {
    dispatch(loadAllRequests());
  }, [dispatch]);

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
          <Box style={{ marginTop: -150 }}>
            <h2
              style={{
                fontFamily: "Saira Condensed', sans-serif",
                fontSize: 46,
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              ВАША УВЕРЕННОСТЬ В НАШИХ РУКАХ
            </h2>
          </Box>
        </Box>
      </Box>

      <Container>
        <Box
          className="item-inner"
          style={{
            justifyContent: "space-around",
            flexWrap: "wrap",
            display: "flex",
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          {requests.map((request) => {
            return (
              <Card
                className="box-1"
                style={{ width: "33%", marginBottom: 40 }}
              >
                <CardActionArea>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    to={`request/${request._id}`}
                  >
                    <CardMedia className="scale">
                      <Typography
                        style={{
                          textAlign: "center",
                          width: 250,
                          margin: "auto",
                          paddingTop: 40,
                          color: "white",
                          fontSize: 21,
                        }}
                      >
                        {request.title}
                      </Typography>
                    </CardMedia>
                  </NavLink>
                  <CardContent>
                    <Typography
                      gutterBottom
                      component="h2"
                      style={{ height: 30 }}
                    >
                      <h3 style={{ textAlign: "center" }}>
                        Автор: {request.author.firstName}{" "}
                        {request.author.lastName}
                      </h3>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography style={{ margin: "auto" }}>
                    {request.location}
                  </Typography>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Container>
    </>
  );
}

export default ContainerBoxClient;
