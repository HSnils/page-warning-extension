chrome.storage.sync.get(["urls", "isWarningActive"]).then((result) => {
  const urls = result.urls;
  const currentUrl = window.location.href;
  const isUrlMatch = urls.some(url => currentUrl.includes(url))
  const isWarningActive = result.isWarningActive;

  console.log({ isWarningActive, urls, currentUrl, isUrlMatch })
  if (isUrlMatch) {
    console.log("URL found in storage, running script");
    const warningInterval = setInterval(() => {
      console.log("running script");
      document.body.style.backgroundColor =
        document.body.style.backgroundColor === "red" ? "" : "red";
    }, 500);
    if(!isWarningActive) {
      clearInterval(warningInterval);
    }
  }
});