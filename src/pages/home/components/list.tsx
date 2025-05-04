import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";

export type Anime = {
  mal_id: string;
  title: string;
  title_japanese: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
};

type Props = Anime;

function List({ mal_id, title, title_japanese, images }: Props) {
  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`/detail/${id}`);
  };

  return (
    <Grid
      size={3}
      sx={{
        cursor: "pointer",
      }}
    >
      <Card variant="outlined" onClick={() => onClick(mal_id)}>
        <CardHeader title={title} subheader={title_japanese} />

        <CardMedia
          component="img"
          height="435"
          image={images.jpg.image_url}
          alt="Cowboy Bebop Poster"
        />
      </Card>
    </Grid>
  );
}

export default List;
