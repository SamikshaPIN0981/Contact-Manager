const BASE_URL = 'http://localhost:3001';

// Fetch contacts with pagination, search, and favorites filtering.
// Falls back to slicing all sorted contacts if paginated data doesn't align.
 
export const fetchContacts = async ({ page, search, showFavorites }) => {
  const params = new URLSearchParams({
    page: page,
    limit: 10,
  });
  if (search) params.append("search", search);
  if (showFavorites) params.append("favourite", "true");

  const response = await fetch(`${BASE_URL}/contacts?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch contacts");

  const paginatedData = await response.json();
  const total = Number(response.headers.get("X-Total-Count")) || paginatedData.length;
  
  const allResponse = await fetch(`${BASE_URL}/contacts`);
  if (!allResponse.ok) throw new Error("Failed to fetch all contacts");
  const allData = await allResponse.json();
  const sortedAllData = [...allData].sort((a, b) => Number(a.id) - Number(b.id));

  let contacts = paginatedData;
  const start = (page - 1) * 10;
  if (contacts.length === 0 || contacts[0]?.id !== sortedAllData[start]?.id) {
    contacts = sortedAllData.slice(start, start + 10);
  }

  return { contacts, total };
};

// Create a new contact with an auto-generated ID.
export const createContact = async (contact) => {
  const allContacts = await fetch(`${BASE_URL}/contacts`).then((res) => res.json());

  const maxId = Math.max(0, ...allContacts.map((c) => Number(c.id) || 0));
  const newContact = { ...contact, id: String(maxId + 1) }; // Assign string id

  const response = await fetch(`${BASE_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newContact),
  });
  if (!response.ok) throw new Error('Failed to create contact');
  return response.json();
};

// Update an existing contact by ID.
export const updateContact = async (contact) => {
  const response = await fetch(`${BASE_URL}/contacts/${String(contact.id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
  if (!response.ok) throw new Error('Failed to update contact');
  return response.json();
};

// Delete a contact by ID.
export const deleteContact = async (id) => {
  const response = await fetch(`${BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete contact');
};