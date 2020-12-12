let class_specification1="PNCib";
let class_specification2="MSM1fd";

      let image_div = get_image_div();
      if ( !(image_div===null) ) {
          let image_div_children = image_div.children;
          for (i of image_div_children) {
            if (i.classList[1]==class_specification1 && i.classList[2]==class_specification2) {
              prepare_div(i);
            }
          }
        }


      MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      var observer = new MutationObserver(function(mutations, observer) {
          // fired when a mutation occurs
          for (mutation of mutations){
              if (mutation.target.classList[0]=="isv-r" && mutation.target.classList[1]==class_specification1 && mutation.target.classList[2]==class_specification2) { //bei jedem neu geladenen Bild
                  let pics_div = get_image_div()
                  let pic_div = pics_div.querySelectorAll('[data-ID="' + mutation.target.dataset.id + '"]')[0]; //alle pic_divs werden ausgewählt (Bild + Beschreibungstext)
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

      function div_mouseover_event(div) {
          div.style.background="green";
      }

      function div_mouseleave_event(div) {
          div.style.background=null;
      }

      function prepare_div(pic_div) {

          pic_div.addEventListener("mouseenter", function() {
              div_mouseover_event(pic_div);
          });

          pic_div.addEventListener("mouseleave", function() {
            div_mouseleave_event(pic_div);
      });
    }

      function get_image_div() {
          let image_div = document.getElementById("islrg");
          if (image_div!==null) {
            let image_div_lower = image_div.getElementsByClassName("islrc")[0];
            return image_div_lower;
          } else {
            return null
          }
      }
