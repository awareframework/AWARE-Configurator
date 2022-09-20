import "./Overview.css";
import { Button, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import { studyFormStudyInformationState } from "../functions/atom";
import customisedTheme from "../functions/theme";

export default function Main() {
  const navigateTo = useNavigate();
  const studyInformation = useRecoilValue(studyFormStudyInformationState);

  return (
    <ThemeProvider theme={customisedTheme}>
      <div>
        <div className="main_vertical_layout">
          <div className="border">
            <Grid width={250} ml={5} mt={3}>
              <p className="title">Study Information</p>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
              mt={1}
            >
              <Grid width={250}>
                <p className="field_name">Study title</p>
              </Grid>

              <Grid width={250}>
                <p className="value">{studyInformation.studyTitle}</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Study description</p>
              </Grid>

              <Grid width={250}>
                <p className="value">{studyInformation.description}</p>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="flex-end"
              marginBottom={3}
              marginRight={2}
            >
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/study_information");
                }}
              >
                EDIT STUDY INFORMATION
              </Button>
            </Grid>
          </div>
          <div className="border">
            <Grid width={250} ml={5} mt={3}>
              <p className="title">Questions</p>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
              mt={1}
            >
              <Grid width={250}>
                <p className="field_name">Question 1</p>
              </Grid>

              <Grid width={250}>
                <p className="value">question1</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Instructions</p>
              </Grid>

              <Grid width={250}>
                <p className="value">instruction</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Question type</p>
              </Grid>

              <Grid width={250}>
                <p className="value">question_type</p>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="flex-end"
              marginBottom={3}
              marginRight={2}
            >
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/questions");
                }}
              >
                EDIT QUESTIONS
              </Button>
            </Grid>
          </div>

          <div className="border">
            <Grid width={250} ml={5} mt={3}>
              <p className="title">Schedule configuration</p>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
              mt={1}
            >
              <Grid width={250}>
                <p className="field_name">Schedule 1</p>
              </Grid>

              <Grid width={250}>
                <p className="value">schedule1</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Questions</p>
              </Grid>

              <Grid width={250}>
                <p className="value">questions</p>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="flex-end"
              marginBottom={3}
              marginRight={2}
            >
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/schedule_configuration");
                }}
              >
                EDIT SCHEDULE CONFIGURATION
              </Button>
            </Grid>
          </div>
          <div className="border">
            <Grid width={250} ml={5} mt={3}>
              <p className="title">Sensor data</p>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
              mt={1}
            >
              <Grid width={250}>
                <p className="field_name">Study title</p>
              </Grid>

              <Grid width={250}>
                <p className="value">"Study Information"</p>
              </Grid>
            </Grid>

            <Grid
              container
              // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              ml={5}
            >
              <Grid width={250}>
                <p className="field_name">Study description</p>
              </Grid>

              <Grid width={250}>
                <p className="value">"Study Information"</p>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="flex-end"
              marginBottom={3}
              marginRight={2}
            >
              <Button
                color="main"
                variant="contained"
                onClick={() => {
                  navigateTo("/study/sensor_data");
                }}
              >
                EDIT SENSOR DATA
              </Button>
            </Grid>
          </div>

          <Box sx={{ width: "100%" }} mt={5} marginBottom={5}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 23 }}
            >
              <Grid xs />
              <Grid xs="auto">
                <Button
                  color="main"
                  variant="contained"
                  onClick={() => {
                    navigateTo("/study/study_information");
                  }}
                >
                  DOWNLOAD STUDY CONFIG
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}
