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

