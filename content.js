MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    for (mutation of mutations){
        if (mutation.target.classList[0]=="isv-r") { //bei jedem neu geladenen Bild
            console.log(mutation.target.dataset.id);
            let pic_div = document.getElementById("islrg").getElementsByClassName("islrc")[0].childNodes; //alle pic_divs werden ausgewählt (Bild + Beschreibungstext)
        }
    }
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
var body_container = document.body;
observer.observe(body_container, {
  subtree: true,
  attributes: true
});
