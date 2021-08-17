import React, { useEffect } from "react";
import {
  createTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardMedia, CircularProgress, Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import {
  addAppraiser,
  loadAllRequests,
  selectAllRequests, selectLoadingRequests,
} from "../../redux/features/requests";
import { NavLink } from "react-router-dom";
import { selectCandidate } from "../../redux/features/login";
import Box from "@material-ui/core/Box";

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
  respond: {
    backgroundColor: "white",
    color: "black",
    marginBottom: 12,
  },
});

function ContainerBox() {
  const dispatch = useDispatch();
  const requests = useSelector(selectAllRequests);
  const candidate = useSelector(selectCandidate);
  const loading = useSelector(selectLoadingRequests);

  useEffect(() => {
    dispatch(loadAllRequests());
  }, [dispatch]);
  const classes = useStyles();

  const handleAddAppraiser = (request, agent) => {
    dispatch(addAppraiser(request, agent));
  };

  if (loading) {
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
            <Box>
              <h2
                style={{
                  fontFamily: "Saira Condensed', sans-serif",
                  fontSize: 46,
                  textTransform: "uppercase",
                  margin: 5,
                  color: "#fff",
                }}
              >
                ВАША УВЕРЕННОСТЬ В НАШИХ РУКАХ
              </h2>
            </Box>
          </Box>
        </Box>
        <Box style={{ textAlign: "center", marginTop: "10%" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

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

      <Container
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
            <Card className="box-1" style={{ width: "33%", marginBottom: 40 }}>
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
              <CardActions>
                {request.active ?
                <Button
                  variant="contained"
                  style={{ background: "#fbe122", width: "100%" }}
                  onClick={() => handleAddAppraiser(request._id, candidate._id)}
                  size="small"
                >
                  Откликнуться
                  <PersonAddIcon fontSize="small" />
                </Button> : <Button
                    variant="contained"
                    style={{ background: "#45db45", width: "100%" }}
                    size="small"
                  >
                    Завершено
                  </Button>}
              </CardActions>
            </Card>

            // <Box
            //   className="container"
            //   style={{
            //     minWidth: 275,
            //     width: 600,
            //     borderRadius: 15,
            //     height: 415,
            //   }}
            // >
            //   <Box className="card">
            //     <Box className="face face1">
            //       <Box className="content">
            //         <h3>{request.title}</h3>
            //       </Box>
            //     </Box>
            //     <Box className="face face2">
            //       <Box className="content">
            //         <CardContent>
            //           <Typography
            //             className={classes.title}
            //             color="textSecondary"
            //             gutterBottom
            //             style={{ marginTop: 25, display: "flex" }}
            //           >
            //             Город: {request.location}
            //           </Typography>
            //           <Typography color="textSecondary">
            //             {request.author.firstName} {request.author.lastName}
            //           </Typography>
            //           <Typography variant="body2" component="p">
            //             {request.description}
            //           </Typography>
            //         </CardContent>
            //         <CardActions>
            //           <Button>
            //             <NavLink to={`request/${request._id}`}>
            //               Подробнее
            //             </NavLink>
            //           </Button>
            //           <Button
            //             variant="contained"
            //             color="primary"
            //             onClick={() =>
            //               handleAddAppraiser(request._id, candidate._id)
            //             }
            //             size="small"
            //           >
            //             Откликнуться
            //             <PersonAddIcon fontSize="small" />
            //           </Button>
            //         </CardActions>
            //       </Box>
            //     </Box>
            //   </Box>
            // </Box>
          );
        })}
      </Container>
    </>
  );
}

export default ContainerBox;
