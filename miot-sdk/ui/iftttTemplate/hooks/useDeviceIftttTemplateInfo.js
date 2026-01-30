import { useEffect, useState } from "react";
import { IftttTemplateUtils } from "../utils";
export function useDeviceIftttTemplateInfo(device_type) {
  const [data, setData] = useState([]);
  useEffect(() => {
    IftttTemplateUtils.getPluginRecommendTemplateInfo(device_type).then((res) => {
      // console.log("recommendTemplateInfo1111111", JSON.stringify(res.value));
      setData(res.value);
    });
  }, []);
  return data;
}