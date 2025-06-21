// import { useState, useCallback, useMemo } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   IconButton,
//   Stack,
//   Typography,
//   Paper,
//   Divider,
//   Checkbox,
//   Tooltip,
// } from "@mui/material";
// import {
//   Star,
//   StarBorder,
//   ArrowBack,
//   ArrowForward,
//   SearchOutlined,
// } from "@mui/icons-material";
// import useContactStore from "../store/contactStore";
// import { useContacts, useUpdateContact } from "../hooks/useContact";
// import ContactToolbar from "./ContactToolbar";
// import ContactFormModal from "./ContactFormModal";
// import ContactDetailDialog from "./ContactDetailDialog";

// export default function ContactListView() {
//   const { search, showFavorites } = useContactStore();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [formOpen, setFormOpen] = useState(false);
//   const [editingContact, setEditingContact] = useState(null);
//   const [selectedContact, setSelectedContact] = useState(null);

//   const { data, isLoading, refetch } = useContacts(
//     currentPage,
//     search,
//     showFavorites
//   );
//   const { mutate: updateContact } = useUpdateContact();
//   const contacts = useMemo(() => data?.contacts || [], [data]);
//   const total = data?.total || 0;
//   const totalPages = Math.ceil(total / 10); // Ensure 10 items per page
//   console.log("Total pages:", totalPages);


//   const handleNext = useCallback(() => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   }, [currentPage, totalPages]);

//   const handlePrevious = useCallback(() => {
//     if (currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   }, [currentPage]);

//   const handleAddClick = useCallback(() => {
//     setEditingContact(null);
//     setFormOpen(true);
//   }, []);

//   const handleQuickView = useCallback((contact) => {
//     setSelectedContact(contact);
//   }, []);

//   const handleToggleFavorite = useCallback(
//     (contact) => {
//       updateContact(
//         {
//           id: contact.id,
//           name: contact.name,
//           email: contact.email,
//           phone: contact.phone,
//           address: contact.address,
//           favourite: !contact.favourite,
//         },
//         {
//           onSuccess: () => refetch(), // Ensure refetch after updating favorite
//         }
//       );
//     },
//     [updateContact, refetch]
//   );

//   const closeQuickView = () => setSelectedContact(null);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         bgcolor: "#f0f2f5",
//         minHeight: "100vh",
//         py: 4,
//         px: 2,
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <Paper
//         elevation={2}
//         sx={{
//           width: 500,
//           p: 2,
//           borderRadius: 3,
//           bgcolor: "#fff",
//           boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
//           height: "75vh",
//           display: "flex",
//           flexDirection: "column",
          
//         }}
//       >
//         <Typography variant="h6" fontWeight={700} mb={2}>
//           Contact List
//         </Typography>

//         <ContactToolbar onResetPage={() => setCurrentPage(1)} />
//         <Divider sx={{ my: 1 }} />

//         <Box
//           sx={{
//             flexGrow: 1,
//             overflowY: "auto",
//             borderRadius: 2,
//             border: "1px solid #e0e0e0",
//             p: 1,
//             bgcolor: "#fafafa",
           
//           }}
//         >
//           <Stack spacing={1}>
//             {isLoading ? (
//               <Typography textAlign="center">Loading...</Typography>
//             ) : contacts.length === 0 ? (
//               <Typography textAlign="center">No contacts found</Typography>
//             ) : (
//               contacts.map((contact) => (
//                 <Box
//                   key={contact.id}
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     p: 1.5,
//                     borderRadius: 2,
//                     bgcolor: "#fff",
//                     border: "1px solid #dcdcdc",
                   
//                   }}
//                 >
//                   <Stack direction="row" spacing={1.5} alignItems="center">
//                     <Checkbox size="small" />
//                     <Avatar
//                       src={contact.avatar}
//                       sx={{ width: 32, height: 32 }}
//                     />
//                     <Box>
//                       <Typography fontWeight={600} fontSize={14}>
//                         {contact.name}
//                       </Typography>
//                       <Typography fontSize={12} color="text.secondary">
//                         {contact.email}
//                       </Typography>
//                     </Box>
//                   </Stack>
//                   <Stack direction="row" spacing={0.5}>
//                     <Tooltip title={contact.favourite ? "Unfavorite" : "Favorite"}>
//                       <IconButton
//                         size="small"
//                         onClick={() => handleToggleFavorite(contact)}
//                       >
//                         {contact.favourite ? (
//                           <Star sx={{ color: "#fbc02d" }} fontSize="small" />
//                         ) : (
//                           <StarBorder fontSize="small" />
//                         )}
//                       </IconButton>
//                     </Tooltip>
//                     <IconButton
//                       size="small"
//                       onClick={() => handleQuickView(contact)}
//                       sx={{ color: "#00bcd4" }}
//                     >
//                       <SearchOutlined fontSize="small" />
//                     </IconButton>
//                   </Stack>
//                 </Box>
//               ))
//             )}
//           </Stack>
//         </Box>

//         <Stack direction="row" justifyContent="space-between" mt={2}>
//           <Button
//             startIcon={<ArrowBack />}
//             onClick={handlePrevious}
//             disabled={currentPage === 1}
//             size="small"
//             variant="outlined"
//           >
//             Previous
//           </Button>
//           <Typography variant="body2" sx={{ alignSelf: "center" }}>
//             Page {currentPage} of {totalPages || 1}
//           </Typography>
//           <Button
//             endIcon={<ArrowForward />}
//             onClick={handleNext}
//             disabled={currentPage >= totalPages}
//             size="small"
//             variant="outlined"
//           >
//             Next
//           </Button>
//         </Stack>

//         <Button
//           fullWidth
//           variant="contained"
//           onClick={handleAddClick}
//           sx={{
//             mt: 2,
//             backgroundColor: "#1976d2",
//             fontWeight: 600,
//             textTransform: "none",
//             "&:hover": { backgroundColor: "#125ea2" },
//           }}
//         >
//           + ADD CONTACT
//         </Button>
//       </Paper>

//       <ContactFormModal
//         open={formOpen}
//         onClose={() => setFormOpen(false)}
//         contact={editingContact ?? undefined}
//         onSuccess={() => {
//           setFormOpen(false);
//           setCurrentPage(1); // Reset to page 1 to show new contact
//           refetch();
//         }}
//       />

//       {selectedContact && (
//         <ContactDetailDialog
//           open={Boolean(selectedContact)}
//           contact={selectedContact}
//           onClose={closeQuickView}
//           onEdit={(contact) => {
//             setEditingContact(contact);
//             setFormOpen(true);
//             closeQuickView();
//           }}
//           onDelete={() => {
//             closeQuickView();
//             setCurrentPage(1); // Reset to page 1 after deletion
//             refetch();
//           }}
//         />
//       )}
//     </Box>
//   );
// }
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
import { useContacts, useUpdateContact } from "../hooks/useContact";
import ContactToolbar from "./ContactToolbar";
import ContactFormModal from "./ContactFormModal";
import ContactDetailDialog from "./ContactDetailDialog";

export default function ContactListView() {
  const { search, showFavorites } = useContactStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const { data, isLoading, refetch } = useContacts(
    currentPage,
    search,
    showFavorites
  );
  const { mutate: updateContact } = useUpdateContact();
  const contacts = useMemo(() => data?.contacts || [], [data]);
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10); // 10 items per page
  const startIdx = (currentPage - 1) * 10;
  const endIdx = Math.min(startIdx + 10, total); // Limit to total for last page
  const paginatedContacts = contacts.slice(0, endIdx - startIdx); // Slice to correct number

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

  const handleAddClick = useCallback(() => {
    setEditingContact(null);
    setFormOpen(true);
  }, []);

  const handleQuickView = useCallback((contact) => {
    setSelectedContact(contact);
  }, []);

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
          width: 500,
          p: 2,
          borderRadius: 3,
          bgcolor: "#fff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          height: "75vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={2}>
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
                  <Stack direction="row" spacing={0.5}>
                    <Tooltip title={contact.favourite ? "Unfavorite" : "Favorite"}>
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
                    <IconButton
                      size="small"
                      onClick={() => handleQuickView(contact)}
                      sx={{ color: "#00bcd4" }}
                    >
                      <SearchOutlined fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              ))
            )}
          </Stack>
        </Box>

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
          onDelete={() => {
            closeQuickView();
            setCurrentPage(1);
            refetch();
          }}
        />
      )}
    </Box>
  );
}