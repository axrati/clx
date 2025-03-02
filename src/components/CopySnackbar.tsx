import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface CopySnackbarProps {
  open: boolean;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

const CopySnackbar: React.FC<CopySnackbarProps> = ({ open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        Copied to clipboard!
      </Alert>
    </Snackbar>
  );
};

export default CopySnackbar;
