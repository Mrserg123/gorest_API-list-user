import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";

function AppBarHeader({ name }) {
  let location = useLocation();
  return (
    <AppBar position="relative">
      <Toolbar>
        {location.pathname === "/" && <DashboardIcon sx={{ mr: 2 }} />}
        <Typography variant="h6" color="inherit" noWrap>
          {name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default AppBarHeader;
