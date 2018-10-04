/*jslint browser: true*/
/*global $, document, window, sessionStorage*/

/* note : to edit bezier parameters got to http://cubic-bezier.com */

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
                scrollLeft: (image.width() - $(window).width()) / 2,
                scrollTop: 0
            }, 1000);
    }
}

function focusInit() {

    var current = sessionStorage.getItem("current");

    if ($(window).height() < $(window).width()) {

        $('#focus > img').attr('src', "images/zoom/horizontal/"+current+".png");

    } else {

        $('#focus > img').attr('src', "images/zoom/vertical/"+current+".png");

    }
}

function focusClear() {

    $('#focus > img').attr('src', "");
}

/** check orientation to display hint or not **/
function onOrientationChange() {

    //console.log("Orientation changed");
    if (sessionStorage.getItem("current") == "none") {

        backgroundInit();

    } else {

        focusInit();

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

$(window).load(function() {

    $('#menu').addClass('loaded');
    $('#loader').fadeOut(1000);
    
    // center the background
    backgroundInit();
});

$(document).ready(function () {
    
    "use strict";
    
    sessionStorage.clear();
    sessionStorage.setItem("current", "none");

    // attach functions to events
    attachToEvents();
    
    $('#player').mediaPlayer();

    // zoom into a part of the background
    $('.zone').on('click', function (e) {
        e.preventDefault();
        
        // hide "a propos"
        $('#apropos').hide();
        
        // clear last info panel
        $('.info').fadeOut(500);
        
        // hide focus image
        $('#focus').fadeOut(500);
        
        // prepare info panel
        var info = $(this).attr('info'),
            last = $(this).attr('last'),
            next = $(this).attr('next');
        
        // show focus and info panel
        setTimeout(function () {

            if (sessionStorage.getItem("current") != info)
            {
                // store last info to go
                sessionStorage.setItem("last", last);

                // store next info to go
                sessionStorage.setItem("next", next);

                // store current info to go
                sessionStorage.setItem("current", info);

                // hide background
                $('#background').fadeOut(500);

                // load appropriate focus image
                focusInit();

                // show focus and info panel and start inerview
                setTimeout(function () {
                    $('#focus').fadeIn(500);
                    $('#'+info).fadeIn(500);
                    $('#'+info).find('.entretien').trigger("click");
                }, 500);

            }
            else {

                sessionStorage.setItem("current", "none");

                $('#background').fadeIn(500);
                $('#apropos').fadeIn(500);

                setTimeout(function () {focusClear();}, 1000);
            }
            
        }, 500);
    });

    // insert "Précédent" button
    $('.description').before('<div class="precedent"><a href="">Précédent</a></div>');
    
    // insert "Suivant" button
    $('.description').before('<div class="suivant"><a href="">Suivant</a></div>');
    
    // insert "Fermer" button
    $('.description').after('<div class="fermer"><a href="">Fermer</a></div>');
    
    // go back to menu and stop player
    $('#focus, .fermer').on('click', function (e) {
        e.preventDefault();
        
        // hide player panel
        $('#player').hide();
        
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
        
        $('.info').fadeOut(500);
        $('#focus').fadeOut(500);
        
        sessionStorage.setItem("current", "none");
        
        setTimeout(function () {
            $('#background').fadeIn(500);
            $('#apropos').fadeIn(500);
            backgroundInit();
        }, 500);
        
        setTimeout(function () {focusClear();}, 1000);
    });
    
    // last
    $('.precedent').on('click', function (e) {
        e.preventDefault();
        
        var last = sessionStorage.getItem("last");
        $(last).trigger("click");
    });
    
    // next
    $('.suivant').on('click', function (e) {
        e.preventDefault();
        
        var next = sessionStorage.getItem("next");
        $(next).trigger("click");
    });
    
    // show about
    $('#apropos').on('click', function (e) {
        e.preventDefault();
        
        $('#apropos').hide();
        $('#about').fadeIn(1000);
    });
    
    // quit about
    $('#about').on('click', function (e) {
        e.preventDefault();
        
        $('#about').fadeOut(1000);
        $('#apropos').fadeIn(1000);
        backgroundInit();
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
        
        if (src != "no") {
            
            audio.attr('src', src);
            //console.log('src', src);
        
            // click on player to play
            controls.click();
        
            // show player
            $('#player').fadeIn(1000);
            
        } else {
            // hide player
            $('#player').hide();
        }
    });
    
	// swipe
	$("#focus").swipe( {
		// generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == "left") {
                var next = sessionStorage.getItem("next");
                $(next).trigger("click");
			}
			if (direction == "right") {
                var last = sessionStorage.getItem("last");
                $(last).trigger("click");
			}			
			if (direction == "up") {
                $('#focus').trigger("click");
			}
		},
        // gefault is 75px, set to 0 for demo so any distance triggers swipe
        threshold:75
	});

});