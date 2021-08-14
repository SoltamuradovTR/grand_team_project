import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, CardActionArea, CardMedia, Container } from "@material-ui/core";
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
      <Box data-vc-full-width="true" data-vc-full-width-init="true" data-vc-stretch-content="true"
           className="vc_row wpb_row vc_row-fluid vc_row-no-padding"
           style={{position: 'relative', left: 15, boxSizing: 'border-box', width: '100%'}}>
        <Box className="wpb_column vc_column_container vc_col-sm-12">
          <Box className="vc_column-inner">
            <Box className="wpb_wrapper">
              <Box className="page-heading">
                <Box className="breadcrumbs">
                  <Box className="container">
                    <Box className="row">
                      <Box className="col-xs-12">
                        <ul>
                          <li>
                            <NavLink to={'/'} title="Home"
                                 rel="bookmark">
                              Home
                            </NavLink>
                            <span> › </span>
                          </li>
                          <li><a className="text-white">Vehicle Grid</a></li>
                        </ul>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className="page-title">
                  <h2>Vehicle Grid</h2>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="container">
        <Box className="vc_row wpb_row vc_row-fluid vc_custom_1558437112558">
          <Box className="wpb_column vc_column_container vc_col-sm-9">
            <Box className="vc_column-inner">
              <Box className="wpb_wrapper">
                <Box className="product-grid klb-vehicle">
                  <Box className="pro-coloumn">
                    <article className="col-main">
                      <Box className="category-products">
                        <ul className="products-grid">
                          <li className="item col-md-4 col-sm-4 col-xs-6">
                            <Box className="item-inner" style={{display: 'flex'}}>
                              {requests.map((request) => {
                                return (
                                  <Card style={{width: 305}}>
                                    <CardActionArea>
                                      <CardMedia
                                        image="https://klbtheme.com/harrier/wp-content/uploads/2018/09/p1.jpg"
                                        title="Contemplative Reptile"
                                        className="scale"
                                      />
                                      <div className="item-box-hover">
                                        <div className="box-inner">
                                          <div className="product-detail-bnt"><a
                                            href="https://klbtheme.com/harrier/vehicle/mercedes-benz-m-class/"
                                            className="button detail-bnt link-detail"><span></span></a>
                                          </div>
                                          <div className="product-detail-bnt"><a
                                            className="button detail-bnt ajax" id="785"><span></span></a>
                                          </div>
                                        </div>
                                      </div>
                                      <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                          <h3>{request.title}</h3>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                          across all continents except Antarctica
                                        </Typography>
                                      </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                      <Button
                                        onClick={() => (request._id)}
                                        size="small"
                                        className={classes.pos}
                                      >
                                        <NavLink to={`request/${request._id}`}>Подробнее</NavLink>
                                      </Button>
                                    </CardActions>
                                  </Card>
                                )
                              })}
                            </Box>
                          </li>
                        </ul>
                      </Box>
                    </article>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

    </>
  );
}

export default ContainerBox;
