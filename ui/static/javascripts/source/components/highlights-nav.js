var $ = require('component-dom');
var inViewport = require('component-in-viewport');
var debounce = require('debounce');

module.exports = {
    init: function () {

        var $nav = $('.Highlights-nav');
        var $block = $('.Highlights-block');
        var $link = $('.Highlights-navLink');
        var $wrapper = $nav.parent('.Wrapper');

        $nav.on('click', '.Highlights-navLink', function ( e ) {

            e.preventDefault();

            var $el = $(e.delegateTarget);

            $wrapper.removeClass('is-flairRightInactive');
            $wrapper.removeClass('is-flairLeftInactive');
            $link.removeClass('is-active');
            $el.addClass('is-active');
            $block.removeClass('is-active');
            $('#' + $el.attr('data-block')).addClass('is-active');

            if ( $el.hasClass('Highlights-navLink--posts') ) {
                $wrapper.addClass('is-flairRightInactive');
            } else {
                $wrapper.addClass('is-flairLeftInactive');
            }

        });

    }
};
