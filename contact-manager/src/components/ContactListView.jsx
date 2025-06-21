import { useState, useCallback, useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  Paper,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Star,
  StarBorder,
  ArrowBack,
  ArrowForward,
  SearchOutlined,
} from "@mui/icons-material";
import useContactStore from "../store/contactStore";
import {
  useContacts,
  useUpdateContact,
  useDeleteContact,
} from "../hooks/useContact";
import ContactToolbar from "./ContactToolbar";
import ContactFormModal from "./ContactFormModal";
import ContactDetailDialog from "./ContactDetailDialog";

/**
 * ContactListView component
 * Renders a list of contacts with pagination, search, filtering, and CRUD options.
 * Integrates with React Query hooks and Zustand store for state management.
 */

export default function ContactListView() {
  // Global search and favorites toggle from Zustand store
  const { search, showFavorites } = useContactStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false); // Contact form modal state
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null); // For viewing contact details

  // Function to get a color based on the contact's name for the avatar
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

  // Fetch contacts with pagination, search, and favorites filtering
  const { data, isLoading, refetch } = useContacts(
    currentPage,
    search,
    showFavorites
  );

  // Mutations for creating, updating, and deleting contacts
  const { mutate: updateContact } = useUpdateContact();
  const { mutate: deleteContact } = useDeleteContact();

  // Memoized list and derived values
  const contacts = useMemo(() => data?.contacts || [], [data]);
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  // Memoized paginated contacts based on search input
  const paginatedContacts = useMemo(() => {
    return contacts
      .filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 10);
  }, [contacts, search]);

  // Handlers for pagination
  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  // Handler to open the contact form for adding a new contact
  const handleAddClick = useCallback(() => {
    setEditingContact(null);
    setFormOpen(true);
  }, []);

  // Handler to open the quick view for a contact
  const handleQuickView = useCallback((contact) => {
    setSelectedContact(contact);
  }, []);

  // Handler to toggle favorite status of a contact
  const handleToggleFavorite = useCallback(
    (contact) => {
      updateContact(
        {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          favourite: !contact.favourite,
        },
        {
          onSuccess: () => refetch(),
        }
      );
    },
    [updateContact, refetch]
  );

  const closeQuickView = () => setSelectedContact(null);

  // Handler to delete a contact
  const handleDeleteContact = useCallback(
    (id) => {
      deleteContact(id, {
        onSuccess: () => {
          closeQuickView();
          setCurrentPage(1);
          refetch();
        },
        onError: (error) => {
          alert(error.message);
        },
      });
    },
    [deleteContact, refetch]
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "#f0f2f5",
        minHeight: "100vh",
        py: 4,
        px: 2,
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden", // Prevent overflow
      }}
    >
      {/* Main container for contact list */}
      <Paper
        elevation={2}
        sx={{
          width: {
            xs: "100%",
            sm: "90%",
            md: 600,
          },
          height: {
            xs: "100vh",
            md: "80vh",
          },
          p: 2,
          borderRadius: 6,
          bgcolor: "#fff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          mb={2}
          align="center"
          sx={{ width: "100%" }}
        >
          Contact List
        </Typography>

        {/* Toolbar for search/favorite toggle */}
        <ContactToolbar onResetPage={() => setCurrentPage(1)} />
        <Divider sx={{ my: 1 }} />

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            borderRadius: 3,
            border: "1px solid #e0e0e0",
            p: 2,
            bgcolor: "#fafafa",
          }}
        >
          <Stack spacing={1}>
            {isLoading ? (
              <Typography textAlign="center">Loading...</Typography>
            ) : paginatedContacts.length === 0 ? (
              <Typography textAlign="center">No contacts found</Typography>
            ) : (
              paginatedContacts.map((contact) => (
                <Box
                  key={contact.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "#fff",
                    border: "1px solid #dcdcdc",
                  }}
                >
                  {/* Avatar and basic info */}
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {/* Removed Checkbox */}
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: getAvatarColor(contact.name),
                        color: "#fff",
                      }}
                    >
                      {contact.name[0]}
                    </Avatar>

                    <Box>
                      <Typography
                        fontWeight={600}
                        fontSize={14}
                        fontFamily={
                          "'Roboto', 'Helvetica', 'Arial', sans-serif'"
                        }
                      >
                        {contact.name}
                      </Typography>

                      <Typography
                        fontSize={12}
                  
                        color="text.secondary"
                      >
                        {contact.email}
                      </Typography>
                    </Box>
                  </Stack>
                  {/* Action buttons for favorite and quick view */}
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip
                      title={contact.favourite ? "Unfavorite" : "Favorite"}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleToggleFavorite(contact)}
                      >
                        {contact.favourite ? (
                          <Star sx={{ color: "#fbc02d" }} fontSize="small" />
                        ) : (
                          <StarBorder fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="View">
                      <IconButton
                        size="small"
                        onClick={() => handleQuickView(contact)}
                        sx={{ color: "#00bcd4" }}
                      >
                        <SearchOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </Box>
        {/* Pagination controls */}
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handlePrevious}
            disabled={currentPage === 1}
            size="small"
            variant="outlined"
          >
            Previous
          </Button>
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            Page {currentPage} of {totalPages || 1} (Total: {total} contacts)
          </Typography>
          <Button
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            size="small"
            variant="outlined"
          >
            Next
          </Button>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          onClick={handleAddClick}
          sx={{
            mt: 2,
            backgroundColor: "#1976d2",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "#125ea2" },
          }}
        >
          + ADD CONTACT
        </Button>
      </Paper>

      {/* Contact form modal for adding/editing contacts */}
      <ContactFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        contact={editingContact ?? undefined}
        onSuccess={() => {
          setFormOpen(false);
          setCurrentPage(1);
          refetch();
        }}
      />

      {/* Contact detail dialog for quick view */}
      {selectedContact && (
        <ContactDetailDialog
          open={Boolean(selectedContact)}
          contact={selectedContact}
          onClose={closeQuickView}
          onEdit={(contact) => {
            setEditingContact(contact);
            setFormOpen(true);
            closeQuickView();
          }}
          onDelete={handleDeleteContact}
        />
      )}
    </Box>
  );
}
