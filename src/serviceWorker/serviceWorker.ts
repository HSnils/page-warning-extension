import { getCurrentTabId } from "../utils";

const borderWarningCss = (color: string) => `
body {
  border: 1rem solid ${color};
  height: 100vh;
  box-sizing: border-box;
}
`;

chrome.runtime.onMessage.addListener(async (request, sender) => {
  const isMessageFromContentScript = !!sender.tab;

  if (isMessageFromContentScript) {
    const tabId = await getCurrentTabId();
    if (tabId && request.addBorderWarningCss) {
      chrome.scripting.insertCSS({
        target: {
          tabId: tabId,
        },
        css: borderWarningCss(request.addBorderWarningCss.color),
      });
    }

    if (tabId && request.removeBorderWarningCss) {
      chrome.scripting.removeCSS({
        target: {
          tabId: tabId,
        },
        css: borderWarningCss(request.removeBorderWarningCss.color),
      });
    }
  }
});
