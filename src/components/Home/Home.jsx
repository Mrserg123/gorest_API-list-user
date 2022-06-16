import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBarHeader from "../AppBar/AppBarHeader";
import CardHome from "./CardHome";

const theme = createTheme();

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <AppBarHeader name={"Dashboard"} />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Dashboard
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Choose a card
            </Typography>
          </Container>
        </Box>
        <Container
          sx={{ py: 2, display: "flex", justifyContent: "center" }}
          maxWidth="md"
        >
          <CardHome
            name={"Users"}
            description={"Table Users"}
            imageLink={"/users.png"}
            pageLink={"/users"}
          />
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default Home;
