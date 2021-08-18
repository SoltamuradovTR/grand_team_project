import React, { useEffect } from "react";
import { Box, CircularProgress, Container, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  addAppraiser,
  loadRequestById,
  selectAllRequests, selectLoadingRequests,
  selectRequestById,
} from "../../redux/features/requests";
import { NavLink, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from '@material-ui/core/Button';
import { selectCandidate } from '../../redux/features/login';

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

function AgentRequest() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const request = useSelector(selectRequestById);
  const candidate = useSelector(selectCandidate);
  const loading = useSelector(selectLoadingRequests)

  useEffect(() => dispatch(loadRequestById(id)), [dispatch]);
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
    )
  }

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
                  <a href={item.source}>Ссылка на объявление</a>
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
                <Button
                  variant="contained"
                  style={{ background: "#fbe122", width: "20%" }}
                  onClick={() => handleAddAppraiser(item._id, candidate._id)}
                  size="small"
                >
                  Откликнуться
                  <PersonAddIcon fontSize="small" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Container>
    </>
  );
}

export default AgentRequest;
