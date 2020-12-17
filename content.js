chrome.runtime.sendMessage({text:"focus me!"}, function (response) {});

chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.text=="item downloaded.") {
      if (msg.downloaded_item.mime==="image/jpeg" || msg.downloaded_item.mime==="image/png" ) {
      let clipboardcontent = get_clipboard_content_from_downloadItem(msg.downloaded_item);
      copy_to_clipboard(clipboardcontent);
    }

  } else if(msg.text=="You have been refocused!") {
    console.log("This tab was refocused by background script.");

  } else if(msg.text=="You have been focused!") {
    console.log("This tab was focused by background script.");

  }
});

document.addEventListener("dragstart", function(event){
  let dragged_element = event.target;
  if (dragged_element.nodeName==="IMG") {
    let clipboardcontent = get_clipboard_content_from_HTMLImage(dragged_element);
    copy_to_clipboard(clipboardcontent);
  }
});

let class_specification="eHAdSb";
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    for (mutation of mutations){
      //console.log(mutation.target)
        if (mutation.target.getAttribute("class")===class_specification) { //bei jedem neu geladenen Bild
          let data_ved_of_id = mutation.target.dataset.ved;
          let pic_a = document.querySelectorAll('[data-ved="' + data_ved_of_id + '"]')[0];

          if ( !(pic_a.getAttribute("data-prepared")==="true") ) {
            attr = document.createAttribute("data-prepared");
            attr.value="true";
            pic_a.setAttributeNode(attr);

            prepare_a(pic_a);
        }

          }
      }
    });

var body_container = document.body;
observer.observe(body_container, {
  subtree: true,
  attributes: true
});

//--------------------------helping functions---------------------------------------------

function get_clipboard_content_from_downloadItem(downloadItem) {
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

function get_clipboard_content_from_HTMLImage(htmlImage) {
  src = htmlImage.src;

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

function get_clipboard_content_from_a(htmlA) {
  let child_image = htmlA.getElementsByTagName("img")[0];
  src = child_image.src;

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

function prepare_a(pic_a) {

          let button = document.createElement("BUTTON");
          let icon = document.createElement("img");
            icon.src=chrome.extension.getURL("rsc/clipboard_icon.png");
            icon.style.width="70%";
            icon.style.height="80%";
            icon.style.margin="auto";
            icon.style.position="absolute";
            icon.style.left=0;
            icon.style.right=0;
            icon.style.top=0;
            icon.style.bottom=0;
            button.appendChild(icon);
          button.style.position="absolute";
          button.style.right=0;
          button.style.bottom=0;
          button.style.width="25px";
          button.style.height="25px";
          button.style.display="none";
          //button.innerHTML='<img src="https://freeiconshop.com/wp-content/uploads/edd/clipboard-outline-filled.png"></img>';


          button.addEventListener("click", function(e) { //Wenn Button gedrückt wird, dann wird Text ins Clipboard kopiert.
            clipboardcontent = get_clipboard_content_from_a(pic_a);
            console.log(clipboardcontent);
            copy_to_clipboard(clipboardcontent);
          });
          pic_a.appendChild(button);

          pic_a.addEventListener("mouseenter", function() {
              div_mouseover_event(pic_a);
          });

          pic_a.addEventListener("mouseleave", function() {
            div_mouseleave_event(pic_a);
      });

}

function div_mouseover_event(a) {
    let btns = a.getElementsByTagName("button");
    for (i of btns) {
      i.style.display="block";
    }
}

function div_mouseleave_event(a) {
  let btns = a.getElementsByTagName("button");
  for (i of btns) {
    i.style.display="none";
  }
}
