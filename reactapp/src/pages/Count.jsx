import React from "react";
import { useParams } from "react-router-dom";
import Axios from "../functions/axiosSettings";

export default function Count() {
  const { data } = useParams();
  const processedData = data.replace(/(\s?)(\w+=)/g, ",$2").substring(1);
  function addCount() {
    Axios({
      method: "post",
      url: "add_count/",
      data: {
        data: processedData,
      },
    });
  }

  addCount();

  return <>test</>;
}
