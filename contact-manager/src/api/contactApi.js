// src/api/contactApi.js
const BASE_URL = 'http://localhost:3001';

export const fetchContacts = async ({ page, search, showFavorites }) => {
  const params = new URLSearchParams({ _page: page, _limit: '10' });
  if (search) params.append('q', search);
  if (showFavorites) params.append('favourite', 'true');

  const response = await fetch(`${BASE_URL}/contacts?${params}`);
  const data = await response.json();
  const total = response.headers.get('X-Total-Count');

  return { contacts: data, total: Number(total) };
};

export const createContact = async (contact) => {
  const response = await fetch(`${BASE_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  if (!response.ok) throw new Error('Failed to create contact');
  return response.json();
};

export const updateContact = async ({ id, ...contact }) => {
  const response = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  if (!response.ok) throw new Error('Failed to update contact');
  return response.json();
};

export const deleteContact = async (id) => {
  const response = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete contact');
};
