/*jslint browser: true*/
/*global $, document, window, sessionStorage*/

/* note : to edit bezier parameters got to http://cubic-bezier.com */

$(document).ready(function () {
    
    "use strict";
    
    sessionStorage.clear();
    
    /******************************
    * Definitions
    *******************************/
    
    function backgroundSetup() {
        
        // get zoom and scroll position to reach
        var zoom = sessionStorage.getItem("zoom"),
            scrollLeft = sessionStorage.getItem("scrollLeft"),
            scrollTop = sessionStorage.getItem("scrollTop");
        
        //console.log('backgroundSetup: zoom = ', zoom);
        //console.log('backgroundSetup: scrollLeft = ', scrollLeft);
        //console.log('backgroundSetup: scrollTop = ', scrollTop);
        
        $('#background').animate({zoom: zoom,
                           scrollLeft: scrollLeft,
                           scrollTop: scrollTop
                           }, 1000, $.bez([0.3, 0.75, 0.4, 1]));
    }
    
    function backgroundInit() {
        
        var image = $('#background > picture > img');
        
        // store zoom and scroll position to reach
        sessionStorage.setItem("zoom", 1.0);
        
        if ($(window).height() < $(window).width()) {
            sessionStorage.setItem("scrollLeft", 0);
            sessionStorage.setItem("scrollTop", (image.height() - $(window).height()) / 2);
        } else {
            sessionStorage.setItem("scrollLeft", (image.width() - $(window).width()) / 2);
            sessionStorage.setItem("scrollTop", 0);
        }
        
        backgroundSetup();
    }
    
    /** check orientation to display hint or not **/
    function onOrientationChange() {

        //console.log("Orientation changed");

        if (sessionStorage.getItem("zoom") == 1.0) {
            backgroundInit();
        } else {
            backgroundSetup();
        }
    }
    
    function attachToEvents() {

        // attach to orientation change 
        var query = window.matchMedia("(orientation:landscape)");
        
        query.addListener(onOrientationChange);
    }
    
    /******************************
    * Main
    *******************************/
    
    // center the background
    backgroundInit();
    
    // attach functions to events
    attachToEvents();
    
    $('#player').mediaPlayer();

    // zoom into a part of the background
    $('.tapis').on('click', function (e) {
        e.preventDefault();
        
        // focus on the "tapis" zone
        var image = $('#background > picture > img'),
            info = $(this).attr('info'),
            zoom = $(this).attr('zoom'),
            scrollLeft = $(this).attr('scrollLeft') * image.width(),
            scrollTop = $(this).attr('scrollTop') * image.height();
        
        // store zoom and scroll position to reach
        sessionStorage.setItem("zoom", zoom);
        sessionStorage.setItem("scrollLeft", scrollLeft);
        sessionStorage.setItem("scrollTop", scrollTop);
        
        backgroundSetup();
        
        $('#view').show();
        $(info).fadeIn(1000);
    });

    // insert "Retour" button
    $('.description').before('<div class="tapis-retour col-md-1 col-md-offset-11"><a href=""><p>Retour</p></a></div>');
    
    // insert Play button
    $('.entretien p').before('<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" width="50" height="50"><g><polygon points="0,0 100,50 0,100" fill="#009EF8" stroke-width="0"></polygon></g></svg>');
    
    // zoom back
    $('#view, .retour').on('click', function (e) {
        e.preventDefault();
        
        backgroundInit();
        
        $('.info').fadeOut(1000);
        $('#view').hide();
    });
    
    // play
    $('.entretien').on('click', function (e) {
        e.preventDefault();
        
        // get player controls
        // if playing, stop the player
        var controls = $('#player').find('.controls'),
            status = $('#player').find('svg').attr('class');
        
        status = status.replace('playable', '').trim();
        //console.log('status', status);
        
        // if playing, click on player to stop
        if (status == 'playing') {
            controls.click();
        }
        
        // get source to play
        // set player source
        var src = $(this).attr('src'),
            audio = $('#player').find('audio');
        
        audio.attr('src', src);
        //console.log('src', src);
        
        // click on player to play
        controls.click();
        
        // show player panel
        $('#player-panel').fadeIn(1000);
        
        // get label
        var label = $(this).attr('label');
        //console.log('label', label);
        
        // set player label
        $('#player-label').text(label);
    });

});