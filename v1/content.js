// helper functions
const getHostOrigin = () => `${location.protocol}//${location.host}`;

// run
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message) {
    case "get-host":
      sendResponse(getHostOrigin());
      break;
  }
});
