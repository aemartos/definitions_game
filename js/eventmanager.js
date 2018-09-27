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
    this.mobileAndTabletCheck = this.mobileAndTabletCheck.bind(this);
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

    //call function handleOrientationChange when there is a change in this media query, either entering or exiting it
    UI_CONFIG.mediaquery1.addListener(handleOrientationChange);
    //call function handleOrientationChange when there is a change in this media query, either entering or exiting it
  	UI_CONFIG.mediaquery2.addListener(handleOrientationChange);

    //add letters events
    $(document).on("click", ".letter", this.letterClicked);
    $(document).on("click", ".w_wild", this.wildcardClicked);
    $(document).on("click", "#next_arrow", this.nextLetter);
    $(document).on("click", ".owl-prev", this.prevLetter);
    $(document).on("click", ".owl-next", this.nextLetter);
    $(document).on("keyup", this.keyup);
    $(document).on("keyup", "#main_input", this.checkLetter);
    $(document).on("click", ".lang", this.changeLocale);
  }
  mobileAndTabletCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
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
            this.nextLetter(undefined, false);
          } else {
            this.prevLetter(undefined, false);
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
    if (!number || typeof number === 'object') {
      number = state.actual_letter;
    }
    if (state.actual_letter === state.letters.length - 1) {
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
    if (!number || typeof number === 'object') {
      number = state.actual_letter;
    }
    if (state.actual_letter === 0) {
      number = state.letters.length - 1;
    }
    if (!state.letters[number - 1].answered) {
      this.goToLetter(number - 1, false);
    } else {
      number--;
      this.nextLetter(number);
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
      if(this.mobileAndTabletCheck()) {
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
          //tate.letters[state.actual_letter].second_try = false;
          state.score = state.score + state.letters[state.actual_letter].score;
          this.score.html(state.score);
          state.success++;
        } else {
          //wrong answer
          if (state.letters[state.actual_letter].wildcards['twotries']) {
            state.letters[state.actual_letter].right = undefined;
            //remove the wildcard from this letter:
            state.letters[state.actual_letter].wildcards['twotries'] = false;
            //state.letters[state.actual_letter].second_try = true;
          } else {
            state.letters[state.actual_letter].right = false;
          }
        }
        state.letters[state.actual_letter].answered = true;
        state.progress++;
        if (state.letters[state.actual_letter].right) {
          this.nextLetter();
        } else {
          this.goToLetter(state.actual_letter);
        }
        this.ui.render(state, ["score", "definitions", "wildcards"]);
        $('.tip_explanation').addClass('hide');
        if(state.progress===state.letters.length){
          console.log("fin juego");
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
