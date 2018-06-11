import {state} from './config/config';
import UIManager from './uimanager';
import handleOrientationChange from './carousel';

export default class EventManager{
  constructor(){
    this.start_button = $('#start_button');
    this.enterfullScreenButton = $('#enterfullscreen');
    this.exitfullScreenButton = $('#exitfullscreen');
    this.burger_button = $("#burger_button");
    this.language_arrow = $("#lang_arrow");
    this.timeinterval = {};
    this.ui = {};

    this.startGame = this.startGame.bind(this);
    this.updateClock = this.updateClock.bind(this);
    this.add_ui_manager = this.add_ui_manager.bind(this);
    this.letterClicked = this.letterClicked.bind(this);
    this.wildcardClicked = this.wildcardClicked.bind(this);
  }
  add_ui_manager(uimanager){
    this.ui = uimanager;
  }
  init_ui(){
    this.start_button.on('click', this.startGame);
    window.addEventListener('fullscreenchange', this.fullscreenChange);
    window.addEventListener('webkitfullscreenchange', this.fullscreenChange);
    window.addEventListener('mozfullscreenchange', this.fullscreenChange);
    window.addEventListener('MSFullscreenChange', this.fullscreenChange);
    this.enterfullScreenButton.on('click', this.togglefullscreen);
    this.exitfullScreenButton.on('click', this.togglefullscreen);

    this.burger_button.on("click", (e)=>{
      this.ui.accordion($(e.target));
    });
    this.language_arrow.on("click", (e)=>{
      this.ui.accordion($(e.target));
    });

    //owl carousel, to show definitions in mobile devices
    var mediaquery1 = matchMedia("(max-width: 1024px) and (orientation: portrait)");
    var mediaquery2 = matchMedia("(max-width: 980px)");
    mediaquery1.addListener(handleOrientationChange);
  	mediaquery2.addListener(handleOrientationChange);
    handleOrientationChange();

    //add letters events
    $(document).on("click", ".letter", this.letterClicked);
    $(document).on("click", ".w_wild", this.wildcardClicked);
  }
  startGame(){
    state.game_started = true;
    //start clock
    this.timeinterval = setInterval(this.updateClock, 1000);
    this.ui.render(state);
  }
  updateClock(){
    //console.log("update clock");
    if(!state.time_paused){
      state.time = state.time -1;
      this.ui.render(state, ["score"]);
    }
  }
  letterClicked(event){
    console.log("letter clicked");
    console.log(event.currentTarget);
    //falta añadir el index en letter
    //cogerlo aqúí y actualizar el state y llamar a render

  }
  wildcardClicked(event){
    console.log("wildcard clicked");
    console.log(event.currentTarget);

  }
  togglefullscreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if(document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msCancelFullScreen) {
            document.msCancelFullScreen();
        }
    }

  }
  fullscreenChange(){
      //this method is called whenever a fullscreenChange event is fired.
      //we change state here and not in the other methods because fullscreen can be toggled also with keys, not only buttons
      if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        console.log("no fullscreen");
        this.enterfullScreenButton.removeClass('hide');
        this.exitfullScreenButton.addClass('hide');
      } else{
        console.log("fullscreen");
        this.enterfullScreenButton.addClass('hide');
        this.exitfullScreenButton.removeClass('hide');
      }
    }

}
