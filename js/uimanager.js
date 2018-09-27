//class that manages the UI
import handleOrientationChange from './carousel';
import {UI_CONFIG} from './config/config';

export default class UIManager{
  constructor(eventmanager, translator){
      this.ev = eventmanager;
      this.trans = translator;

      this.typeApp = $('.type_text');

      //variable used to see if we have rendered the letters or not
      this.is_first_render = true;

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

      this.render_type_app = this.render_type_app.bind(this);

      this.count_answer_letters = this.count_answer_letters.bind(this);
      this.render_lang = this.render_lang.bind(this);
  }

  render_type_app(state) {
    console.log(state.type_app);
    this.typeApp.text(state.type_app);
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
      var all_letters = "";
      var letter_now = state.letters[state.actual_letter];
      var letter_prev = state.letters[state.previous_letter];

      if(this.is_first_render){
          state.letters.forEach((elem, index) => {
            var classes = "";
            if(elem.right === true){
              classes += " right";
            } else if(elem.right === false) {
              classes += " wrong";
            }
            if(index===state.actual_letter){
              classes += " active";
            }
            //we don't use id for the letters because the owl-carousel clones the elements and does not work well
            all_letters += "<div index=" + index + " class='letter letter"+index+ classes + "'><span class=''>" + elem.letter + "</span></div>";

          });
          this.letterWall.html(all_letters);
          if(UI_CONFIG.mediaquery1.matches || UI_CONFIG.mediaquery2.matches) {
            handleOrientationChange(undefined, true);
          }

          this.is_first_render = false;
        } else {
          //if we have already rendered the letters, we only have to change the active and previuos letters
          $(".letter"+state.previous_letter).removeClass("active");
          $(".letter"+state.actual_letter).addClass("active");
          if(letter_prev.right){
            $(".letter"+state.previous_letter).addClass("right");
          } else if(letter_prev.right===false){
            $(".letter"+state.previous_letter).addClass("wrong");
          }
        }

        var number_letters = this.count_answer_letters(letter_now.answer);
        var tip = letter_now.tip;

        var title = letter_now.header + " " + letter_now.letter;
        var def = letter_now.def;
        var val = "";
        var extra = 0;
        if(letter_now.starts_or_contains==="start"){
          val = letter_now.answer[0];
          extra = 1;
        } else {
          val = "";
          extra = 0;
        }
        if(letter_now.wildcards.nextletter>0){
            for (var i = 0; i < letter_now.wildcards.nextletter; i++) {
              val += letter_now.answer[i+extra];
            }
        }

        this.explanation.html(tip);
        this.lettersNumber.html(number_letters);
        this.wordTitle.html(title);
        this.wordDef.html(def);

        if(state.active_wildcard === 'twotries' && !letter_now.second_try && letter_now.right === undefined){
          $('#twotries').addClass('desactivated');
          $('#two_tries_1_more').addClass('fadeIn');
          setTimeout(function(){$('#two_tries_1_more').removeClass('fadeIn');}, 5000);
          letter_now.second_try = true;
        } else if(letter_now.second_try && letter_now.right === undefined){
          $('#twotries').removeClass('desactivated');
          $('#two_tries_try_again').addClass('fadeIn');
          setTimeout(function(){$('#two_tries_try_again').removeClass('fadeIn');}, 5000);
          letter_now.second_try = false;
        }

        if(letter_now.right !== undefined){
          val = letter_now.answer;
        }
        this.mainInput.val(val.toLowerCase());

        if(val.toLowerCase()===letter_now.answer.toLowerCase()){
          this.mainInput.attr('disabled','disabled');
        } else {
          this.mainInput.removeAttr('disabled');
        }
    }
  }
  render_wildcards(state){
    switch(state.active_wildcard) {
        case "additionaltip":
          $('.w_explanation').addClass("hide");
          $('.tip_explanation').removeClass('hide');
          $('.tip_type').addClass('hide');
        break;
        case "twotries":
          $('.tip_type').addClass('hide');
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
    var all_wildcards = Object.keys(state.wildcards);
    for (var i = 0; i < all_wildcards.length; i++) {
      if (state.wildcards[all_wildcards[i]] === 0 && state.letters[state.actual_letter].wildcards[all_wildcards[i]] === false) {
          $('#' + all_wildcards[i]).addClass('desactivated');
      } else {
          $('#' + all_wildcards[i]).removeClass('desactivated');
      }
    }

    if(state.wildcards.nextletter === 0) {
      $('#nextletter').addClass('desactivated');
    }

    this.wild_tip.html(state.wildcards.additionaltip);
    this.wild_two.html(state.wildcards.twotries);
    this.wild_number.html(state.wildcards.numberletters);
    this.wild_letter.html(state.wildcards.nextletter);

  }
  //zones_to_rerender is an array with the zones of the app that we want to repaint,
  //if nothing is specified we rerender everything
  render(state, zones_to_rerender) {
    if(zones_to_rerender===undefined){
      zones_to_rerender = ["buttons", "score", "definitions", "wildcards", "lang", "type"];
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
          case "type":
              this.render_type_app(state);
              break;
          default:
              console.log("Do not know how to RENDER " + zones_to_rerender[i]);
          }
    }
  };
}
