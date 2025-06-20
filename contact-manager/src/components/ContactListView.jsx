import { useState, useCallback, useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import {
  Star,
  StarBorder,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import useContactStore from "../store/contactStore";
import { useContacts } from "../hooks/useContact";
import ContactToolbar from "./ContactToolbar";

export default function ContactListView() {
  const { search, showFavorites } = useContactStore();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useContacts(currentPage, search, showFavorites);
  const contacts = useMemo(() => data?.contacts || [], [data?.contacts]);
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }, [currentPage, totalPages]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "#fff",
        minHeight: "100vh",
        py: 3,
        px: 1,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: 400,
          maxWidth: "200%",
          p: 2,
          borderRadius: 4,
          bgcolor: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={1}>
          Contact List
        </Typography>

        <ContactToolbar onResetPage={() => setCurrentPage(1)} />
        <Divider sx={{ my: 1 }} />

        {/* Contact List */}
        <Stack
          spacing={1}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "420px",
            pr: 1,
          }}
        >
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
                  borderRadius: 3,
                  bgcolor: "#fafafa",
                  boxShadow: "0 0 0 1px #e0e0e0",
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar src={contact.avatar} sx={{ width: 32, height: 32 }} />
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

        {/* Pagination */}
        <Stack direction="row" justifyContent="space-between" mt={2}>
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
      </Paper>
    </Box>
  );
}
