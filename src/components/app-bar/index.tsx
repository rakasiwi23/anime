import AppBarMui from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

function AppBar() {
  return (
    <AppBarMui
      position="static"
      sx={{
        p: 2,
        mb: 2,
      }}
    >
      <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Anime Station
      </Typography>
    </AppBarMui>
  );
}

export default AppBar;
