MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    for (mutation of mutations){
        if (mutation.target.classList[0]=="isv-r" && mutation.target.classList[1]=="PNCib" && mutation.target.classList[2]=="MSM1fd") { //bei jedem neu geladenen Bild
            let pic_div = get_image_div().querySelectorAll('[data-ID="' + mutation.target.dataset.id + '"]')[0]; //alle pic_divs werden ausgewählt (Bild + Beschreibungstext)

            pic_div.addEventListener("mouseenter", function() {
                pic_div.style.border = '5px dotted orange';
            });

            pic_div.addEventListener("mouseleave", function() {
              pic_div.style.border = null;
            });

        }
    }
});

var body_container = document.body;
observer.observe(body_container, {
  subtree: true,
  attributes: true
});
//-----------------------------------------------helping functions-------------------------------------------------------------------------------------

function get_image_div() {
  let image_div = document.getElementById("islrg").getElementsByClassName("islrc")[0];
  return image_div;
}
