import { useUrlsQuery, useWarningQuery } from "../hooks";
import { BannerWarning } from "./warnings/bannerWarning/BannerWarning";

export const Content = () => {
  const {
    data: { isActive: isWarningActive },
  } = useWarningQuery();
  const { data: urls } = useUrlsQuery();

  const currentUrl = window.location.href;
  const isUrlMatch = urls.some((url: string) => currentUrl.includes(url));

  if (!isUrlMatch || !isWarningActive) {
    return null;
  }

  return <BannerWarning />;
};
