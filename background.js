chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) { //if new page is loaded
    if (msg.text == "focus me!") {
        focused_tab = sender.tab.id;
          sendResponse({});
          chrome.tabs.sendMessage(focused_tab, {text:"You have been focused!"});

          chrome.downloads.onCreated.addListener(function(item) {
            chrome.tabs.sendMessage(focused_tab, {text:"item downloaded.", downloaded_item:item});
});
    }
});

chrome.tabs.onActiveChanged.addListener(function(tabID) {
  chrome.tabs.sendMessage(tabID, {text:"You have been refocused!"});

  chrome.downloads.onCreated.addListener(function(item) {
    chrome.tabs.sendMessage(tabID, {text:"item downloaded.", downloaded_item:item});
});
});
