import * as Yup from 'yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Stack, Typography, IconButton,
  Checkbox, FormControlLabel, CircularProgress, Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import PropTypes from 'prop-types';

import { useCreateContact, useUpdateContact } from '../hooks/useContact';

const schema = Yup.object({
  name: Yup.string().required('Full name is required').min(2).max(50),
  email: Yup.string().required('Email is required').email().max(100),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^[+]?[\d\s-]{7,20}$/, 'Invalid phone number'),
  address: Yup.string().required('Address is required').min(10).max(200),
  favourite: Yup.boolean()
});

const defaultFormValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  favourite: false,
};

export default function ContactFormModal({ open, onClose, contact, onSuccess }) {
  const isEditMode = !!contact;

  const { mutate: createContact, isPending: creating } = useCreateContact();
  const { mutate: updateContact, isPending: updating } = useUpdateContact();

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

  useEffect(() => {
    if (!open) {
      reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        favourite: false,
      });
    }
  }, [open, reset]);

  
  useEffect(() => {
    if (contact) {
      reset({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        favourite: contact.favourite || false,
      });
    } else {
      reset(defaultFormValues); // Explicitly reset to default values
    }
  }, [contact, reset]);

  const values = watch();

  const onSubmit = (data) => {
    if (isEditMode) {
      updateContact({ id: contact.id, ...data }, {
        onSuccess: () => {
          onClose();
          onSuccess?.();
        }
      });
    } else {
      createContact(data, {
        onSuccess: () => {
          onClose();
          onSuccess?.();
        }
      });
    }
  };

  const isLoading = creating || updating;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">{isEditMode ? 'Edit Contact' : 'Add New Contact'}</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {isLoading ? (
          <Stack alignItems="center" py={4}>
            <CircularProgress />
          </Stack>
        ) : (
          <Stack spacing={3}>
            <TextField
              {...register('name')}
              label="Full Name"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register('email')}
              label="Email Address"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('phone')}
              label="Phone Number"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              {...register('address')}
              label="Address"
              multiline
              rows={3}
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.favourite}
                  onChange={(e) => setValue('favourite', e.target.checked)}
                />
              }
              label="Add to Favourites"
            />
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} width="100%">
          <Button
            variant="outlined"
            fullWidth
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <LoadingButton
            fullWidth
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
          >
            {isEditMode ? 'Update Contact' : 'Add Contact'}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

ContactFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contact: PropTypes.object, // nullable for Add
  onSuccess: PropTypes.func, // optional callback
};