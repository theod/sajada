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
    
    // insert play button
    $('.play p').before('<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" width="50" height="50"><g><polygon points="0,0 100,50 0,100" fill="#009EF8" stroke-width="0"></polygon></g></svg>');
    
    // play
    $('.play').on('click', function (e) {
        e.preventDefault();
        
        // get player controls
        var controls = $('#tapis-player').find('.controls');
        
        // if playing, stop the player
        var status = $('#tapis-player').find('svg').attr('class');
        status = status.replace('playable', '').trim();
        console.log('status', status);
        
        // if playing, click on player to stop
        if (status == 'playing')
            controls.click();
        
        // get source to play
        var src = $(this).attr('src');
        console.log('src', src);
        
        // set player source
        var audio = $('#tapis-player').find('audio');
        audio.attr('src', src);
        
        // click on player to play
        controls.click();
    });
});