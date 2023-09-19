import { useEffect } from "react";
import { addPrefixToId, createElement } from "../../createElement";
import "./bannerWarning.css";

const BANNER_WARNING_ID = addPrefixToId("banner-warning");

export const BannerWarning = () => {
  useEffect(() => {
    const bannerElement = createElement(
      `<div id="${BANNER_WARNING_ID}">You are in production!</div>`,
    );
    document.body.insertBefore(bannerElement, document.body.firstChild);

    return () => {
      const divElement = document.getElementById(BANNER_WARNING_ID);
      if (divElement) {
        document.body.removeChild(divElement);
      }
    };
  }, []);

  return null;
};
