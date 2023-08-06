
// Listen for messages from the popup script
chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    if (message.action === 'calculate_profit') {
      const result = calculate(difference);
      port.postMessage({ result });
    }
  });
});

function calculate(difference) {
  if (difference === 0) {
    return "No change";
  } else if (difference > 0) {
    return `Profit: ${difference}`;
  } else {
    return `Loss: ${difference}`;
  }
}
