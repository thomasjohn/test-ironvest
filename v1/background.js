const API_CHECK_HOST = "http://localhost:4000/check-host/";

// helper functions
async function checkHost(hostOrigin) {
  //const response = await fetch("./server-test-data.json");
  const response = await fetch(API_CHECK_HOST + encodeURIComponent(hostOrigin));
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const result = await response.json();
  return result;
}

//run
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.name) {
    case "check-host":
      checkHost(message.par)
        .then((res) => {
          sendResponse(res);
        })
        .catch(() => {
          sendResponse({ error: true });
        });
      break;
  }
  return true;
});
