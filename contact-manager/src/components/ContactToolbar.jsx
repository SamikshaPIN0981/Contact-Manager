import {
  TextField,
  Stack,
  FormControlLabel,
  Switch,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import useContactStore from "../store/contactStore";

/**
 * ContactToolbar Component
 * ------------------------
 * Provides a toolbar with a search input and a "Show Favorites" toggle.
 * This component uses Zustand for global state management and helps
 * filter the contact list based on user input.
 *
 * Props:
 * - onResetPage: function to reset pagination to page 1 whenever filter/search changes.
 */

export default function ContactToolbar({ onResetPage }) {

    // Get search state and handlers from global store (Zustand)
  const { search, showFavorites, setSearch, setShowFavorites } = useContactStore();

  // Handlers for search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onResetPage();
  };

  // Handler for toggling favorites filter
  const handleFavoritesToggle = (e) => {
    setShowFavorites(e.target.checked);
    onResetPage();
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      mb={2}
    >
          {/* Search Input Field with Icon */}
      <TextField
        size="small"
        variant="outlined"
        placeholder="Search contact"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" />
            </InputAdornment>
          ),
          sx: {
            borderRadius: 2, // Rounded corners
            backgroundColor: "#f9f9f9",
            width: "103%",
          },
        }}
      />
         {/* Toggle to filter favorites only */}
      <FormControlLabel
        control={
          <Switch
            checked={showFavorites}
            onChange={handleFavoritesToggle}
            size="small"
            color="primary"
          />
        }
        label="Show Favourites"
        labelPlacement="end"
        sx={{ whiteSpace: "nowrap", ml: 1 }}
      />
    </Stack>
  );
}
