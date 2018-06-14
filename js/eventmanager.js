import {state, set_initial_state, UI_CONFIG} from './config/config';
import UIManager from './uimanager';
import handleOrientationChange from './carousel';

export default class EventManager{
  constructor(){
    this.start_button = $('#start_button');
    this.reset_game = $("#reset_game");
    this.end_game = $("#end_game");
    this.final_game = $("#final_game");
    this.cross_final = $("#modalFinal .control_cross");
    this.check_letter = $('#check_box');
    this.inputValue = $("#main_input");

    this.score = $('.score_number');
    this.enterfullScreenButton = $('#enterfullscreen');
    this.exitfullScreenButton = $('#exitfullscreen');
    this.burger_button = $("#burger_button");
    this.language_arrow = $("#lang_arrow");

    this.wildTip = $('#additionaltip');
    this.wildTwo = $('#twotries');
    this.wildNumber = $('#numberletters');
    this.wildLetter = $('#nextletter');

    this.clicks = 0;

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
    this.prevLetter = this.prevLetter.bind(this);
    this.wildcardClicked = this.wildcardClicked.bind(this);
    this.goToLetter = this.goToLetter.bind(this);
    this.keyup = this.keyup.bind(this);
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
    this.cross_final.on('click', this.resetGame);
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
    $(document).on("keyup", this.keyup);
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
  keyup(event){
    if(event.keyCode === 39 || event.keyCode === 37) {
      if(!$("#main_input").is(":focus")){
        if(event.keyCode===39){
          this.nextLetter(undefined, false );
        } else {
          this.prevLetter(undefined, false);
        }
      }
    }
  }
  letterClicked(event){
    var number = parseInt($(event.currentTarget).attr("index"));
    this.goToLetter(number);
  }
  nextLetter(event, with_focus){
        var number = state.actual_letter;
        if (state.actual_letter===24) {
          number = 0;
        } else {
        	number++;
        }
        this.goToLetter(number, with_focus);
  }
  prevLetter(event, with_focus){
        var number = state.actual_letter;
        if (state.actual_letter===0) {
          number = 24;
        } else {
        	number--;
        }
        this.goToLetter(number, with_focus);
  }
  goToLetter(number, with_focus){
    state.actual_letter = number;
    if(state.letters[state.actual_letter].wildcards.additionaltip === true){
        state.active_wildcard = "additionaltip";
    } else {
      state.active_wildcard = "";
    }
    if(with_focus){
      this.inputValue.focus();
    }
    $('.tip_explanation').addClass('hide');
    this.ui.render(state, ["definitions", "wildcards"]);
    //this.inputValue.val("");
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
      this.ui.render(state, ["score", "definitions", "wildcards"]);
      $('.tip_explanation').addClass('hide');
      if(state.progress===25){
        console.log("fin juego");
        state.game_ended = true;
        this.mm.openModal("modalFinal");
      }
    }

  }
  wildcardClicked(event){
    console.log("wildcard clicked");
    console.log($(event.currentTarget).attr("id"));
    var wildcard_id = $(event.currentTarget).attr("id");
    this.inputValue.focus();
    //if the wildcard has not been used in the actual letter ç
    //we will put it to true and decrease the wildcard count

    if(state.active_wildcard===wildcard_id){
      state.active_wildcard = "";
    } else {
      state.active_wildcard = wildcard_id;
    }
    //particular stuff of each wildcard
    switch(wildcard_id) {
      case "additionaltip":
      case "numberletters":
          if(!state.letters[state.actual_letter].wildcards[wildcard_id]){
            state.letters[state.actual_letter].wildcards[wildcard_id] = true;
            state.wildcards[wildcard_id] = state.wildcards[wildcard_id]-1;
          }
        break;
      case "twotries":
        break;
      case "nextletter":
            state.letters[state.actual_letter].wildcards[wildcard_id]++;
            state.wildcards[wildcard_id] = state.wildcards[wildcard_id]-1;
        break;
    }
    this.ui.render(state, ["wildcards"]);

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
