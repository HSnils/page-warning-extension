import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useWarningQuery } from "../../../hooks";
import { addPrefixToId } from "../../createElement";
import "./bannerWarning.css";

const BANNER_WARNING_ID = addPrefixToId("banner-warning");

export const BannerWarning = () => {
  const {
    data: { color },
  } = useWarningQuery();

  useEffect(() => {
    const div = document.createElement("div");
    div.setAttribute("id", BANNER_WARNING_ID);
    div.setAttribute("style", `background-color: ${color};`);
    const root = createRoot(div);
    root.render("You are in production!");

    document.body.insertBefore(div, document.body.firstChild);

    return () => {
      const divElement = document.getElementById(BANNER_WARNING_ID);
      if (divElement) {
        document.body.removeChild(divElement);
      }
    };
  }, [color]);

  return null;
};
