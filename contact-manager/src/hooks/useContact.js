// src/hooks/useContact.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from '../api/contactApi';

export const useContacts = (page, search, showFavorites) => {
  return useQuery({
    queryKey: ['contacts', page, search, showFavorites],
    queryFn: () => fetchContacts({ page, search, showFavorites }),
    keepPreviousData: true,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createContact,
    onSuccess: () => queryClient.invalidateQueries(['contacts']),
    onError: (error) => alert(error.message),
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContact,
    onSuccess: () => queryClient.invalidateQueries(['contacts']),
    onError: (error) => alert(error.message),
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => queryClient.invalidateQueries(['contacts']),
    onError: (error) => alert(error.message),
  });
};
