import init_modals from './modals';
import init_ui_events from './uievents';

export default function init_svg_events(){
  //this function is called after the svgs have been loaded
  init_ui_events();
  init_modals();
};





