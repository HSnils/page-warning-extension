import { useIsWarningActiveQuery, useUrlsQuery } from "../hooks";
import { BannerWarning } from "./warnings/bannerWarning/BannerWarning";

export const Content = () => {
  const { data: isWarningActive } = useIsWarningActiveQuery();
  const { data: urls } = useUrlsQuery();

  const currentUrl = window.location.href;
  const isUrlMatch = urls.some((url: string) => currentUrl.includes(url));

  if (!isUrlMatch || !isWarningActive) {
    return null;
  }

  return <BannerWarning />;
};
