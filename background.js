
/// background.js// background.js

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (!tab.url.startsWith("chrome://") && !tab.url.startsWith("chrome-extension://")) {
      chrome.tabs.executeScript(tabId, { file: 'content.js' }, () => {
        chrome.tabs.sendMessage(tabId, { action: 'openPopup' });
      });
    }
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  // Clear the flag when the tab is removed
  delete tabPopupMap[tabId];
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'contentScriptLoaded') {
    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      focused: true, // Ensure the new window is focused
      width: 300,    // Set the width according to your content
      height: 200    // Set the height according to your content
    });
  }
});
// -------------------------------------------------------------------------------------------
