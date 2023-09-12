document.addEventListener("DOMContentLoaded", function () {
  const urlInput = document.getElementById("urlInput");
  const saveButton = document.getElementById("saveButton");

  const toggleButton = document.getElementById("toggleButton");

  
  chrome.storage.sync.get(["isWarningActive"]).then(result => {
    console.log({ isWarningActive: result.isWarningActive });
    toggleButton.textContent = result.isWarningActive ? "Stop Blinking" : "Start Blinking";
  });

  toggleButton.addEventListener("click", () => {
    chrome.storage.sync.get(["isWarningActive"]).then(result => {
      console.log({ isWarningActive: result.isWarningActive })
      let isWarningActive = result.isWarningActive;
      isWarningActive = !isWarningActive;
      toggleButton.textContent = isWarningActive ? "Stop Blinking" : "Start Blinking";
      chrome.storage.sync.set({ isWarningActive });
    });
  });

  displayUrls();
  saveButton.addEventListener("click", () => {
    const url = urlInput.value.trim();
    if (url !== "") {
      addURL(url);
      urlInput.value = "";
    }
  });
});

function displayUrls() {
  const existingLinksElement = document.getElementById("existingLinks");
  chrome.storage.sync.get({ urls: [] }, (result) => {
    const urls = result.urls;
    if (!urls || urls.length === 0) {
      return;
    }
    urls.forEach(url => {
      const urlElement = createUrlElement(url);
      existingLinksElement.appendChild(urlElement);
    });
  });
}

function createUrlElement(url) {
  const listItem = document.createElement("li");
  const urlSpan = document.createElement("span");
  urlSpan.textContent = url;
  listItem.appendChild(urlSpan);

  const removeButton = createRemoveButton();
  listItem.appendChild(removeButton);
  
  return listItem;

  function createRemoveButton() {
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      chrome.storage.sync.get(["urls"]).then((result) => {
        const urls = result.urls;
        const index = urls.indexOf(url);
        if (index !== -1) {
          urls.splice(index, 1);

          chrome.storage.sync.set({ urls: urls }, () => {
            listItem.remove();
          });
        }
      });
    });
    return removeButton;
  }
}

function addURL(newUrl) {
  chrome.storage.sync.get(["urls"]).then((result) => {
    const urls = result.urls;
    if (urls.includes(newUrl)) {
      return;
    }

    urls.push(newUrl);
    chrome.storage.sync.set({ urls });

    const existingLinksElement = document.getElementById("existingLinks");
    const urlElement = createUrlElement(newUrl);
    existingLinksElement.appendChild(urlElement);
  });
}

