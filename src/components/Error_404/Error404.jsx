import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function Error404() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#dae2e488",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <SentimentVeryDissatisfiedIcon
          color="#a5a5a5"
          sx={{ mt: 6, width: 200, height: 200, color: "#a5a5a5" }}
        />
      </Box>
      <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="sm">
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", color: "#a5a5a5" }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", color: "#c8c8c8" }}
        >
          Page not Found
        </Typography>
      </Container>
    </Box>
  );
}
export default Error404;
