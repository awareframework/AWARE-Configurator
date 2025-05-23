// PluginAPIField.js
import React from "react";
import "./PluginAPIField.css";
import { useRecoilState } from "recoil";
import Grid from "@mui/material/Unstable_Grid2";
import { TextField } from "@mui/material";
import { pluginSensorState } from "../../functions/atom";

function PluginAPIField(inputs) {
  const [pluginData, setPluginData] = useRecoilState(pluginSensorState);

  const updatePluginData = (fieldName, value) => {
    setPluginData({
      ...pluginData,
      [fieldName]: value,
    });
  };

  function updateStates(fieldName, value, mode) {
    if (mode === "plugin") {
      updatePluginData(fieldName, value);
    }
  }

  const {
    id,
    title,
    inputLabel,
    defaultValue = "",
    description,
    field,
    studyField,
    modeState,
  } = inputs;

  return (
    <div className="sensor_vertical_layout">
      <Grid>
        <p className="field_name" mb={10}>
          {title}
        </p>
      </Grid>
      <Grid marginTop={2}>
        <TextField
          id={id}
          placeholder={inputLabel}
          value={studyField || defaultValue}
          type="text"
          style={{ width: "100%" }}
          onChange={(event) => {
            updateStates(field.toString(), event.target.value, modeState);
          }}
        />
        <p>{description}</p>
      </Grid>
    </div>
  );
}

export default PluginAPIField;
