// Load application styles
import 'index.sass';

//import from vendor
import './vendor/isotope.pkgd.min';
import './vendor/owl.carousel.min';
import './vendor/popmotion.global.min';

//import our stuff
import svgs_inline from './svgmanager';
import Translator from './translator';
import TranslatorManager from './translatormanager';
import EventManager from './eventmanager';
import UIManager from './uimanager';
import ModalManager from './modals';
import {state, set_initial_state} from './config/config';

//------------------------------------------
$(document).ready(function(){
	//load imgs and transform them to svgs inline
	//after that (so asyncronously) init events that depends on the svgs

  //create translator manager and call update for the first time
  var trans = new Translator("es");
  var tm = new TranslatorManager(trans);
  tm.update();
  //tm.changeLocale("en");
  set_initial_state();

	let promises_array = svgs_inline("img.svg");

	$.when.apply($, promises_array).then(()=>{
		//this function is called after the svgs have been loaded
		const ev = new EventManager();
		const mm = new ModalManager(ev);
    ev.add_modal_manager(mm);
		const ui = new UIManager(ev, trans);
		ev.add_ui_manager(ui);

		ui.render(state);
	  setTimeout(()=>ev.init_ui(), 500);
		mm.init_modals();
    mm.add_ui_manager(ui);


		//ev.init_game();
	});


});
