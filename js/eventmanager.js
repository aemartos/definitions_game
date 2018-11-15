import {state, set_initial_state, UI_CONFIG} from './config/config';
import UIManager from './uimanager';
import handleOrientationChange from './carousel';

export default class EventManager{
  constructor(translatormanager){
    this.tm = translatormanager;
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

    this.clicks = 0;

    this.timeinterval = {};
    this.ui = {};

    this.fullscreenChange = this.fullscreenChange.bind(this);
    this.togglefullscreen = this.togglefullscreen.bind(this);

    this.startGame = this.startGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.finalScreen = this.finalScreen.bind(this);
    this.checkLetter = this.checkLetter.bind(this);
    this.updateClock = this.updateClock.bind(this);
    this.add_ui_manager = this.add_ui_manager.bind(this);
    this.letterClicked = this.letterClicked.bind(this);
    this.nextLetter = this.nextLetter.bind(this);
    this.prevLetter = this.prevLetter.bind(this);
    this.wildcardClicked = this.wildcardClicked.bind(this);
    this.goToLetter = this.goToLetter.bind(this);
    this.keyup = this.keyup.bind(this);
    this.changeLocale = this.changeLocale.bind(this);
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
    if (UI_CONFIG.finish_screen) {
      this.final_game.on('click', this.finalScreen);
      this.cross_final.on('click', this.finalScreen);
    } else {
      this.final_game.on('click', this.resetGame);
      this.cross_final.on('click', this.resetGame);
    }
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

    //call function handleOrientationChange when there is a change in this media query, either entering or exiting it
    UI_CONFIG.mediaquery1.addListener(handleOrientationChange);
    //call function handleOrientationChange when there is a change in this media query, either entering or exiting it
  	UI_CONFIG.mediaquery2.addListener(handleOrientationChange);

    //add letters events
    $(document).on("click", ".letter", this.letterClicked);
    $(document).on("click", ".w_wild", this.wildcardClicked);
    $(document).on("click", "#next_arrow", ()=>{this.nextLetter(state.actual_letter)});
    $(document).on("click", "button.owl-prev", ()=>{this.prevLetter(state.actual_letter)});
    $(document).on("click", "button.owl-next", ()=>{this.nextLetter(state.actual_letter)});
    $(document).on("keyup", this.keyup);
    $(document).on("keyup", "#main_input", this.checkLetter);
    $(document).on("click", ".lang", this.changeLocale);
  }

  changeLocale(event){
    this.tm.changeLocale($(event.currentTarget).html());
    state.lang = $(event.currentTarget).html();
    this.ui.accordion($(event.currentTarget));
    this.ui.render(state, ["lang"]);
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
    clearTimeout(this.timeinterval);
  }
  endGame(){
    state.game_ended = true;
    state.time_paused = true;
    this.ui.render(state);
  }
  finalScreen(){
    //round to 2 decimals maximun (grade out to ten)
    //state.grade = (Math.round((state.average*10)/100*100))/100;
    state.grade = (Math.round(state.average*10))/100;
    console.log(state.average, state.grade);
    this.rightWords = $('.right-words');
    this.totalWords = $('.total-words');
    this.testAverage = $('.test-average');
    this.rightWords.text(state.success);
    this.totalWords.text(state.letters.length);
    this.testAverage.text(state.grade);
    this.ui.render_finishScreen();
    //this.ui.render(finishScreen);
  }
  updateClock(){
    if(!state.time_paused){
      state.time = state.time -1;
      this.ui.render(state, ["score"]);
    }
  }
  keyup(event){
    if(!this.mm.isOpenedModal()){
      if(event.keyCode === 39 || event.keyCode === 37) {
        if(!$("#main_input").is(":focus")){
          if(event.keyCode===39){
            this.nextLetter(state.actual_letter, false);
          } else {
            this.prevLetter(state.actual_letter, false);
          }
        }
      }
    }
  }
  letterClicked(event){
    var number = parseInt($(event.currentTarget).attr("index"));
    this.goToLetter(number);
  }

  nextLetter(number, event, with_focus){
    if (number === state.letters.length - 1) {
      number = -1;
    }
    if (!state.letters[number + 1].answered) {
      this.goToLetter(number + 1, false);
    } else {
      number++;
      this.nextLetter(number);
    }
  }

  prevLetter(number, event, with_focus){
    if (number === 0) {
      number = state.letters.length;
    }
    if (!state.letters[number - 1].answered) {
      this.goToLetter(number - 1, false);
    } else {
      number--;
      this.prevLetter(number);
    }
  }

  goToLetter(number, with_focus){
    state.previous_letter = state.actual_letter;
    state.actual_letter = number;
    state.active_wildcard = "";
    var letter_wildcards = Object.keys(state.letters[state.actual_letter].wildcards);
    for (var i = 0; i < letter_wildcards.length; i++) {
      if (state.letters[state.actual_letter].wildcards[letter_wildcards[i]] === true) {
        state.active_wildcard = letter_wildcards[i];
      }
    }
    $('.tip_explanation').addClass('hide');
    this.ui.render(state, ["definitions", "wildcards"]);
    if(with_focus!==false){
      //detect touch devices
      if("ontouchstart" in document.documentElement) {
        this.inputValue.blur();
      } else {
        this.inputValue.focus();
      }
    }
  }

  checkLetter(event){
    if(!this.mm.isOpenedModal()){
      if (!event.keyCode || event.keyCode === 13) {
        if (state.letters[state.actual_letter].answer.toLowerCase()==this.inputValue.val().toLowerCase()) {
          //right answer
          state.letters[state.actual_letter].right = true;
          state.letters[state.actual_letter].answered = true;
          //tate.letters[state.actual_letter].second_try = false;
          state.score = state.score + state.letters[state.actual_letter].score;
          this.score.html(state.score);
          state.success++;
        } else {
          //wrong answer
          if (state.letters[state.actual_letter].wildcards['twotries']) {
            state.letters[state.actual_letter].right = undefined;
            state.letters[state.actual_letter].answered = false;
            //remove the wildcard from this letter:
            state.letters[state.actual_letter].wildcards['twotries'] = false;
          } else {
            state.letters[state.actual_letter].right = false;
            state.letters[state.actual_letter].answered = true;
          }
        }
        state.progress++;
        if (state.letters[state.actual_letter].right) {
          this.nextLetter(state.actual_letter);
        } else {
          this.goToLetter(state.actual_letter);
        }
        this.ui.render(state, ["score", "definitions", "wildcards"]);
        $('.tip_explanation').addClass('hide');
        if(state.progress===state.letters.length){
          state.game_ended = true;
          this.mm.openModal("modalFinal");
        }
      }
    }
  }
  wildcardClicked(event){
    var wildcard_id = $(event.currentTarget).attr("id");

    //if the wildcard has not been used in the actual letter
    //we will put it to true and decrease the wildcard count

    if(state.active_wildcard===wildcard_id){
      state.active_wildcard = "";
    } else {
      state.active_wildcard = wildcard_id;
    }
    //particular stuff of each wildcard
    var zones_to_rerender = [];
    switch(wildcard_id) {
      case "additionaltip":
      case "numberletters":
      case "twotries":
          if(!state.letters[state.actual_letter].wildcards[wildcard_id]){
            state.letters[state.actual_letter].wildcards[wildcard_id] = true;
            state.wildcards[wildcard_id] = state.wildcards[wildcard_id]-1;
          }
          zones_to_rerender = ["wildcards"];
        break;
      case "nextletter":
          var extra = 0;
          if(state.letters[state.actual_letter].starts_or_contains==="start"){
            extra = 1;
          }
      //if wildcards left and can show another extra letter
          if(state.wildcards[wildcard_id]>0 && state.letters[state.actual_letter].answer.length>state.letters[state.actual_letter].wildcards[wildcard_id]+extra){
            state.letters[state.actual_letter].wildcards[wildcard_id]++;
            state.wildcards[wildcard_id] = state.wildcards[wildcard_id]-1;
          }
            zones_to_rerender = ["definitions","wildcards"];
        break;
    }
    this.ui.render(state, );

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
