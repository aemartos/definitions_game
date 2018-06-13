import {state, set_initial_state, UI_CONFIG} from './config/config';
import UIManager from './uimanager';
import handleOrientationChange from './carousel';

export default class EventManager{
  constructor(){
    this.start_button = $('#start_button');
    this.reset_game = $("#reset_game");
    this.end_game = $("#end_game");
    this.final_game = $("#final_game");
    this.check_letter = $('#check_box');
    this.inputValue = $("#main_input");

    this.score = $('.score_number');
    this.enterfullScreenButton = $('#enterfullscreen');
    this.exitfullScreenButton = $('#exitfullscreen');
    this.burger_button = $("#burger_button");
    this.language_arrow = $("#lang_arrow");
    this.timeinterval = {};
    this.ui = {};

    this.fullscreenChange = this.fullscreenChange.bind(this);
    this.togglefullscreen = this.togglefullscreen.bind(this);

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.checkLetter = this.checkLetter.bind(this);
    this.updateClock = this.updateClock.bind(this);
    this.add_ui_manager = this.add_ui_manager.bind(this);
    this.letterClicked = this.letterClicked.bind(this);
    this.nextLetter = this.nextLetter.bind(this);
    this.wildcardClicked = this.wildcardClicked.bind(this);
  }
  add_ui_manager(uimanager){
    this.ui = uimanager;
  }
  add_modal_manager(modalmanager){
    this.mm = modalmanager;
  }
  init_ui(){
    this.start_button.on('click', this.startGame);
    this.reset_game.on('click', this.resetGame);
    this.final_game.on('click', this.resetGame);
    this.end_game.on('click', this.endGame);
    this.check_letter.on('click', this.checkLetter);
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
      $('#l_arrow').toggleClass('closed');
    });

    //owl carousel, to show definitions in mobile devices

    UI_CONFIG.mediaquery1.addListener(handleOrientationChange);
  	UI_CONFIG.mediaquery2.addListener(handleOrientationChange);

    //add letters events
    $(document).on("click", ".letter", this.letterClicked);
    $(document).on("click", ".w_wild", this.wildcardClicked);
    $(document).on("click", "#next_arrow", this.nextLetter);
    $(document).on("keyup", "#main_input", this.checkLetter);
  }
  startGame(){
    state.game_started = true;
    //start clock
    this.timeinterval = setInterval(this.updateClock, 1000);
    this.ui.render(state);
  }
  resetGame(){
  	set_initial_state();
    this.ui.render(state);
  }
  endGame(){
    state.game_ended = true;
    state.time_paused = true;
    this.ui.render(state);
  }
  updateClock(){
    if(!state.time_paused){
      state.time = state.time -1;
      this.ui.render(state, ["score"]);
    }
  }
  letterClicked(event){
    state.actual_letter = parseInt($(event.currentTarget).attr("index"));
    this.ui.render(state, ["definitions"]);
    this.inputValue.focus();
  }
  nextLetter(event){
    if (state.actual_letter===24) {
      state.actual_letter = 0;
    } else {
    	state.actual_letter++
    }
    this.ui.render(state, ["definitions"]);
    this.inputValue.val("");
    this.inputValue.focus();
  }
  checkLetter(event){
    if (!event.keyCode || event.keyCode === 13) {

      if (state.letters[state.actual_letter].answer.toLowerCase()==this.inputValue.val().toLowerCase()) {
        state.letters[state.actual_letter].right = true;
        state.score = state.score + state.letters[state.actual_letter].score;
        this.score.html(state.score);
        state.success++;
      } else {
        state.letters[state.actual_letter].right = false;
      }
      state.progress++;
      this.nextLetter();
      this.ui.render(state, ["score", "definitions"]);
      if(state.progress===25){
        console.log("fin juego");
        state.game_ended = true;
        this.mm.openModal("modalFinal");
      }
    }

  }
  wildcardClicked(event){
    console.log("wildcard clicked");
    console.log(event.currentTarget);
    this.inputValue.focus();
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
        $(this.enterfullScreenButton).removeClass('hide');
        $(this.exitfullScreenButton).addClass('hide');
      } else{
        $(this.enterfullScreenButton).addClass('hide');
        $(this.exitfullScreenButton).removeClass('hide');
      }
    }

}
