import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const headCells = [
  {
    id: "name",
    label: "Name ",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "gender",
    label: "Gender",
  },
  {
    id: "active",
    label: "Active",
  },
];

function TableUsers({ users, setNextPageFetch }) {
  const navigate = useNavigate();
  const [gender, setGender] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (
      page * rowsPerPage + rowsPerPage >=
        filterUser(users, gender).length - rowsPerPage &&
      !gender
    ) {
      setNextPageFetch((prev) => prev + 1);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (
      page * event.target.value >=
      filterUser(users, gender).length - event.target.value
    ) {
      setNextPageFetch((prev) => prev + 1);
    }
  };

  function filterUser(arr, gender) {
    if (gender) {
      let newValue = [...users];
      let result = newValue.filter((item) => item.gender === gender);
      return result;
    }
    return arr;
  }

  const handleChange = (event) => {
    setGender(event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div style={{ textAlign: "center" }}>
        <FormControl sx={{ width: 200, marginBottom: "20px" }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gendert"
            onChange={handleChange}
          >
            <MenuItem value={""}>none</MenuItem>
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headCells.map((headCell, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      textAlign: headCell.id === "email" && "center",
                      background: "aliceblue",
                    }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterUser(users, gender)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/edit", {
                          state: {
                            user: user,
                          },
                        })
                      }
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="left">{user.gender}</TableCell>
                      <TableCell align="left">{user.status}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filterUser(users, gender).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
export default TableUsers;
