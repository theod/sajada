/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    
    "use strict";

    /******************************
    * Main
    *******************************/
    
    localStorage.clear();
    
    // zoom into a part of the background
    
    $('#tapis-01').on('click', function (e) {
        e.preventDefault();
        $('.menu-zone').hide();
        $('#view').show();
        $('#info').fadeIn(1000);
        $('#menu').animate({    backgroundSize : '210%',
                                    backgroundPositionX : -450,
                                    backgroundPositionY : -85
                               }, 1000, $.bez([0.3, 0.75, 0.4, 1])); /* http://cubic-bezier.com */
    });
    
    $('#tapis-02').on('click', function (e) {
        e.preventDefault();
        $('.menu-zone').hide();
        $('#view').show();
        $('#info').fadeIn(1000);
        $('#menu').animate({    backgroundSize : '200%',
                                    backgroundPositionX : -1100,
                                    backgroundPositionY : -85
                               }, 1000, $.bez([0.3, 0.75, 0.4, 1])); /* http://cubic-bezier.com */
    });

    // zoom back
    $('#view').on('click', function (e) {
        e.preventDefault();
        $('#menu').animate({    backgroundSize : '100%',
                                    backgroundPositionX : 0,
                                    backgroundPositionY : 0
                               }, 1000, $.bez([0.3, 0.75, 0.4, 1]));
        $('#view').hide();
        $('#info').fadeOut(1000);
        $('.menu-zone').fadeIn(1000);
    });
});