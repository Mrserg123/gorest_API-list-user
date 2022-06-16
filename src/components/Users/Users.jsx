import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBarHeader from "../AppBar/AppBarHeader";
import TableUsers from "./TableUsers";
import { Context } from "../Context/Context";
import SnackbarAlert from "../Users/Snackbar";
const theme = createTheme();

function Users() {
  const [users, setUsers] = React.useState([]);
  const [nextPageFetch, setNextPageFetch] = React.useState(1);
  const [context] = React.useContext(Context);

  React.useEffect(() => {
    fetch(`https://gorest.co.in/public/v2/users?page=${nextPageFetch}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GOREST_API}`,
      },
    })
      .then((response) => response.json())
      .then((usersList) => setUsers((prev) => [...prev, ...usersList]));
  }, [nextPageFetch]);

  return (
    <ThemeProvider theme={theme}>
      <AppBarHeader name={"Users"} />
      {context.open && <SnackbarAlert />}
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 0,
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
              Table users
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <TableUsers
            users={users}
            setNextPageFetch={setNextPageFetch}
            setUsers={setUsers}
          />
        </Container>
      </main>
    </ThemeProvider>
  );
}
export default Users;
