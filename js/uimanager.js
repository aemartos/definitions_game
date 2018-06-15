//class that manages the UI
import handleOrientationChange from './carousel';
import {UI_CONFIG} from './config/config';

export default class UIManager{
  constructor(eventmanager, translator){
      this.ev = eventmanager;
      this.trans = translator;

      this.letterWall = $('.letter-wall');
      this.explanation = $('.text_explanation');
      this.lettersNumber = $('.text_number');
      this.wordTitle = $('.title_word');
      this.wordDef = $('.word_definition');
      this.mainInput = $('#main_input');

      this.wild_tip = $('.w_t_tip');
      this.wild_two = $('.w_t_tries');
      this.wild_number = $('.w_t_number');
      this.wild_letter = $('.w_t_letter');

      this.wildTip = $('#w_tip');
      this.wildTwo = $('#w_two_tries');
      this.wildNumber = $('#w_number');
      this.wildLetter = $('#w_letter');

      this.progress = $(".number_answered");
      this.progress_fill = $('.progress_fill');

      this.start_button = $('#start_button');
      this.game = $('.main_game');
      this.initial_text = $('.main_text');
      this.initial_controls = $('.control_text');
      this.game_controls = $('.controls_menu');
      this.game_controls_mob = $('.controls_menu_mob');
      this.game_score = $('.progress_score');
      this.clock = $("#clock");

      this.curr_lang = $("#curr_lang");
      this.other_languages = $("#other_languages");

      this.count_answer_letters = this.count_answer_letters.bind(this);
      this.render_lang = this.render_lang.bind(this);
  }
  accordion(item) {
    //get .accordion_menu parent
    var parent = item.closest(".accordion_menu");
    var accordion = parent.children(".accordion");
    accordion.toggleClass("closed");
    if (accordion.css('max-height') == '0px'){
      accordion.css('max-height', accordion.prop("scrollHeight") + 20 + "px");
    } else {
      accordion.css('max-height', '0');
    }
  }
  toHHMMSS(sec_num) {
      //function that transforms seconds (number) in "hours:minutes:seconds" (string)
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      if(parseInt(hours) > 0){
        return hours+':'+minutes+':'+seconds;
      } else {
        return minutes+':'+seconds;
      }
  }
  render_lang(state){
    this.curr_lang.html(state.lang);
    let locales = this.trans.getLocales();
    locales = locales.filter(item => item !== state.lang);
    var langs = "";
    for (var i = 0; i < locales.length; i++) {
      langs += '<li class="lang">' + locales[i] + '</li>';
    }
    this.other_languages.html(langs);
  }
  render_buttons(state){
    if(state.game_started){
      //when game started
      this.initial_text.addClass('hide');
      this.game.removeClass('hide');
      this.initial_controls.addClass('hide');
      this.game_controls.removeClass('hide');
      this.game_controls_mob.removeClass('hide');
      $("#main_input").focus();
    } else {
      this.initial_text.removeClass('hide');
      this.game.addClass('hide');
      this.initial_controls.removeClass('hide');
      this.game_controls.addClass('hide');
      this.game_controls_mob.addClass('hide');
    }
  }
  render_score(state){
    if(state.game_started){
      //when game started
      this.game_score.removeClass('hide');
      this.clock.html(this.toHHMMSS(state.time));
      this.progress.html( state.progress + "/" + state.letters.length);
      var fill = (state.progress)*105/state.letters.length;
      this.progress_fill.css("width", fill + "%");
    } else {
      this.game_score.addClass('hide');
    }
  }
  count_answer_letters(answer){
    if (answer.indexOf(" ") != -1) {
      return this.trans.t("la primera palabra contiene") + " " + answer.split(" ")[0].length + " " + this.trans.t("caracteres") + ", " + this.trans.t("la segunda") + " " + answer.split(" ")[1].length;
    } else {
      return this.trans.t("la palabra contiene") + " " + answer.length + " " + this.trans.t("caracteres");
    }
  }
  render_definitions(state){
    if(state.game_started){
      var letter = "";
      var tip = "";
      var number = "";
      var title = "";
      var def = "";
      var val = "";
      var i = null;

      state.letters.forEach((elem, index) => {
        var classes = "";
        if(index === state.actual_letter){
          i = index;
        	tip = elem.tip;
          number = this.count_answer_letters(elem.answer);
        	title = elem.header + " " + elem.letter;
        	def = elem.def;
          var extra = 0;
          if(elem.starts_or_contains==="start"){
            val = elem.answer[0];
            extra = 1;
          } else {
            val = "";
            extra = 0;
          }
          if(elem.wildcards.nextletter>0){
              for (var i = 0; i < elem.wildcards.nextletter; i++) {
                val += elem.answer[i+extra];
              }
          }
          //also add special class to indicate actual letter
          classes += "active";

        }
        if(elem.right === true){
          classes += " right";
        } else if(elem.right === false) {
          classes += " wrong";
        }

        letter += "<div index=" + index + " class='letter " + classes + "'><span class=''>" + elem.letter + "</span></div>";

      });

      this.letterWall.html(letter);
      this.explanation.html(tip);
      this.lettersNumber.html(number);
      this.wordTitle.html(title);
      this.wordDef.html(def);

      this.mainInput.val(val.toLowerCase());
      var mediaquery1 = matchMedia("(max-width: 1024px) and (orientation: portrait)");
      var mediaquery2 = matchMedia("(max-width: 980px)");
      if(UI_CONFIG.mediaquery1.matches || UI_CONFIG.mediaquery2.matches) {
        handleOrientationChange(undefined, true);
      }
    }
  }
  render_wildcards(state){
    var w_tip = "";
    var w_two = "";
    var w_number = "";
    var w_letter = "";

  	w_tip = state.wildcards.additionaltip;
   	w_two = state.wildcards.twotries;
   	w_number = state.wildcards.numberletters;
   	w_letter = state.wildcards.nextletter;

    switch(state.active_wildcard) {
        case "additionaltip":
          $('.w_explanation').addClass("hide");
          $('.tip_explanation').removeClass('hide');
          $('.tip_type').addClass('hide');
        break;
        case "twotries":
          break;
        case "numberletters":
          $('.w_explanation').addClass("hide");
          $('.number_explanation').removeClass('hide');
          $('.tip_type').addClass('hide');
          break;
        case "nextletter":
          break;
        case "":
          $('.w_explanation').addClass("hide");
          $('.tip_type').removeClass('hide');
        break;
    }

    if (state.wildcards.additionaltip===0 && state.letters[state.actual_letter].wildcards.additionaltip===false) {
          this.wildTip.addClass('desactivated');
    } else {
      this.wildTip.removeClass('desactivated');
    }
    this.wild_tip.html((w_tip < 0) ? 0 : w_tip);
    this.wild_two.html(w_two);
    this.wild_number.html(w_number);
    this.wild_letter.html(w_letter);

  }
  //zones_to_rerender is an array with the zones of the app that we want to repaint,
  //if nothing is specified we rerender everything
  render(state, zones_to_rerender) {
    if(zones_to_rerender===undefined){
      zones_to_rerender = ["buttons", "score", "definitions", "wildcards", "lang"];
    }
    for (let i = 0; i < zones_to_rerender.length; i++) {
        switch(zones_to_rerender[i]) {
          case "buttons":
              this.render_buttons(state);
              break;
          case "score":
              this.render_score(state);
              break;
          case "definitions":
              this.render_definitions(state);
              break;
          case "wildcards":
              this.render_wildcards(state);
              break;
          case "lang":
              this.render_lang(state);
              break;
          default:
              console.log("Do not know how to RENDER " + zones_to_rerender[i]);
          }
    }
  };
}
