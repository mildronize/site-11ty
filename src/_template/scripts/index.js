import list from './modules/list'

window.$ = window.jQuery = require("jquery");

// https://www.wdiaz.org/how-to-integrate-fancybox-3-on-ghost/
function aTagWrap(elem, elemClass, exclude) {
    var imgs = $(elem);
    if (imgs.length > 0) {
        imgs.each(function () {
            var $this = $(this);
            var imgLink = $this.attr('src'),
                caption = $this.attr('alt');

            if (!$this.hasClass(exclude)) {
                // var html = '<a href=\"' + imgLink + '\" class=\"' + elemClass + '\"' +
                //     'data-fancybox=\"gallery\" data-caption=\"' + caption + '\"></a>';

                var html =  '<div class=\"image\">' +
                    '<div class=\"placeholder\" data-large=\"' + imgLink + '"\" data-caption=\"'+ caption +'\" >' + 
                    '<img src=\"https://ce8be7dec.cloudimg.io/bound/100x100/q20/"' + imgLink + '"\" class=\"placeholder-img-small\">' +
                    '<div class=\"placeholder-ratio\"></div>'+
                '</div>' +
                '</div>';
            
                $this.wrap(html);
            }
        });
    }
};

aTagWrap('.post-container img', 'fancy-box', 'no-fancy-box');

        // Origin code from: https://jmperezperez.com/medium-image-progressive-loading-placeholder/
        
        document.querySelectorAll(".placeholder").forEach(function (placeholder) {
            // 1: load small image and show it
            placeholder.querySelectorAll("img").forEach(function (smallImage) {
              var img = new Image();
              img.src = smallImage.src;
              img.onload = function () {
                  smallImage.classList.add('loaded');
                  // estimate ratio with thumbnail size
                  var ratio = img.height * 100  / img.width;
                  placeholder.querySelector(".placeholder-ratio").setAttribute("style", "padding-bottom: " + ratio + "%;");
              };
            });
          
            // 2: load large image
            var imgLarge = new Image();
              imgLarge.src = placeholder.dataset.large;
              imgLarge.setAttribute("data-src", placeholder.dataset.large);
              imgLarge.onload = function () {
                  imgLarge.classList.add('loaded');
                  // Recorrect ratio with actual size
                  var ratio = imgLarge.height  * 100 / imgLarge.width;
                  placeholder.querySelector(".placeholder-ratio").setAttribute("style", "padding-bottom: " + ratio + "%;");
              };

              // attach fancybox
              var a = document.createElement('a');
              a.setAttribute("data-caption", placeholder.dataset.caption);
              a.setAttribute("data-fancybox", "gallery");
              a.href = placeholder.dataset.large;
              document.body.appendChild(a);
              a.appendChild(imgLarge);
              placeholder.appendChild(a);
          
            });

console.log(`Hello ${list[0]}`);

let postViewer = (url) => {
    // console.log(url);
    let id = url.replace("/posts/", "");
    id = id.replace("/", "");
    // console.log(id);
    $.get(`https://mildronize-blog-views.now.sh/?id=${id}`)
        .done(function(response) {
            $("#viewer").html(`- ${response.total} VIEWS`);
        });
};

(function(window){

    window.EntryPoint = {
        postViewer
    }
})(window)