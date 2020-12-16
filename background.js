chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text == "focus me!") {
        focused_tab = sender.tab.id;
        sendResponse("You have been focused!");

        chrome.downloads.onCreated.addListener(function(item) {
          chrome.tabs.sendMessage(focused_tab, {text:"item downloaded.", downloaded_item:item});
            //chrome.downloads.cancel(item.id);
});
    }
});
