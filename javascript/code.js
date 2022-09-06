/*
	Jason, Elben, Lily, Fahad
	11/15/2019
	Home Page Code
	This is our home page code for the toxic music
*/

"use strict";
let on;
let off;
//Jquery for toxic music
$(document).ready(function() {
	$("#on").click(function(event) {
		/* Act on the event */
		$("#themeSong")[0].play();
	}); //End of on click
	$("#off").click(function(event) {
		/* Act on the event */
		$("#themeSong")[0].pause();
	}); //End of off click

	$("#themeSong").on('canplaythrough', function(event) {
		$('.toxicMusic').css('display', 'inline-block');
		$("#lblLoad").css('display', 'none');
	}); //End of themeSong on canplaythrough check
}); //End of document ready