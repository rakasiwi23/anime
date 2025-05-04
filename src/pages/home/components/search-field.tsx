import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

import { useDebounce } from "../../../hooks/useDebounce";

type Props = {
  setQ: (query: string) => void;
  setPage: (page: number) => void;
  setRowsPerPage: (page: number) => void;
};

function SearchField({ setQ, setPage, setRowsPerPage }: Props) {
  const { debounce } = useDebounce();

  const handleQuerySearch = (event: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setQ(event.target.value);
      setPage(1);
      setRowsPerPage(10);
    }, 500);
  };

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <TextField
        label="Search Anime Title"
        onChange={handleQuerySearch}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </FormControl>
  );
}

export default SearchField;
