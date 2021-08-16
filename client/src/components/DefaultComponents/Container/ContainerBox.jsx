import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  CardActionArea,
  CardMedia,
  CircularProgress,
  Container,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllRequests,
  selectAllRequests,
  selectLoadingRequests,
} from "../../../redux/features/requests";
import { NavLink } from "react-router-dom";
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

function ContainerBox() {
  const dispatch = useDispatch();

  const requests = useSelector(selectAllRequests);

  const loading = useSelector(selectLoadingRequests);

  const classes = useStyles();

  useEffect(async () => {
    await dispatch(loadAllRequests());
  }, [dispatch]);

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
            <Box style={{ marginTop: -90 }}>
              <NavLink
                to="/"
                style={{ color: "#fff", fontSize: 12, textDecoration: "none" }}
              >
                Home › Vehicle Grid
              </NavLink>
            </Box>
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
                Vehicle Grid
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
          <Box style={{ marginTop: -90 }}>
            <NavLink
              to="/"
              style={{ color: "#fff", fontSize: 12, textDecoration: "none" }}
            >
              Home › Vehicle Grid
            </NavLink>
          </Box>
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
              Vehicle Grid
            </h2>
          </Box>
        </Box>
      </Box>
      <Container>
        <Box
          className="item-inner"
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: 40,
          }}
        >
          {requests.map((request) => {
            return (
              <Card className="box-1" style={{ width: "33%" }}>
                <CardActionArea>
                  <CardMedia
                    image="https://klbtheme.com/harrier/wp-content/uploads/2018/09/p1.jpg"
                    title="Contemplative Reptile"
                    className="scale"
                  >
                    <div id="diamond">
                      <a href={request.source}>
                        <TimeToLeaveIcon
                          style={{
                            transform: "rotate(46deg)",
                            marginLeft: 3,
                            marginTop: 3,
                            color: "black",
                          }}
                        />
                      </a>
                    </div>
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      <h3 style={{ textAlign: "center" }}>{request.title}</h3>
                    </Typography>
                    <div className="klb-seperator"></div>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={() => request._id}
                    size="small"
                    className={classes.pos}
                  >
                    <NavLink to={`request/${request._id}`}>Подробнее</NavLink>
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Box>
      </Container>
    </>
  );
}

export default ContainerBox;

{
  /*<Box*/
}
{
  /*  data-vc-full-width="true"*/
}
{
  /*  data-vc-full-width-init="true"*/
}
{
  /*  data-vc-stretch-content="true"*/
}
{
  /*  className="vc_row wpb_row vc_row-fluid vc_row-no-padding"*/
}
{
  /*  style={{*/
}
{
  /*    position: "relative",*/
}
{
  /*    left: 15,*/
}
{
  /*    boxSizing: "border-box",*/
}
{
  /*    width: "100%",*/
}
{
  /*  }}*/
}
{
  /*>*/
}
{
  /*  <Box className="wpb_column vc_column_container vc_col-sm-12">*/
}
{
  /*    <Box className="vc_column-inner">*/
}
{
  /*      <Box className="wpb_wrapper">*/
}
{
  /*        <Box className="page-heading">*/
}
{
  /*          <Box className="breadcrumbs">*/
}
{
  /*            <Box className="container">*/
}
{
  /*              <Box className="row">*/
}
{
  /*                <Box className="col-xs-12">*/
}
{
  /*                  <ul>*/
}
{
  /*                    <li>*/
}
{
  /*                      <NavLink to={"/"} title="Home" rel="bookmark">*/
}
{
  /*                        Home*/
}
{
  /*                      </NavLink>*/
}
{
  /*                      <span> › </span>*/
}
{
  /*                    </li>*/
}
{
  /*                    <li>*/
}
{
  /*                      <a className="text-white">Vehicle Grid</a>*/
}
{
  /*                    </li>*/
}
{
  /*                  </ul>*/
}
{
  /*                </Box>*/
}
{
  /*              </Box>*/
}
{
  /*            </Box>*/
}
{
  /*          </Box>*/
}
{
  /*          <Box className="page-title">*/
}
{
  /*            <h2>Vehicle Grid</h2>*/
}
{
  /*          </Box>*/
}
{
  /*        </Box>*/
}
{
  /*      </Box>*/
}
{
  /*    </Box>*/
}
{
  /*  </Box>*/
}
{
  /*</Box>*/
}
