import { useEffect, useState } from "react";
import { IftttTemplateUtils } from "../utils";
export function useDeviceIftttTemplateInfo(device_type) {
  const [data, setData] = useState([]);
  useEffect(() => {
    IftttTemplateUtils.getPluginRecommendTemplateInfo(device_type).then((res) => {
      setData(res.value);
    }).catch(() => {});
  }, []);
  return data;
}