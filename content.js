let class_specification0="isv-r";
let class_specification1="PNCib";
let class_specification2="MSM1fd";

      let image_div = document.getElementsByClassName("islrc")[0];
      if ( !(image_div===null) && !(image_div===undefined) ) {
          let image_div_children = image_div.children;
          for (i of image_div_children) {
            if (i.classList[0]==class_specification0 && i.classList[1]==class_specification1 && i.classList[2]==class_specification2) {
              prepare_div(i);
            }
          }
        }

      MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      var observer = new MutationObserver(function(mutations, observer) {
          // fired when a mutation occurs
          for (mutation of mutations){
              if (mutation.target.classList[0]==class_specification0 && mutation.target.classList[1]==class_specification1 && mutation.target.classList[2]==class_specification2) { //bei jedem neu geladenen Bild
                  let pic_div = document.querySelectorAll('[data-ID="' + mutation.target.dataset.id + '"]')[0]; //neu geladenes Div wird ausgewählt, prepariert
                  if ( !(pic_div===undefined) ) {
                      prepare_div(pic_div);
                }
            }
          }
      });

      var body_container = document.body;
      observer.observe(body_container, {
        subtree: true,
        attributes: true
      });

      //-----------------------------------------------helping functions-------------------------------------------------------------------------------------

      function prepare_div(pic_div) {
              let prepared_fragezeichen = pic_div.getAttribute("data-prepared");

              if( prepared_fragezeichen==="false" || prepared_fragezeichen===undefined || prepared_fragezeichen===null) { //wenn div noch nicht prepared
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
                button.style.left=0;
                button.style.top=0;
                button.style.width="25px";
                button.style.height="25px";
                button.style.display="none";
                //button.innerHTML='<img src="https://freeiconshop.com/wp-content/uploads/edd/clipboard-outline-filled.png"></img>';


                button.addEventListener("click", function() { //Wenn Button gedrückt wird, dann wird Text ins Clipboard kopiert.
                  clipboard_content = get_clipboard_content(pic_div);
                  copy_to_clipboard("plain_text", clipboard_content);
                });
                pic_div.appendChild(button);

                pic_div.addEventListener("mouseenter", function() {
                    div_mouseover_event(pic_div);
                });

                pic_div.addEventListener("mouseleave", function() {
                  div_mouseleave_event(pic_div);
            });
                let attribute = document.createAttribute("data-prepared"); //div als prepared markiert
                attribute.value = "true";
                pic_div.setAttributeNode(attribute);
    }
  }

      function div_mouseover_event(div) {
          let btns = div.getElementsByTagName("button");
          for (i of btns) {
            i.style.display="block";
          }
      }

      function div_mouseleave_event(div) {
        let btns = div.getElementsByTagName("button");
        for (i of btns) {
          i.style.display="none";
        }
      }

      function get_clipboard_content(div) {
          a_with_href_of_image = div.getElementsByTagName("a")[1];
          src = a_with_href_of_image.getAttribute("href");

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

      function copy_to_clipboard(method, string) {
        if (method=="plain_text") {
          navigator.clipboard.writeText(string);
        } else if (method=="image+plain_text") {
          //copy text and image to clipboard

        }
      }

/*
      function get_image_div() {
          let image_div = document.getElementById("islrg");
          if (image_div!==null) {
            let image_div_lower = image_div.getElementsByClassName("islrc")[0];
            return image_div_lower;
          } else {
            return null
          }
      }
*/
