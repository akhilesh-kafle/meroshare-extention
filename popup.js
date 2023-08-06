document.addEventListener("DOMContentLoaded", function () {
    const calculateButton = document.getElementById("calculate");
    const resultElement = document.getElementById("result");
  
    calculateButton.addEventListener("click", () => {
      // Send a message to the background script
      chrome.runtime.sendMessage({ action: 'calculate_profit' }, (response) => {
        if (response) {
          resultElement.textContent = response;
        }
      });
    });
  });
  