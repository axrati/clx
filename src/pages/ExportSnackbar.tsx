import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ExportSnackbarProps {
  open: boolean;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

const ExportSnackbar: React.FC<ExportSnackbarProps> = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        Exported Data!
      </Alert>
    </Snackbar>
  );
};

export default ExportSnackbar;
