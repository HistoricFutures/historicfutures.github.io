// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
/* equal-heights js */
/*global window, $, jQuery*/
(function ($) {
    "use strict";
    $.fn.equalHeights = function (widthThreshold) {
        var self = this,
            nodeObjects = [],
            heights = [],
            tallest;
        $(window).on("load resize", function () {
            self.children().each(function (i) {
                $(this).css("height", "");
                var height = $(this).height(),
                    paddingTop = Math.ceil(parseFloat($(this).css("padding-top"))),
                    paddingBottom = Math.ceil(parseFloat($(this).css("padding-bottom"))),
                    borderTop = Math.ceil(parseFloat($(this).css("border-top-width"))),
                    borderBottom = Math.ceil(parseFloat($(this).css("border-bottom-width"))),
                    totalHeight = height + paddingTop + paddingBottom + borderBottom + borderTop;
                nodeObjects[i] = {
                    height: height,
                    paddingTop: paddingTop,
                    paddingBottom: paddingBottom,
                    borderTop: borderTop,
                    borderBottom: borderBottom,
                    totalHeight: totalHeight
                };
                heights[i] = totalHeight;
            });
        });
        $(window).on("load resize", function () {
            if (widthThreshold && $(window).width() < widthThreshold) {
                return false;
            }
            self.children().each(function (i) {
                var diff,
                    oldHeight = $(this).height(),
                    newHeight;
                tallest = Math.max.apply(Math, heights);
                diff = tallest - nodeObjects[i].totalHeight;
                newHeight = oldHeight + diff;
                $(this).height(newHeight);
            });
        });
    };
}(jQuery));

$(document).ready(function() {
  var navpos = $('nav').offset();
  console.log(navpos.top);
    $(window).bind('scroll', function() {
      if ($(window).scrollTop() > navpos.top) {
        $('nav').addClass('fixed');
       }
       else {
         $('nav').removeClass('fixed');
       }
    });
});


$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

