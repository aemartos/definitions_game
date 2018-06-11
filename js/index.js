// Load application styles
import 'index.sass';

//import from vendor
import './vendor/isotope.pkgd.min';
import './vendor/owl.carousel.min';
import './vendor/popmotion.global.min';

//import our stuff
import svgs_inline from './svgmanager';
import TranslatorManager from './translatormanager';
import EventManager from './eventmanager';
import UIManager from './uimanager';
import ModalManager from './modals';
import {INTERNET_DEFINITIONS} from './config/definitions';
import {state} from './config/config';

//------------------------------------------
$(document).ready(function(){
	//load imgs and transform them to svgs inline
	//after that (so asyncronously) init events that depends on the svgs

	INTERNET_DEFINITIONS.letters.forEach((elem, index) => {
		elem.right = undefined;		
		state.letters.push(elem);
	})

	let promises_array = svgs_inline("img.svg");

	$.when.apply($, promises_array).then(()=>{
		//this function is called after the svgs have been loaded
		const ev = new EventManager();
		const mm = new ModalManager(ev);
		const ui = new UIManager(ev);
		ev.add_ui_manager(ui);


		ui.render(state);
	  ev.init_ui();
		mm.init_modals();

		//ev.init_game();
	});

	//create translator manager and call update for the first time
	var tm = new TranslatorManager("es");
	tm.update();
	//tm.changeLocale("en");
});
