import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadRequestById, selectRequestById } from '../../../redux/features/requests';
import { Box, Container, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

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
  appraisers: {
    color: "red",
  },
});

function DefaultRequest(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const request = useSelector(selectRequestById);

  useEffect(() => dispatch(loadRequestById(id)), [dispatch]);
  const classes = useStyles();
  return (
    <>
      <Container>
        {request.map((item) => {
          return (
            <Card
              id="card"
              className={classes.root}
              style={{ marginBottom: 25, width: 1200 }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" className={classes.pos}>
                  {item.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {item.description}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Автор: {item.author.firstName} {item.author.lastName}
                </Typography>
                <Typography>
                  <a href={item.source}>Местоположение</a>
                </Typography>
                <Typography>{item.location}</Typography>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography>Количество откликнувшихся оценщиков:</Typography>
                  <Typography className={classes.appraisers}>
                    {item.appraisers.length}
                  </Typography>
                </Box>

                <Typography>Дата создания записи: {item.createdAt}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default DefaultRequest;
