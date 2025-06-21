import {
  TextField,
  Stack,
  FormControlLabel,
  Switch,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import useContactStore from '../store/contactStore';

export default function ContactToolbar({ onResetPage }) {
  const { search, showFavorites, setSearch, setShowFavorites } = useContactStore();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onResetPage();
  };

  const handleFavoritesToggle = (e) => {
    setShowFavorites(e.target.checked);
    onResetPage();
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" mb={2}>
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
            borderRadius: 10, // Rounded corners
            backgroundColor: '#f9f9f9',
           width:'105%'
          },
        }}
      />
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
        sx={{ whiteSpace: 'nowrap', ml: 1 }}
      />
    </Stack>
  );
}
