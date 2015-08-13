(function($) {
    "use strict";
    $.easypop = function(options) {
        var defaults = {
            drag: true,
            closeBtn: true,
            clickOnOverlayer: true
        };

        var settings = $.extend(defaults, options);
        var tpl = {
            overlay: '<div class="easy-overlay"></div>',
            contents: settings.contents,
            closeBtn: '<a href="javascript:$.easypop.close();" class="easy-close">&#x58;</a>'
        }



        $('body').prepend(tpl.overlay);

        var overlay = $('.easy-overlay');

        overlay.append(tpl.contents).fadeIn();
    }

    $.easypop.close = function() {
        var overlay = $('.easy-overlay');
        overlay.fadeOut(function() {
            $(this).remove();
        });
    }
}(jQuery));
