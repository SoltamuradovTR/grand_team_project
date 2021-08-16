import React, { useEffect } from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  editActiveRequest,
  loadRequestById,
  selectAllRequests,
  selectRequestById,
} from "../../redux/features/requests";
import { NavLink, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { selectCandidate } from "../../redux/features/login";
import { addClientsToAgent } from "../../redux/features/agent";

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

  const candidate = useSelector(selectCandidate);

  useEffect(() => dispatch(loadRequestById(id)), [dispatch]);

  const handleApply = async (client, agent, request) => {
    await dispatch(addClientsToAgent(client, agent));

    dispatch(editActiveRequest(request));
  };

  const classes = useStyles();
  return (
    <Container
      style={{
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, .8)",
        backdropFilter: "blur(15px)",
      }}
    >
      {request.map((item) => {
        return (
          <Card
            className={classes.root}
            style={{
              marginBottom: 25,
              width: 1200,
              background: "none",
              color: "white",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.title}>
                {item.title}
              </Typography>
              <Box>
                <Typography variant="body2" component="p">
                  {item.description}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Автор: {item.author.firstName} {item.author.lastName}
                </Typography>
                <Typography>
                  <a href={item.source} target="_blank">
                    Ссылка на объявление
                  </a>
                </Typography>
                <Typography>{item.location}</Typography>
              </Box>
              <Box>
                {candidate.login === item.author?.login ? (
                  <>
                    <Box
                      style={{
                        textAlign: "center",
                        fontSize: 25,
                        color: "red",
                      }}
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
                            <Box>
                              <Box
                                style={{
                                  display: "flex",
                                  border: "1px solid white",
                                  borderRadius: 5,
                                  marginBottom: 10,
                                  width: 600,
                                  marginLeft: 550,
                                }}
                              >
                                <Box
                                  style={{
                                    padding: 10,
                                    margin: 5,
                                    borderRadius: 5,
                                    textAlign: "center",
                                  }}
                                >
                                  <Typography>
                                    {elem.firstName} {elem.lastName}
                                  </Typography>
                                  <Typography>
                                    Город: {elem.location}
                                  </Typography>
                                </Box>
                                <Box style={{ marginTop: 20 }}>
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{ marginRight: 10, marginLeft: 70 }}
                                  >
                                    <NavLink to={`/agent/${elem._id}`}>
                                      Об оценщике
                                    </NavLink>
                                  </Button>
                                  {item.active? <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() =>
                                      handleApply(
                                        candidate._id,
                                        elem._id,
                                        item._id
                                      )
                                    }
                                  >
                                    Подтвердить
                                  </Button> : null}
                                </Box>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </>
                ) : null}
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
