chrome.runtime.sendMessage({text:"focus me!"}, function (response) {
  if(response==="You have been focused!") {
    console.log("This tab was focused by background script.");
  }
});

chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.text=="item downloaded.") {
      let clipboardcontent = get_clipboard_content(msg.downloaded_item);
      copy_to_clipboard(clipboardcontent);
    }
});

function get_clipboard_content(downloadItem) {
  src = downloadItem.url;

  today = new Date();
            day = today.getDate();
            month = parseInt(today.getMonth(), 10) + 1;
            year = today.getFullYear();
            date_string = day + ". " + month + ". " + year;

            hours = today.getHours();
            minutes = today.getMinutes();
            if (minutes<10) time_string = hours + ":" + "0" +  minutes;
            else time_string = hours + ":" + minutes;

  return "(" + src + " / "+ date_string + " " + time_string + ")";
}

function copy_to_clipboard(string) {
  navigator.clipboard.writeText(string);
}
