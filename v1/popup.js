// helper functions

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function apiCall(hostOrigin) {
  // popup side version (make async)

  //   const res = await fetch("./server.json");
  //   response = await res.json();
  //   console.log(response);

  // worker side version
  chrome.runtime.sendMessage(
    { name: "check-host", par: hostOrigin },
    (response) => {
      if (response.error) {
        alert("no api access");
        return;
      }

      // show info to user
      if (response["host-valid"]) alert("valid");
      else alert("not valid");
    }
  );
}

function checkUrl() {
  getCurrentTab().then((tab) => {
    if (tab === undefined) {
      alert("error code: TU");
      return;
    }

    const tabId = tab.id;
    chrome.tabs.sendMessage(tabId, "get-host", (hostOrigin) => {
      apiCall(hostOrigin);
    });
  });
}

// run

function start() {
  const button = document.getElementById("check");
  button.addEventListener("click", () => {
    checkUrl();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  start();
});
