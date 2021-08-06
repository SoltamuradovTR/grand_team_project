import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllRequests, selectAllRequests } from '../../../redux/features/requests';



const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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

  const requests = useSelector(selectAllRequests)

  useEffect(() => {
    dispatch(loadAllRequests())
  }, [dispatch])
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <>
      <Container  style={{justifyContent: 'space-around', display: 'flex', flexWrap: "wrap" }}>
        {requests.map((request) => {
          return(
            <Card id="card" className={classes.root} style={{marginBottom: 25, width: 600}}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {request.location}
                </Typography>
                <Typography variant="h5" component="h2" className={classes.pos}>
                  {request.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {request.author.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {request.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" className={classes.pos}>Learn More</Button>
              </CardActions>
            </Card>
          )
        })}

      </Container>
    </>
  );
}

export default ContainerBox;