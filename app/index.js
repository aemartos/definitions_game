/**
 * Application entry point
 */

// Load application styles
import 'styles/index.sass';
import {city, country, Persona} from './world';

import Translator from './translator';

// ================================
// START YOUR APP HERE
// ================================


//----------- TRANSLATIONS ----------------


var trans = new Translator("es");

//$("#remp").html(trans.t("hola"));
//$("#replaced").html(trans.t("adios"));


//$("").html(trans.t(""));
$(".main_text").html(trans.t("¿te atreves con este reto? tienes una hora para completar y superar nuestro muro de palabras, sobre uso seguro de internet y las TIC"));
$(".text_elab").html(trans.t("una aplicación de"));
$(".start_game_text").html(trans.t("empezar prueba"));
$(".credits").html(trans.t("créditos"));
$(".time_text").html(trans.t("tiempo"));
$(".score_text").html(trans.t("puntos"));







//------------------------------------------

//Example of simple jquery code working
/*$("#replaced").html("Hello World");*/

//example of creation of new object from other file
/*var peter = new Persona("Pedro", 16, true, "General Margallo 17");

$("#replaced").html(peter.saluda());

document.getElementById('output').innerHTML = `${peter.despidete()} ${city}, ${country()}`;*/



//------------ TRANSFORM IMG SVG TO INLINE SVG ------------

jQuery('img.svg').each(function(){
  var $img = jQuery(this);
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');

  jQuery.get(imgURL, function(data) {
    // Get the SVG tag, ignore the rest
    var $svg = jQuery(data).find('svg');

    // Add replaced image's ID to the new SVG
    if(typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
    }
    // Add replaced image's classes to the new SVG
    if(typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass+' replaced-svg');
    }

    // Remove any invalid XML tags as per http://validator.w3.org
    $svg = $svg.removeAttr('xmlns:a');

    // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
    if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    }

    // Replace image with new SVG
    $img.replaceWith($svg);

  }, 'xml');

});

