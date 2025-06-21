// src/hooks/useContact.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../api/contactApi';

// Custom hook to fetch contacts with pagination, search, and favorite filter
export const useContacts = (page, search, showFavorites) => {
  return useQuery({
    queryKey: ['contacts', page, search, showFavorites],
    queryFn: () => fetchContacts({ page, search, showFavorites }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Custom hook to create a contact using mutation.
 //Automatically invalidates the contacts query on success
export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContact,
    onSuccess: () => queryClient.invalidateQueries(['contacts']),
    onError: (error) => alert(error.message),
  });
};

// Custom hook for updating a contact
// Invalidates the contacts query to ensure data stays updated.
export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContact,
    onSuccess: () => queryClient.invalidateQueries(['contacts']),
    onError: (error) => alert(error.message),
  });
};

// Custom hook for deleting a contact
//Triggers a refetch of the contact list after deletion.
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => queryClient.invalidateQueries(['contacts']),
    onError: (error) => alert(error.message),
  });
};
