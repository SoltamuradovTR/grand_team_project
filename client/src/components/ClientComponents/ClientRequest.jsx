import React, { useEffect } from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRequestById,
  selectAllRequests,
  selectRequestById,
} from "../../redux/features/requests";
import { useParams } from "react-router-dom";

function ClientRequest() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const request = useSelector(selectRequestById);

  useEffect(() => dispatch(loadRequestById(id)), [dispatch]);

  return (
    <Container>
      {request.map((item) => {
        return (
          <>
            <Typography variant="h6">{item.title}</Typography>
            <Box>{item.description}</Box>
          </>
        );
      })}
    </Container>
  );
}

export default ClientRequest;
