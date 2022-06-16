import * as React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBarHeader from "../../AppBar/AppBarHeader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SnackbarAlert from "../Snackbar";
import { Context } from "../../Context/Context";

const theme = createTheme();
function Edit() {
  const location = useLocation();
  const [context, setContext] = React.useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    name: location.state?.user.name,
    email: location.state?.user.email,
    gender: location.state?.user.gender,
    status: location.state?.user.status,
  });

  async function editUser() {
    await fetch(
      `https://gorest.co.in/public/v2/users/${location.state.user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GOREST_API}`, // notice the Bearer before your token
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          gender: user.gender,
          status: user.status,
        }),
      }
    )
      .then((response) => {
        if (response.status === 401)
          return setContext({
            open: true,
            severity: "error",
            description: response.statusText,
          });
        return response.json();
      })
      .then((user) => {
        console.log(user, "user");
        if (!user[0]?.message || !user[0]?.field) {
          setUser(user);
          navigate("/users", { state: { user } });
          setContext({
            open: true,
            severity: "success",
            description: "User updated successfully",
          });
        } else {
          setContext({
            open: true,
            severity: "error",
            description: user[0]?.field + " " + user[0].message,
          });
        }
      })
      .catch((err) => console.log(err, "dsfsd"));
  }
  if (!location.state) return <Navigate replace to="/users" />;
  return (
    <ThemeProvider theme={theme}>
      <AppBarHeader name={"Edit"} />
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
              Edit user
            </Typography>
          </Container>
        </Box>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            py: 2,
          }}
        >
          <TextField
            sx={{ my: 2, width: "300px" }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextField
            sx={{ my: 2, width: "300px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <FormControl sx={{ my: 2, width: "300px" }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user.gender}
              label="Gender"
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ my: 2, width: "300px" }}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user.status}
              label="Status"
              onChange={(e) => setUser({ ...user, status: e.target.value })}
            >
              <MenuItem value={"active"}>Active</MenuItem>
              <MenuItem value={"inactive"}>Inactive</MenuItem>
            </Select>
          </FormControl>
          <Button
            disabled={
              user.name === location.state.user.name &&
              user.email === location.state.user.email &&
              user.gender === location.state.user.gender &&
              user.status === location.state.user.status &&
              true
            }
            onClick={() => editUser()}
            variant="contained"
          >
            Change
          </Button>
        </Container>
      </main>
    </ThemeProvider>
  );
}
export default Edit;
