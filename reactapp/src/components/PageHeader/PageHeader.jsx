import React from "react";
import "./PageHeader.css";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";
import headerTheme from "../../functions/headerTheme";

export default function PageHeader() {
  const navigateTo = useNavigate();
  return (
    <div>
      <div className="top_bar" />
      <div className="page_header">
        <ThemeProvider theme={headerTheme}>
          <Button
            color="header"
            onClick={() => {
              navigateTo("/");
            }}
          >
            AWARE Configuration Page
          </Button>
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
