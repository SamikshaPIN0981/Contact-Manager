import { TextField, Stack, InputAdornment, Checkbox, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import useContactStore from '../store/contactStore';

export default function ContactToolbar({ onResetPage }) {
  const { search, showFavorites, setSearch, setShowFavorites } = useContactStore();

  return (
    <Stack spacing={1}>
      <TextField
        placeholder="Search contact"
        size="small"
        fullWidth
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onResetPage();
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" />
            </InputAdornment>
          ),
          sx: { borderRadius: 3, backgroundColor: "#f7f7f7" },
        }}
      />
      <Stack direction="row" alignItems="center" spacing={1}>
        <Checkbox
          checked={showFavorites}
          onChange={() => {
            setShowFavorites(!showFavorites);
            onResetPage();
          }}
          size="small"
        />
        <Typography variant="body2">Show Favourites Only</Typography>
      </Stack>
    </Stack>
  );
}
