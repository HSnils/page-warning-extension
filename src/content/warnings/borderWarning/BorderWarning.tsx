import { useEffect } from "react";
import { useWarningQuery } from "../../../hooks";

export const BorderWarning = () => {
  const {
    data: { color },
  } = useWarningQuery();

  useEffect(() => {
    chrome.runtime.sendMessage({ addBorderWarningCss: { color } });
    return () => {
      chrome.runtime.sendMessage({ removeBorderWarningCss: { color } });
    };
  }, [color]);

  return <></>;
};

export default BorderWarning;
