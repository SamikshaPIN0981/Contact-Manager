import React, { useState } from "react";
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
  IconButton,
  Slide,
} from "@mui/material";
import { Edit, Delete, Close } from "@mui/icons-material";

// Transition component for dialog animations
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getAvatarColor = (name) => {
  const colors = [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
  ];
  const char = name?.[0]?.toUpperCase() || "A";
  const index = (char.charCodeAt(0) - 65) % colors.length;
  return colors[index];
};

export default function ContactDetailDialog({
  open,
  contact,
  onClose,
  onEdit,
  onDelete,
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  if (!contact) return null;

  // Handle delete confirmation
  const handleDeleteClick = () => setConfirmOpen(true);
  const handleConfirmDelete = () => {
    onDelete(contact.id);
    setConfirmOpen(false);
    onClose();
  };
  const handleCancelDelete = () => setConfirmOpen(false);

  // Render the contact detail dialog
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "primary.main",
            position: "relative",
            py: 3,
            bgcolor: "grey.100",
          }}
        >
          Contact Details
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8, color: "grey.600" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={3} alignItems="center">
            <Avatar
              src={contact.avatar}
              alt={contact.name}
              sx={{
                width: 100,
                height: 100,
                border: 3,
                borderColor: "primary.main",
                boxShadow: 3,
                bgcolor: contact.avatar
                  ? "transparent"
                  : getAvatarColor(contact.name),
                color: "white",
                fontSize: "2rem",
                fontWeight: 600,
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            > 
            </Avatar>

            <Typography variant="h5" fontWeight={600}>
              {contact.name}
            </Typography>
            <Stack spacing={1.5} alignItems="center">
              <Typography variant="body1" color="text.secondary">
                <Box component="span" fontWeight={500}>
                  Email:
                </Box>{" "}
                {contact.email}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <Box component="span" fontWeight={500}>
                  Phone:
                </Box>{" "}
                {contact.phone}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <Box component="span" fontWeight={500}>
                  Address:
                </Box>{" "}
                {contact.address}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions
          sx={{ justifyContent: "center", p: 3, bgcolor: "grey.100" }}
        >
          <Button
            onClick={() => onEdit(contact)}
            variant="outlined"
            color="primary"
            startIcon={<Edit />}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Edit
          </Button>
          <Button
            onClick={handleDeleteClick}
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={handleCancelDelete}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "error.main",
            bgcolor: "grey.100",
            position: "relative",
          }}
        >
          Confirm Delete
          <IconButton
            onClick={handleCancelDelete}
            sx={{ position: "absolute", right: 8, top: 8, color: "grey.600" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography>
            Are you sure you want to delete{" "}
            <Box component="span" fontWeight={600}>
              {contact.name}
            </Box>
            ?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "center", p: 2, bgcolor: "grey.100" }}
        >
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            color="primary"
            sx={{ minWidth: 120 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="outlined"
            color="error"
            sx={{ minWidth: 120 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
