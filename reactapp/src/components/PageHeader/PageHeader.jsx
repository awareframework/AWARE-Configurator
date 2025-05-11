import React from "react";
import "./PageHeader.css";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider, Chip } from "@mui/material";
import headerTheme from "../../functions/headerTheme";
import config from "../../settings";

export default function PageHeader() {
  const navigateTo = useNavigate();
  return (
    <div>
      <div className="top_bar" />
      <div className="page_header">
        <ThemeProvider theme={headerTheme}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              color="header"
              onClick={() => {
                navigateTo("/");
              }}
            >
              AWARE Configuration Page
            </Button>
            {config.BETA_MODE && (
              <Chip
                label="BETA"
                color="warning"
                size="small"
                sx={{
                  height: "20px",
                  "& .MuiChip-label": {
                    px: 1,
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  },
                }}
              />
            )}
          </div>
        </ThemeProvider>
      </div>

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      {/* <div */}
      {/*  onClick={() => { */}
      {/*    navigateTo("/"); */}
      {/*  }} */}
      {/* > */}
      {/*  <p className="page_header">AWARE Configuration Page</p> */}
      {/* </div> */}
    </div>
  );
}
