export const isExecutedFromPopup = (): boolean =>
  location.protocol == "chrome-extension:";

export const getCurrentTabId = async (): Promise<number | undefined> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    //lastFocusedWindow: true,
    currentWindow: true,
  });
  return tab.id;
};

export const isUrlsMatchingWithCurrentUrl = (urls: string[]): boolean => {
  const currentUrl = window.location.href;
  return urls.some((url: string) => currentUrl.includes(url));
};
