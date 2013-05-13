/*!
 * jquery.tiles.js 0.0.2 - https://github.com/yckart/jquery.tiles.js
 * Splits images in as many tiles as you want, even with a gap.
 *
 * Copyright (c) 2013 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/05/13
 **/

;(function ($) {

    var pluginName = "tiles",
        defaults = {
            x: 2, // tiles in x axis
            y: 2, // tiles in y axis
            gap: {
                x: 1,
                y: 1
            }
        };

    function Plugin(elem, options) {

        options = $.extend({}, defaults, options);

        var $elem = $(elem).wrap("<div class='tiles-wrapper' />"),
            width = $elem.outerWidth(),
            height = $elem.outerHeight(),
            n_tiles = options.x * options.y,
            tiles = [];

        $elem.parent(".tiles-wrapper").css({
            position: "relative",
            width: width,
            height: height
        });

        while (n_tiles--) {
            tiles.push("<div class='tile' />");
        }

        var $tiles = $(tiles.join(""));

        // Hide original image and insert tiles in DOM
        $elem.hide().after($tiles);

        // Set backgrounds
        $tiles.css({
            float: "left",
            width: (width / options.x) - (options.gap.x || options.gap),
            height: (height / options.y) - (options.gap.y || options.gap),
            marginRight: options.gap.x || options.gap,
            marginBottom: options.gap.y || options.gap,
            backgroundImage: "url(" + $elem[0].src + ")"
        });

        // Adjust position
        $tiles.each(function () {
            var pos = $(this).position();
            this.style.backgroundPosition = -pos.left + "px " + -pos.top + "px";
        });

    }

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            new Plugin(this, options);
        });
    };

}(jQuery));