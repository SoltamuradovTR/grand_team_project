import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  closeEditingDialog,
  editAgent,
  selectEditingAgent,
  setFormFields,
} from "../../redux/features/login";

function EditingAgentDialog({ setAgentOpen, agentOpen }) {
  const dispatch = useDispatch();

  const editingAgent = useSelector(selectEditingAgent);

  const handleClose = () => {
    dispatch(closeEditingDialog());
  };

  const handleEdit = (e) => {
    dispatch(setFormFields(e));
  };

  const handleSave = () => {
    dispatch(editAgent());
    handleClose()
  };

  if (!editingAgent) {
    return null;
  }
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Изменение</DialogTitle>
      <DialogContent>
        <DialogContentText>Введите изменения в нужные поля</DialogContentText>
        <TextField
          margin="dense"
          label="Имя"
          type="text"
          onChange={handleEdit}
          value={editingAgent.firstName}
          name="firstName"
          fullWidth
        />
        <TextField
          margin="dense"
          label="Фамилия"
          type="text"
          onChange={handleEdit}
          value={editingAgent.lastName}
          name="lastName"
          fullWidth
        />
        <TextField
          margin="dense"
          label="Город"
          type="text"
          onChange={handleEdit}
          value={editingAgent.location}
          name="location"
          fullWidth
        />
        <TextField
          margin="dense"
          label="Телефон"
          type="text"
          onChange={handleEdit}
          value={editingAgent.phone}
          name="phone"
          fullWidth
        />
        <TextField
          margin="dense"
          label="Почта"
          type="text"
          onChange={handleEdit}
          value={editingAgent.email}
          name="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Сохранить изменения
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditingAgentDialog;
