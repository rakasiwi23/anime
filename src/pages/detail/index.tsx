import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

function Detail() {
  const { id } = useParams();

  const { error, data, isFetching } = useQuery({
    enabled: !!id,
    queryKey: ["animeDetail"],
    queryFn: async () => {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      return await response.json();
    },
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <Stack>
      {isFetching ? (
        <Box sx={{ textAlign: "center", pt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            sx={{ width: 335 }}
            image={data?.data.images.jpg.image_url}
            alt="Live from space album cover"
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              ml: 2,
              position: "relative",
            }}
          >
            <Typography component="div" variant="h5">
              {data?.data.title} ({data?.data.title_japanese})
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {data?.data.studios[0].name}
            </Typography>
            <Typography sx={{ mt: 4 }}>{data?.data.synopsis}</Typography>

            <Stack direction="row" mt={4} gap={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1">Popularity:</Typography>
                <Chip color="info" label={data?.data.popularity} />
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1">Ranked:</Typography>
                <Chip color="info" label={data?.data.rank} />
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1">Score:</Typography>
                <Chip color="info" label={data?.data.score} />
              </Box>
            </Stack>

            <Button
              variant="contained"
              sx={{ position: "absolute", right: 0 }}
              component={Link}
              to="/"
            >
              Back
            </Button>
          </Box>
        </Card>
      )}
    </Stack>
  );
}

export default Detail;
