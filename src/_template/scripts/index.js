import list from './modules/list'

// https://www.wdiaz.org/how-to-integrate-fancybox-3-on-ghost/
function aTagWrap(elem, elemClass, exclude) {
    var imgs = $(elem);
    if (imgs.length > 0) {
        imgs.each(function () {
            var $this = $(this);
            var imgLink = $this.attr('src'),
                caption = $this.attr('alt');

            if (!$this.hasClass(exclude)) {
                var html = '<a href=\"' + imgLink + '\" class=\"' + elemClass + '\"' +
                    'data-fancybox=\"gallery\" data-caption=\"' + caption + '\"></a>';
                $this.wrap(html);
            }
        });
    }
};

aTagWrap('.post-container img', 'fancy-box', 'no-fancy-box');

console.log(`Hello ${list[0]}`)
