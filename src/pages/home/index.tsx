import { useNavigate } from "react-router";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, MouseEvent, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { useDebounce } from "../../hooks/useDebounce";
import { Typography } from "@mui/material";

function Home() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [q, setQ] = useState("");

  const { error, data, isFetching } = useQuery({
    queryKey: ["animeData", page, rowsPerPage, q],
    queryFn: async () => {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?page=${page}&limit=${rowsPerPage}&q=${q}`,
      );
      return await response.json();
    },
  });

  const { debounce } = useDebounce();
  const handleQuerySearch = (event: ChangeEvent<HTMLInputElement>) => {
    debounce(() => {
      setQ(event.target.value);
      setPage(1);
      setRowsPerPage(10);
    }, 500);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const navigate = useNavigate();
  const onClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <Paper
      sx={{
        width: "1200px",
        margin: "0 auto",
        p: 2,
      }}
    >
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

      <Grid container spacing={2}>
        {isFetching ? (
          <Grid size={12} textAlign="center" padding={6}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            {data?.data.length === 0 && (
              <Typography>No anime found!</Typography>
            )}

            {data?.data.length !== 0 &&
              data?.data?.map((item) => {
                return (
                  <Grid
                    key={item.mal_id}
                    size={3}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Card
                      variant="outlined"
                      onClick={() => onClick(item.mal_id)}
                    >
                      <CardHeader
                        title={item.title}
                        subheader={item.title_japanese}
                      />

                      <CardMedia
                        component="img"
                        height="435"
                        image={item.images.jpg.image_url}
                        alt="Cowboy Bebop Poster"
                      />
                    </Card>
                  </Grid>
                );
              })}
          </>
        )}
      </Grid>

      {!isFetching && (
        <TablePagination
          component="div"
          count={data?.pagination?.items?.total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}

export default Home;
