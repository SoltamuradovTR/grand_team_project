import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditingDialogClient,
  editClient,
  selectEditingClient,
  setFormFieldsClient,
} from "../../redux/features/login";

function EditingClientDialog() {
  const dispatch = useDispatch();

  const editingClient = useSelector(selectEditingClient);

  const handleClose = () => {
    dispatch(closeEditingDialogClient());
  };

  const handleEdit = (e) => {
    dispatch(setFormFieldsClient(e));
  };

  const handleSave = async () => {
    await dispatch(editClient());
    handleClose();
  };

  if (!editingClient) {
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
          value={editingClient.firstName}
          name="firstName"
          fullWidth
        />
        <TextField
          margin="dense"
          label="Фамилия"
          type="text"
          onChange={handleEdit}
          value={editingClient.lastName}
          name="lastName"
          fullWidth
        />
        <TextField
          margin="dense"
          label="Телефон"
          type="text"
          onChange={handleEdit}
          value={editingClient.phone}
          name="phone"
          fullWidth
        />
        <TextField
          margin="dense"
          label="Почта"
          type="text"
          onChange={handleEdit}
          value={editingClient.email}
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

export default EditingClientDialog;
