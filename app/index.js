/**
 * Application entry point
 */

// Load application styles
import 'styles/index.scss';
import {city, country, Greeter} from './world';

// ================================
// START YOUR APP HERE
// ================================

//Example of simple jquery code working
$("#replaced").html("Hello World");

//example of creation of new object from other file
var g = new Greeter("Hola desde");

document.getElementById('output').innerHTML = `${g.greet()} ${city}, ${country()}`;
