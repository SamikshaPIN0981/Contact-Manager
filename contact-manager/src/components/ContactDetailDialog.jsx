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
  Paper,
} from "@mui/material";
import {
  Edit,
  Delete,
  Close,
  Email,
  Phone,
  LocationOn,
  Person,
} from "@mui/icons-material";

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

  const handleDeleteClick = () => setConfirmOpen(true);
  const handleConfirmDelete = () => {
    onDelete(contact.id);
    setConfirmOpen(false);
    onClose();
  };
  const handleCancelDelete = () => setConfirmOpen(false);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: "hidden",
            bgcolor: "#ffffff",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#f5f5f5",
            px: 3,
            py: 2,
            fontWeight: 700,
            fontSize: "1.4rem",
            textAlign: "center",
            position: "relative",
          }}
        >
          Contact Details
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 12, top: 12, color: "grey.600" }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <Divider sx={{ borderColor: "#e0e0e0" }} />

        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={2} alignItems="center">
            <Avatar
              src={contact.avatar}
              alt={contact.name}
              sx={{
                width: 90,
                height: 90,
                bgcolor: contact.avatar
                  ? "transparent"
                  : getAvatarColor(contact.name),
                color: "#fff",
                fontSize: "2.5rem",
                fontWeight: 600,
              }}
            >
              {!contact.avatar && contact.name[0]}
            </Avatar>

            <Typography variant="h6" fontWeight={700}>
              {contact.name}
            </Typography>

            <Paper
              elevation={0}
              sx={{
                width: "100%",
                p: 2.5,
                borderRadius: 2,
                bgcolor: "#fafafa",
                border: "1px solid #e0e0e0",
              }}
            >
              <Stack
                spacing={2}
                divider={<Divider sx={{ borderColor: "#e0e0e0" }} />}
              >
                <InfoItem
                  icon={<Person sx={{ color: "#4caf50" }} />}
                  label="Full Name"
                  value={contact.name}
                />
                <InfoItem
                  icon={<Email sx={{ color: "#2196f3" }} />}
                  label="Email Address"
                  value={contact.email}
                />
                <InfoItem
                  icon={<Phone sx={{ color: "#ffb300" }} />}
                  label="Phone Number"
                  value={contact.phone}
                />
                <InfoItem
                  icon={<LocationOn sx={{ color: "#e91e63" }} />}
                  label="Address"
                  value={contact.address}
                />
              </Stack>
            </Paper>
          </Stack>
        </DialogContent>

        <Divider sx={{ borderColor: "#e0e0e0" }} />

        <DialogActions
          sx={{
            p: 3,
            justifyContent: "center",
            bgcolor: "#fafafa",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => onEdit(contact)}
              variant="outlined"
              startIcon={<Edit />}
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#1565c0",
                fontWeight: 600,
                textTransform: "none",
                borderColor: "#bbdefb",
                borderRadius: 2,
                px: 3,
                minWidth: 140,
                "&:hover": {
                  backgroundColor: "#bbdefb",
                },
              }}
            >
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              variant="outlined"
              startIcon={<Delete />}
              sx={{
                backgroundColor: "#fdecea",
                color: "#c62828",
                fontWeight: 600,
                textTransform: "none",
                borderColor: "#f8bbd0",
                borderRadius: 2,
                px: 3,
                minWidth: 140,
                "&:hover": {
                  backgroundColor: "#f8bbd0",
                },
              }}
            >
              Delete
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                backgroundColor: "#ffffff",
                color: "#757575",
                fontWeight: 500,
                textTransform: "none",
                borderColor: "#e0e0e0",
                borderRadius: 2,
                px: 3,
                minWidth: 100,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Close
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={handleCancelDelete}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "error.main",
            bgcolor: "#f5f5f5",
            px: 3,
            py: 2,
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
            Are you sure you want to permanently delete{" "}
            <Box component="span" fontWeight={700}>
              {contact.name}
            </Box>
            ?
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{ justifyContent: "center", p: 2, bgcolor: "#f9f9f9" }}
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
            variant="contained"
            sx={{
              minWidth: 120,
              backgroundColor: "#f8d7da", // Light red background
              color: "#a94442", // Darker red text
              "&:hover": {
                backgroundColor: "#f1b0b7", // Slightly darker on hover
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}
