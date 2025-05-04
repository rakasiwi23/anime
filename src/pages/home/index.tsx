import { ChangeEvent, MouseEvent, Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";

import List, { Anime } from "./components/list";
import SearchField from "./components/search-field";

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

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
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

  if (error) return "An error has occurred: " + error.message;

  return (
    <Paper
      sx={{
        width: "1200px",
        margin: "0 auto",
        p: 2,
      }}
    >
      <SearchField
        setQ={setQ}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />

      <Grid container spacing={2}>
        {isFetching ? (
          <Grid size={12} textAlign="center" padding={6}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            {data?.pagination.total === 0 && (
              <Typography>No anime found!</Typography>
            )}

            {data?.pagination.total !== 0 &&
              data?.data.map((item: Anime) => {
                return (
                  <List
                    key={item.mal_id}
                    mal_id={item.mal_id}
                    title={item.title}
                    title_japanese={item.title_japanese}
                    images={item.images}
                  />
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
