/**
 * Application entry point
 */

// Load application styles
import 'styles/index.sass';
import {city, country, Persona} from './world';

import './vendor/isotope.pkgd.min';
import './vendor/owl.carousel.min';
import './vendor/popmotion.global.min';
import svgs_inline from './svgmanager';
import TranslatorManager from './translatormanager';
import init_events from './eventmanager';
// ================================
// START YOUR APP HERE
// ================================



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
	console.log("LEN " + promises_array.length);
	$.when.apply($, promises_array).then(init_events);
	var tm = new TranslatorManager("es");
	tm.update();
	//tm.changeLocale("en");
	
}


init_app();





//---------------- OWL CAROUSEL ----------------


/*$('.owl-carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:true,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:5
      }
  }
});*/


