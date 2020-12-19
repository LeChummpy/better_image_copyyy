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

let imgs =document.getElementsByTagName("IMG"); //auch vorgeladene Bilder preparieren
for (i of imgs) {
  prepare_img(i);
  mark_img_as_prepared(i);
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) { //alle neu geladenen Bilder als prepariert markieren
    // fired when a mutation occurs
    let loaded_imgs;
    for (mutation of mutations) {
      if (mutation.target.tagName=="IMG") {
        if ( !(mutation.target.getAttribute("data-prepariert")=="true") ) { //wenn noch nicht prepariert
          prepare_img(mutation.target);
          mark_img_as_prepared(mutation.target);
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

function copy_to_clipboard(string) {
  navigator.clipboard.writeText(string);
}

function prepare_img(img) {

          let parent_node = img.parentNode;
          let wrapper = document.createElement("div");
          let attr = document.createAttribute("class");
          attr.value="wrapper"
          wrapper.setAttributeNode(attr);
          parent_node.replaceChild(wrapper, img);
          wrapper.appendChild(img);

          wrapper.parentNode.parentNode.style.display="inline-block";
          //wrapper.parentNode.style.margin="0px 0px 0px 0px";
          wrapper.parentNode.style.display="inline-block";
          wrapper.style.display="inline-block";
          img.style.alignContent="center";
          let button = document.createElement("BUTTON");
            button.innerHTML="Copy";
            button.style.position="absolute";
            button.style.right="50%";
            button.style.top="2%";
            button.style.width="50px";
            button.style.height="20px";
            button.style.display="none";
            button.style.transform="translate(+50%, +50%)";
            button.addEventListener("click", function(event) { //Wenn Button gedrückt wird, dann wird Text ins Clipboard kopiert.
              event.stopPropagation();
              event.preventDefault();
              event.cancelBubble = true;
              event.stopImmediatePropagation();

              clipboardcontent = get_clipboard_content_from_HTMLImage(img);
              copy_to_clipboard(clipboardcontent);

          });
          wrapper.appendChild(button);

          wrapper.addEventListener("mouseenter", function() {
              div_of_img_mouseover_event(wrapper);
          });

          wrapper.addEventListener("mouseleave", function() {
              div_of_img_mouseleave_event(wrapper);
      });
}

function mark_img_as_prepared(htmlImage) {
  let attr = document.createAttribute("data-prepariert");
  attr.value = "true";
  htmlImage.setAttributeNode(attr);
}


function div_of_img_mouseover_event(div) {
    let btns = div.getElementsByTagName("button");
    for (i of btns) {
      i.style.display="block";
    }
}

function div_of_img_mouseleave_event(div) {
  let btns = div.getElementsByTagName("button");
  for (i of btns) {
    i.style.display="none";
  }
}
