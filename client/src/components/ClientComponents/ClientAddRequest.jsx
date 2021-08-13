import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { addRequest } from "../../redux/features/requests";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({}));

function ClientAddRequest({ candidateId }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState(candidateId);

  const handleAddTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleAddDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleAddSource = (e) => {
    setSource(e.target.value);
  };
  const handleAddLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleClickAddRequest = () => {
    dispatch(
      addRequest({ title, description, source, author, location }, candidateId)
    );
  };
  return (
    <>
      <Accordion style={{ width: 900 }}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={{ margin: "auto" }}>Добавить запись</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography>Добавить заголовок</Typography>
            <TextField
              style={{
                width: 860,
                height: 100,
              }}
              value={title}
              onChange={handleAddTitle}
            />
            <Typography
              style={{
                height: 55,
              }}
            >
              Добавить описание
            </Typography>
            <TextareaAutosize
              style={{
                width: 860,
                height: 100,
              }}
              value={description}
              onChange={handleAddDescription}
            />
            <Typography
              style={{
                marginTop: 55,
              }}
            >
              Оставить ссылку
            </Typography>
            <TextField
              style={{
                width: 860,
                height: 100,
              }}
              value={source}
              onChange={handleAddSource}
            />
            <Typography>Местонахождение</Typography>
            <TextField
              style={{
                width: 860,
                height: 100,
              }}
              value={location}
              onChange={handleAddLocation}
            />
            <Button
              variant="contained"
              style={{
                width: 860,
                color: "green",
              }}
              onClick={handleClickAddRequest}
            >
              Добавить запись
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default ClientAddRequest;
