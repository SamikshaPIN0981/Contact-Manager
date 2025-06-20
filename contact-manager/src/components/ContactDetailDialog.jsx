import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Stack,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function ContactDetailDialog({
  open,
  contact,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!contact) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
        Contact Details
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Stack spacing={2} alignItems="center">
          <Avatar
            src={contact.avatar}
            sx={{ width: 80, height: 80, boxShadow: 2 }}
          />
          <Typography variant="h6" fontWeight={500}>
            {contact.name}
          </Typography>
          <Typography color="text.secondary">{contact.email}</Typography>
          <Typography color="text.secondary">{contact.phone}</Typography>
          <Typography color="text.secondary">{contact.address}</Typography>
        </Stack>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ justifyContent: "center", p: 2 }}>
        <Button
          onClick={() => onEdit(contact)} // pass contact!
          variant="contained"
          color="primary"
          startIcon={<Edit />}
        >
          Edit
        </Button>

        <Button
          onClick={() => onDelete(contact.id)}
          variant="contained"
          color="error"
          startIcon={<Delete />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
