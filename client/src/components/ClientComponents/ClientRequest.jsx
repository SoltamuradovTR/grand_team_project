import React, { useEffect } from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRequestById,
  selectAllRequests,
  selectRequestById,
} from "../../redux/features/requests";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
    fontSize: 50,
    marginBottom: 12,
    textAlign: "center",
  },
  pos: {
    marginBottom: 12,
  },
});

function ClientRequest() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const request = useSelector(selectRequestById);

  useEffect(() => dispatch(loadRequestById(id)), [dispatch]);

  const classes = useStyles();
  return (
    <Container style={{ display: 'flex'}}>
      {request.map((item) => {
        return (
          <Card
            id="card"
            className={classes.root}
            style={{ marginBottom: 25, width: 1200, }}
          >
            <CardContent>

              <Typography variant="h5" component="h2" className={classes.title}>
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

              <Box>
                <Box
                  style={{ textAlign: "center", fontSize: 25, color: "red" }}
                >
                  Откликнувшиеся оценщики:
                </Box>
                <Box
                  style={{
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 20,
                  }}
                >
                  <Box
                    style={{
                      justifyContent: "flex-start",
                    }}
                  >
                    {item.appraisers.map((elem) => {
                      return (
                        <Box style={{display: 'flex', border: '1px solid black', borderRadius: 5, marginBottom: 10}}>
                          <Box
                            style={{
                              padding: 10,
                              margin: 5,
                              borderRadius: 5,
                              textAlign: "center",
                            }}
                          >
                            <Typography>{elem.firstName} {elem.lastName}</Typography>
                            <Typography>Город: {elem.location}</Typography>
                          </Box>
                            <Box style={{marginTop: 20}}>
                              <Button variant="outlined" color="primary" style={{marginRight: 10}}>
                                Об оценщике
                              </Button>
                              <Button variant="outlined" color="primary">
                                Подтвердить
                              </Button>
                            </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
              <Typography>Дата создания записи: {item.createdAt}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
}

export default ClientRequest;
