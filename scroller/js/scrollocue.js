"use strict";

(function (window, $) {

    $.fn.scrollocue = function (options) {

        // Handle given options and default settings.
        var settings = $.extend({
                lineSelector: 'h1, p',
                scrollDuration: 1000,
                scrollEasing: 'easeOutQuad'
            }, options),
            container = this,
            cursor = -1,
            lines = $(settings.lineSelector, container);

        // Set the cursor to the given line.
        function setCursor(index) {
            var oldElement, newElement, desired_cursor_top, target_container_top;
            // Clear old cursor position
            if (lines[cursor]) {
                oldElement = $(lines[cursor]);
                oldElement.removeClass('cursor');
            }
            // Update new cursor position
            cursor = (index >= 0) ? ((index < lines.length) ? index : lines.length - 1) : 0;
            if (lines[cursor]) {
                newElement = $(lines[cursor]);
                newElement.addClass('cursor');
                // Scroll container
                desired_cursor_top = ($(window).height() - newElement.height()) / 2;
                target_container_top = container.offset().top - (newElement.offset().top - desired_cursor_top);
                container.stop(true).animate(
                    {top: target_container_top},
                    {duration: settings.scrollDuration, easing: settings.scrollEasing}
                );
            }
        }

        function increaseCursor(amount) {
            amount = amount || 1;
            setCursor(cursor + amount);
        }

        function decreaseCursor(amount) {
            amount = amount || 1;
            setCursor(cursor - amount);
        }

        // Key press handling
        function handleKeyDown(event) {
            switch (event.which) {
            case 40: // Arrow down
            case 32: // Space
                increaseCursor();
                event.preventDefault();
                break;
            case 38: // Arrow up
                decreaseCursor();
                event.preventDefault();
                break;
            case 74: // "j": down.
                increaseCursor();
                break;
            case 75: // "k": up.
                decreaseCursor();
                break;
            case 49: // "1": jump to first.
                setCursor(0);
                break;
            case 82: // "r": quick reset.
                container.css('top', 0);
                setCursor(0);
                break;
            default:
                if (window.console) {
                    window.console.info('Unhandled key down event ' + event.which, event);
                }
                break;
            }
        }

        // Set cursor at first line
        setCursor(0);

        // Set up key press handling.
        $(window.document).keydown(handleKeyDown);

        // Click handling
        container.click(function (event) {
            // If clicking above current active element, scroll up by one
            if (event.pageY < $(lines[cursor]).offset().top) { return decreaseCursor(); }
            // If at bottom, return to top on click
            if (cursor === lines.length - 1) { return setCursor(0); }
            // Else just scroll down
            increaseCursor();
        });

        // Mobile swiping
        $(container).swipe({
            swipeUp: function () {
                console.log('swiped up');
                increaseCursor();
            },
            swipeDown: function () {
                console.log('swiped down');
                decreaseCursor();
            },
            threshold: 50,
            cancelThreshold: 15
        });

    };


    // Define easeOutQuad easing function if not available yet.
    $.easing.easeOutQuad = $.easing.easeOutQuad || function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };


}(window, $));
