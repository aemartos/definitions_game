

// Load application styles
import 'index.sass';
import {city, country, Persona} from './world';

import './vendor/isotope.pkgd.min';
import './vendor/owl.carousel.min';
import './vendor/popmotion.global.min';
import svgs_inline from './svgmanager';
import TranslatorManager from './translatormanager';
import init_events from './eventmanager';


//------------------------------------------

//Example of simple jquery code working
/*$("#replaced").html("Hello World");*/

//example of creation of new object from other file
/*var peter = new Persona("Pedro", 16, true, "General Margallo 17");

$("#replaced").html(peter.saluda());

document.getElementById('output').innerHTML = `${peter.despidete()} ${city}, ${country()}`;*/



//------------- INIT FUNCTIONS ----------------

function init_app(){
	let promises_array = svgs_inline("img.svg");
	$.when.apply($, promises_array).then(init_events);
	var tm = new TranslatorManager("es");
	tm.update();
	//tm.changeLocale("en");
	
}

$(document).ready(function(){
	init_app();

	mediaquery1.addListener(handleOrientationChange);
	mediaquery2.addListener(handleOrientationChange);
	handleOrientationChange();
	removeHover();
});




//-------- LANGUAJE MENU -----------

  var accordion = function (className) {
    var item = $(className);
    item.toggleClass("closed");
    if (item.css('max-height') == '0px'){
      item.css('max-height', item.prop("scrollHeight") + 20 + "px");
    } else {
      item.css('max-height', '0');
    }
  };

  //////////OPEN LANGUAJE //////////

  var language_arrow = $("#lang_arrow");

  language_arrow.on("click", function() {
    $('#l_arrow').toggleClass("closed");
    accordion(".other_languages");
  });



// -------- REMOVE HOVER ONTOUCH -----------
 
function removeHover(){
  if ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) { 
    try { // prevent exception on browsers not supporting DOM styleSheets properly
      for (var si in document.styleSheets) {
        var styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;

        for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;

          if (styleSheet.rules[ri].selectorText.match(':hover')) {
              styleSheet.deleteRule(ri);
          }
        }
      }
    } catch (ex) {}
  }
}

// ------------ OWL CROUSEL MEDIA ----------------

var mediaquery1 = matchMedia("(max-width: 1024px) and (orientation: portrait)");
var mediaquery2 = matchMedia("(max-width: 980px)");

function handleOrientationChange(mediaquery) {
	console.log("holi");
  if (mediaquery1.matches || mediaquery2.matches) {

		$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    dots: true,
    //dots: false,
    //nav: true,
		navText: ["<div class='owl-prev'><img class='control control_left_arrow svg'src='/assets/images/icons/left_arrow_fill.svg'/></div>","<div class='owl-next'><img class='control control_right_arrow svg'src='/assets/images/icons/right_arrow_fill.svg'/></div>"],
    responsiveClass: true,
    responsiveBaseElement: ".word-wall",
    responsive:{
        0:{
            items:1,
            nav:true,
            dots: false
        },
        500:{
            items:4,
            nav:false
        },
        1000:{
            items:5,
            loop:false
        }
	    }
		});

  } else {
  	 $('.owl-carousel').owlCarousel('destroy');
  }
}




//----------- CURSOR FOCUS ---------------







