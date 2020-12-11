MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let all_images=[];
var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    for (mutation of mutations){
      //console.log(mutation);
        if (mutation.target.dataset.id!==undefined) {
            console.log(mutation.target.dataset.id);
            //let element = document.querySelectorAll('[data-ID="' + mutation.target.dataset.id + '"]');
            let pic_divs = document.getElementById("islrg").getElementsByClassName("islrc")[0].childNodes;
            console.log(pic_divs);
        }
    }
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
var body_container = document.documentElement || document.body;
observer.observe(body_container, {
  subtree: true,
  attributes: true
});
