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
  Checkbox,
} from "@mui/material";
import { Star, StarBorder, ArrowBack, ArrowForward } from "@mui/icons-material";
import useContactStore from "../store/contactStore";
import { useContacts } from "../hooks/useContact";
import ContactToolbar from "./ContactToolbar";
import ContactFormModal from "./ContactFormModal"; 
export default function ContactListView() {
  const { search, showFavorites } = useContactStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const { data, isLoading, refetch } = useContacts(
    currentPage,
    search,
    showFavorites
  );
  const contacts = useMemo(() => data?.contacts || [], [data]);
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }, [currentPage, totalPages]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  const handleAddClick = useCallback(() => {
    setEditingContact(null);     // Reset editing state (important)
    setFormOpen(true);           // Open the form modal
  }, []);
  

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
      }}
    >
      <Paper
        elevation={2}
        sx={{
          width: 400,
          p: 2,
          borderRadius: 3,
          bgcolor: "#fff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          height: "75vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={1}>
          Contact List
        </Typography>

        <ContactToolbar onResetPage={() => setCurrentPage(1)} />
        <Divider sx={{ my: 1 }} />

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            p: 1,
            bgcolor: "#fafafa",
          }}
        >
          <Stack spacing={1}>
            {isLoading ? (
              <Typography textAlign="center">Loading...</Typography>
            ) : (
              contacts.map((contact) => (
                <Box
                  key={contact.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: "#fff",
                    border: "1px solid #dcdcdc",
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Checkbox size="small" />
                    <Avatar
                      src={contact.avatar}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box>
                      <Typography fontWeight={600} fontSize={14}>
                        {contact.name}
                      </Typography>
                      <Typography fontSize={12} color="text.secondary">
                        {contact.email}
                      </Typography>
                    </Box>
                  </Stack>
                  <IconButton size="small">
                    {contact.favourite ? (
                      <Star sx={{ color: "#fbc02d" }} fontSize="small" />
                    ) : (
                      <StarBorder fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              ))
            )}
          </Stack>
        </Box>

        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handlePrevious}
            disabled={currentPage === 1}
            size="small"
            variant="outlined"
          >
            Prev
          </Button>
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            Page {currentPage} of {totalPages}
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
    
      <ContactFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        contact={editingContact}
        onSuccess={() => {
          setFormOpen(false);
          refetch();
        }}
      />
    </Box>
  );
}
