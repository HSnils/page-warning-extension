import { useEffect } from "react";
import { useUrlsQuery, useWarningQuery } from "../hooks";
import { isUrlsMatchingWithCurrentUrl } from "../utils";
import { BannerWarning } from "./warnings/bannerWarning/BannerWarning";

export const Content = () => {
  const {
    data: { isActive: isWarningActive, warningType },
    refetch: refetchWarning,
  } = useWarningQuery();
  const { data: urls, refetch: refetchUrls } = useUrlsQuery();

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request) {
      if (request.warning) {
        refetchWarning();
      }

      if (request.urls) {
        refetchUrls();
      }
    });
  }, [refetchUrls, refetchWarning]);

  const isUrlMatch = isUrlsMatchingWithCurrentUrl(urls);
  if (!isUrlMatch || !isWarningActive) {
    return null;
  }

  switch (warningType) {
    case "banner":
    default:
      return <BannerWarning />;
  }
};
