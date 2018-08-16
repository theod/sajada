/*jslint browser: true*/
/*global $*/

$(document).ready(function () {
    
    "use strict";
    
    $('#tapis-player').mediaPlayer();

    // zoom into a part of the background
    
    $('#tapis-maha').on('click', function (e) {
        e.preventDefault();
        $('.menu-zone').hide();
        $('.tapis-view').show();
        $('#tapis-maha-info').fadeIn(1000);
        $('#menu').animate({    backgroundSize : '210%',
                                backgroundPositionX : -450,
                                backgroundPositionY : -85
                               }, 1000, $.bez([0.3, 0.75, 0.4, 1])); /* http://cubic-bezier.com */
    });
    
    $('#tapis-chadia').on('click', function (e) {
        e.preventDefault();
        $('.menu-zone').hide();
        $('.tapis-view').show();
        $('#tapis-chadia-info').fadeIn(1000);
        $('#menu').animate({    backgroundSize : '200%',
                                backgroundPositionX : -1060,
                                backgroundPositionY : -85
                               }, 1000, $.bez([0.3, 0.75, 0.4, 1])); /* http://cubic-bezier.com */
    });

    // zoom back
    $('.tapis-view').on('click', function (e) {
        e.preventDefault();
        $('#menu').animate({    backgroundSize : '100%',
                                backgroundPositionX : 0,
                                backgroundPositionY : 0
                               }, 1000, $.bez([0.3, 0.75, 0.4, 1]));
        $('.tapis-view').hide();
        $('.tapis-info').fadeOut(1000);
        $('.menu-zone').fadeIn(1000);
    });
});