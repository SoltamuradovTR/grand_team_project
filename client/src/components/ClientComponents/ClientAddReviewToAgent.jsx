import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { selectCandidate } from "../../redux/features/login";
import { addReview } from "../../redux/features/review";

function ClientAddReviewToAgent({ agentId }) {
  const dispatch = useDispatch();

  const candidate = useSelector(selectCandidate);

  const [text, setText] = useState("");
  const [author, setAuthor] = useState(candidate._id);

  const handleAddText = (e) => {
    setText(e.target.value);
  };

  const handleClickAddReview = () => {
    dispatch(addReview({ text, author }, agentId));
  };
  return (
    <>
      <Accordion style={{ width: 600 }}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography style={{ margin: "auto" }}>Добавить отзыв</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography>Добавить отзыв</Typography>
            <TextField
              style={{
                width: 565,
                height: 100,
              }}
              value={text}
              onChange={handleAddText}
            />
            <Button
              variant="contained"
              style={{
                width: "100%",
                color: "black",
                background: "#fbe122",
              }}
              onClick={handleClickAddReview}
            >
              Добавить отзыв
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default ClientAddReviewToAgent;
