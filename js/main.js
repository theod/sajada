/*jslint browser: true*/
/*global $, document, window, sessionStorage*/

/* note : to edit bezier parameters got to http://cubic-bezier.com */

$(window).load(function() {
    $("body").addClass('loaded');
});

$(document).ready(function () {
    
    "use strict";
    
    sessionStorage.clear();
    
    /******************************
    * Definitions
    *******************************/
    
    function backgroundInit() {
        
        var image = $('#background > picture > img'),
            background = $('#background');
        
        if ($(window).height() < $(window).width()) {
            background.animate({
                    scrollLeft: 0,
                    scrollTop: (image.height() - $(window).height()) / 2
                }, 1000);
        } else {
            background.animate({
                    scrollLeft: (image.height() - $(window).height()) / 2,
                    scrollTop: 0
                }, 1000);
        }
    }
    
    /** check orientation to display hint or not **/
    function onOrientationChange() {

        //console.log("Orientation changed");
        backgroundInit();
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
    $('.zone').on('click', function (e) {
        e.preventDefault();
        
            
        var background = $('#background'),
            apropos = $('#apropos');
        
        // hide "a propos"
        apropos.hide();
        
        // clear last focus panel
        $('.focus').fadeOut(1000);
        
        // display new focus panel
        var focus = $(this).attr('focus'),
            next = $(this).attr('next');
        
        if (sessionStorage.getItem("current") != focus)
        {
            // store next focus to go
            sessionStorage.setItem("next", next);
        
            background.fadeOut(1000);
            $(focus).fadeIn(1000);
            
            // store current focus to go
            sessionStorage.setItem("current", focus);
        }
        else {
            
            sessionStorage.setItem("current", "none");
            
            background.fadeIn(1000);
            apropos.fadeIn(1000);
        }
    });

    // insert "Retour" button
    $('.description').before('<div class="retour"><a href="">Retour</a></div>');
    
    // insert "Suivant" button
    $('.description').before('<div class="suivant"><a href="">Suivant</a></div>');
    
    // insert Play button
    $('.entretien a').before('<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" width="50" height="50"><g><polygon points="0,0 100,50 0,100" fill="#009EF8" stroke-width="0"></polygon></g></svg>');
    
    // zoom back
    $('.retour').on('click', function (e) {
        e.preventDefault();
        
        $('.focus').fadeOut(1000);
        
        sessionStorage.setItem("current", "none");
        
        $('#background').fadeIn(1000);
        $('#apropos').fadeIn(1000);
    });
    
    // next
    $('.suivant').on('click', function (e) {
        e.preventDefault();
        
        $('.focus').fadeOut(1000);
        
        var next = sessionStorage.getItem("next");
        
        $(next).trigger("click");
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
        $('#player-label').text("À l'écoute : " + label);
    });

});