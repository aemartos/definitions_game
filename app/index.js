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

var trans = new Translator("ru");


//Example of simple jquery code working
$("#replaced").html("Hello World");

//example of creation of new object from other file
var peter = new Persona("Pedro", 16, true, "General Margallo 17");

$("#replaced").html(peter.saluda());

document.getElementById('output').innerHTML = `${peter.despidete()} ${city}, ${country()}`;


$("#remp").html(trans.t("hola"));
$("#replaced").html(trans.t("adios"));
