 // React & Libraries
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI Components & Icons

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Button,
  InputAdornment,
  Fade,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
// Utils & Hooks
import PropTypes from "prop-types";
import { useCreateContact, useUpdateContact } from "../hooks/useContact";

// Validation schema using Yup for form input
const schema = Yup.object({
  name: Yup.string().required("Full name is required").min(2).max(50),
  email: Yup.string().required("Email is required").email().max(100),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[+]?[\d\s-]{10,20}$/, "Invalid phone number"),
  address: Yup.string().required("Address is required").min(10).max(200),
  favourite: Yup.boolean(),
});

// Default form values
const defaultFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  favourite: false,
};

// Styled dialog with rounded corners and custom shadow
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    boxShadow: theme.shadows[10],
    background: theme.palette.background.paper,
    overflow: "hidden",
    maxWidth: 500,
  },
}));

//  Styled input fields for better visual feedback
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: theme.shadows[2],
    },
    "&.Mui-focused": {
      boxShadow: `${theme.palette.primary.main} 0 0 0 2px`,
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: theme.palette.text.secondary,
  },
}));

// Styled divider for visual separation
const StyledDivider = styled("div")(({ theme }) => ({
  height: 1,
  background: theme.palette.grey[200],
  margin: theme.spacing(2, 0),
}));


//  Modal for creating or editing a contact
// Handles both form rendering and submission using react-hook-form


export default function ContactFormModal({
  open,
  onClose,
  contact,
  onSuccess,
}) {
  // Check if the modal is in edit mode or create mode
  const isEditMode = !!contact;

  //  Mutations for create and update operations
  const { mutate: createContact, isPending: creating } = useCreateContact();
  const { mutate: updateContact, isPending: updating } = useUpdateContact();

  // Form handling using react-hook-form with Yup validation
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultFormValues,
  });

  // State for controlling snackbar visibility and messages
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

// Populate form fields if editing an existing contact
  useEffect(() => {
    if (open) {
      if (contact) {
        reset({
          name: contact.name || "",
          email: contact.email || "",
          phone: contact.phone || "",
          address: contact.address || "",
          favourite: contact.favourite || false,
        });
      } else {
        reset(defaultFormValues);
      }
    }
  }, [open, contact, reset]);

  // Watch form values to handle changes dynamically
  const values = watch();

  // Handle form submission for both creating and updating contacts
  const onSubmit = (data) => {
    const action = isEditMode ? updateContact : createContact;
    const payload = isEditMode ? { id: contact.id, ...data } : data;
    const successMessage = isEditMode
      ? "Contact updated successfully!"
      : "Contact added successfully!";

    action(payload, {
      onSuccess: () => {
        setSnackbar({
          open: true,
          message: successMessage,
          severity: "success",
        });
        onClose();
        onSuccess?.();
      },
    });
  };

  // Disable the submit button if either creating or updating is in progress
  const isLoading = creating || updating;

  return (
    <>
      <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            bgcolor: "grey.100",
            py: 3,
            position: "relative",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight={600} color="primary.main">
              {isEditMode ? "Edit Contact" : "Add New Contact"}
            </Typography>
            <IconButton onClick={onClose} sx={{ color: "grey.600" }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <StyledDivider />

        <DialogContent sx={{ p: 4 }}>
          <Fade in={open}>
            {isLoading ? (
              <Stack alignItems="center" py={6}>
                <CircularProgress size={48} />
                <Typography color="text.secondary" mt={2}>
                  Processing...
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={3}>
                  {/* Input: Full Name */}
                <StyledTextField
                  {...register("name")}
                  label="Full Name"
                  fullWidth
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                  {/* Input: Email */}
                <StyledTextField
                  {...register("email")}
                  label="Email Address"
                  fullWidth
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                 {/* Input: Phone Number */}
                <StyledTextField
                  {...register("phone")}
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                   {/* Input: Address */}
                <StyledTextField
                  {...register("address")}
                  label="Address"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                  {/* Checkbox: Favourite */}
                <FormControlLabel
                  sx={{ pl: 1 }}
                  control={
                    <Checkbox
                      checked={values.favourite}
                      onChange={(e) => setValue("favourite", e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography fontSize={14} fontWeight={500}>
                      Add to Favourites
                    </Typography>
                  }
                />
              </Stack>
            )}
          </Fade>
        </DialogContent>

        <StyledDivider />
        
           {/* Form actions: Cancel and Submit */}
        <DialogActions sx={{ p: 3, bgcolor: "grey.100" }}>
          <Stack direction="row" spacing={2} width="100%">
            <Button
              variant="outlined"
              fullWidth
              onClick={onClose}
              disabled={isLoading}
              sx={{
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  boxShadow: (theme) => theme.shadows[2],
                },
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              loading={isLoading}
              sx={{
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  boxShadow: (theme) => theme.shadows[2],
                },
              }}
            >
              {isEditMode ? "Update Contact" : "Add Contact"}
            </LoadingButton>
          </Stack>
        </DialogActions>
      </StyledDialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

// PropTypes for type checking
ContactFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contact: PropTypes.object,
  onSuccess: PropTypes.func,
};
