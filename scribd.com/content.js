const revealPage = () => {
    let pages = document.querySelectorAll('.outer_page');

    Array.from(pages).forEach(page => {
        try {
            // remove promo pop-up from page

            let promo = page.querySelector('.auto__doc_page_webpack_doc_page_blur_promo');
            promo.parentElement.removeChild(promo);

            // Search for blured text and set to normal

            let blurWraps = page.querySelectorAll('[class^="ff"]');
            blurWraps.forEach(blurGroup => {
                Array.from(blurGroup.children).forEach(span => {
                    Object.assign(span.style, {
                        webkitTransition: 'all .5s',
                        transition: 'all .5s'
                    });
                });

                Array.from(blurGroup.children).forEach(span => {
                    span.style.textShadow = 'black 0px 0px 1px';
                    span.style.userSelect = 'text';
                    span.removeAttribute('unselectable');
                });
            });

            // Search for blured images and set to normal

            let blurImages = page.querySelectorAll('img');
            Array.from(blurImages).forEach(img => {
                Object.assign(img.style, {
                    webkitTransition: 'all .5s',
                    transition: 'all .5s'
                });
            });

            Array.from(blurImages).forEach(img => (img.style.opacity = 1));

            document.querySelectorAll('.page_missing_explanation').forEach(ele => {
                ele.remove()
            })
        } catch (err) { }
    });
}
var interval;
(function(){
    chrome.runtime.onMessage.addListener(receiveedMessage);

    function receiveedMessage(message, sender, sendResponse) {
        if (message.content == 'clean') {
            interval = setInterval(revealPage,200);
        }

        else if(message.content == 'stop'){
            clearInterval(interval);
        }
        else if (message.content == 'openurl'){
            window.location = message.url;
        }
    }
})();