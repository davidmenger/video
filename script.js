(function ($) {

    /**
     * Tady doplnit videa. Zalezi na velikosti pismen a video musi byt ve
     * stejnem adresari jako script.js
     */
    var videos = {
        12: 'chlebounova.mp4',
        32: 'Cirkus.mp4'
    }

    function makeVideo (link) {
        $('.ready').hide();

        $('#mount')
            .removeClass('is-hidden')
            .html('<video autoplay><source src="' + link + '" type="video/mp4"></video>');

        $('video').one('ended', function () {
            $('#mount')
                .addClass('is-hidden')
                .html('');
            $('.ready').show();
        });
    }

    function toggleFullScreen() {
        if (!document.fullscreenElement
            && !document.webkitFullscreenElement
            && !document.mozFullscreenElement) {

            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    var chars = [];

    var lookingfor;

    $(document).on('keyup', function (e) {

        if (e.key === 'f' || e.key === 'F') {
            toggleFullScreen();
            return;
        } else if (isNaN(parseInt(e.key, 10))) {
            return;
        }

        chars.push(e.key);

        if (chars.length > 5) {
            chars.shift();
        }

        lookingfor = chars.slice(-2).join('');

        console.log(lookingfor);

        if (typeof videos[lookingfor] !== 'undefined') {
            chars = [];
            makeVideo(videos[lookingfor]);
            lookingfor = '';
        }

        $('.nums').text(lookingfor);


    });

})(window.$);