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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave';

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

<Container style={{marginTop: 40}}>
<Box className="item-inner" style={{display: 'flex', justifyContent: 'space-between'}}>
  {requests.map((request) => {
    return (
      <Card className="box-1" style={{width: '100%'}}>
        <CardActionArea>
          <CardMedia
            image="https://klbtheme.com/harrier/wp-content/uploads/2018/09/p1.jpg"
            title="Contemplative Reptile"
            className="scale"
          >
              <div id="diamond">
                <a href={request.source}>
                <TimeToLeaveIcon style={{transform: 'rotate(46deg)', marginLeft: 3, marginTop: 3, color: 'black'}} />
                </a>
              </div>
          </CardMedia>

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" >
              <h3 style={{textAlign: 'center'}}>{request.title}</h3>
            </Typography>
            <div className="klb-seperator"></div>
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
</Container>


    </>
  );
}

export default ContainerBox;
