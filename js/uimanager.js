//class that manages the UI

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

      this.start_button = $('#start_button');
      this.game = $('.main_game');
      this.initial_text = $('.main_text');
      this.initial_controls = $('.control_text');
      this.game_controls = $('.controls_menu');
      this.game_controls_mob = $('.controls_menu_mob');
      this.game_score = $('.progress_score');
      this.clock = $("#clock");
      this.count_answer_letters = this.count_answer_letters.bind(this);
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
      var val_wildcard = "";

      state.letters.forEach((elem, index) => {
        var classes = "";
        if(index === state.actual_letter){
        	tip = elem.tip;
          number = this.count_answer_letters(elem.answer);
        	title = elem.header + " " + elem.letter;
        	def = elem.def;
          val = elem.answer[0];
          val_wildcard = elem.answer[0] + elem.answer[1];

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
      this.mainInput.val(val);
      
    } else {

    }
  }
  render_wildcards(state){
    var w_tip = "";
    var w_two = "";
    var w_number = "";
    var w_letter = "";

    state.wildcards.forEach((elem, index) => {
    	w_tip = elem.additionaltip;
	   	w_two = elem.twotries;
	   	w_number = elem.numberletters;
	   	w_letter = elem.nextletter;

	    this.wild_tip.html(w_tip);
	    this.wild_two.html(w_two);
	    this.wild_number.html(w_number);
	    this.wild_letter.html(w_letter);
    });
  }
  //zones_to_rerender is an array with the zones of the app that we want to repaint,
  //if nothing is specified we rerender everything
  render(state, zones_to_rerender) {
    if(zones_to_rerender===undefined){
      zones_to_rerender = ["buttons", "score", "definitions", "wildcards"];
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
          default:
              console.log("Do not know how to RENDER " + zones_to_rerender[i]);
          }
    }
  };
}
