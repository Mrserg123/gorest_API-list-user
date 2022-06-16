import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Context } from "../Context/Context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackbarAlert() {
  const [context, setContext] = React.useContext(Context);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setContext({ open: false });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={context.severity}
          sx={{ width: "100%" }}
        >
          {context.description}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export default SnackbarAlert;
