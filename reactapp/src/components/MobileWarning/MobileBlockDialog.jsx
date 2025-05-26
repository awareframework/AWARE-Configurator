import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function MobileBlockDialog({ open }) {
  return (
    <Dialog
      open={open}
      disableEscapeKeyDown
      aria-labelledby="mobile-block-dialog-title"
      aria-describedby="mobile-block-dialog-description"
      PaperProps={{
        style: {
          backgroundColor: "#fff3cd",
          border: "2px solid #ffc107",
        },
      }}
    >
      <DialogContent>
        <DialogContentText
          id="mobile-block-dialog-description"
          sx={{ color: "#856404", fontSize: "1.1rem" }}
        >
          <Typography variant="body1" paragraph>
            <strong>
              The AWARE Configurator is not available on mobile devices.
            </strong>
          </Typography>
          <Typography variant="body2" paragraph>
            This website requires a desktop or laptop computer to function
            properly. The interface and functionality are not designed for
            mobile screens.
          </Typography>
          <Typography variant="body2">
            Please access this application from a desktop or laptop computer.
          </Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

MobileBlockDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};
