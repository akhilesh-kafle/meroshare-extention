// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'calculate_profit') {
      // Retrieve the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        // Send a message to the content script of the active tab
        chrome.scripting.executeScript(
          {
            target: { tabId: activeTab.id },
            function: calculateProfit,
          },
          (result) => {
            if (chrome.runtime.lastError) {
              console.error("error from meroshare extention: ",chrome.runtime.lastError);
              return;
            }
            // Send the result back to the popup
            sendResponse(result[0].result);
          }
        );
      });
      // Return true to indicate that we will respond asynchronously
      return true;
    }
  });
  
  function calculateProfit() {
    //code for data extraction
    var tableRows = document.querySelectorAll("tr");
    if (tableRows.length > 0) {
        var lastRowIndex = tableRows.length - 1;
        var chil = tableRows[lastRowIndex];
      } else {
        console.error("No table rows found.");
      }
    const list = [];
    for (const child of chil.children) {
      list.push(child);
    }
    //console.log("list",list);
    var previous = parseFloat(list[1].innerText.slice(3).replace(/,/g, ""));
    var asof = parseFloat(list[3].innerText.slice(3).replace(/,/g, ""));
    const difference = asof - previous;
    //console.log("previous",previous);
    //console.log("asof",asof);
    //console.log("differences",difference);
  
    if (difference === 0) {
      return "No change";
    } else if (difference > 0) {
      return `Profit: ${difference}`;
    } else {
      return `Loss: ${difference}`;
    }
  }
  