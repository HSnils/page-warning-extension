chrome.storage.sync.get(["urls", "isWarningActive"]).then((result) => {
  const urls = result.urls;
  const currentUrl = window.location.href;
  const isUrlMatch = urls.some((url) => currentUrl.includes(url));
  const isWarningActive = result.isWarningActive;

  if (isUrlMatch) {
    const warningInterval = setInterval(() => {
      document.body.style.backgroundColor =
        document.body.style.backgroundColor === "red" ? "" : "red";
    }, 500);
    if (!isWarningActive) {
      clearInterval(warningInterval);
    }
  }
});
