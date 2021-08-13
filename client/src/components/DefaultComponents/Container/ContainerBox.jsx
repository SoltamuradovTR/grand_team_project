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
      <div data-vc-full-width="true" data-vc-full-width-init="true" data-vc-stretch-content="true"
           className="vc_row wpb_row vc_row-fluid vc_row-no-padding"
           style={{position: 'relative', left: 15, boxSizing: 'border-box', width: 1903}}>
        <div className="wpb_column vc_column_container vc_col-sm-12">
          <div className="vc_column-inner">
            <div className="wpb_wrapper">
              <div className="page-heading">
                <div className="breadcrumbs">
                  <div className="container">
                    <div className="row">
                      <div className="col-xs-12">
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page-title"><h2>Vehicle Grid</h2></div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  );
}

export default ContainerBox;
