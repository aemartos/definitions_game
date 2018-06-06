import init_modals from './modals';
import init_ui_events from './uievents';
import game_interactions from './gameinteract';
import {INTERNET_DEFINITIONS} from './config/definitions';
import {state} from './config/config';


export default function init_svg_events(){
  //this function is called after the svgs have been loaded
  init_ui_events();
  init_modals();
  game_interactions(state, INTERNET_DEFINITIONS);
};





