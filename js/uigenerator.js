//function that generates the UI

export default function generate_ui(state, definitions){


  var letterWall = $('.letter-wall');
  var explanation = $('.text_explanation');
  var wordTitle = $('.title_word');
  var wordDef = $('.word_definition');

  var wild_tip = $('.w_t_tip');
  var wild_two = $('.w_t_tries');
  var wild_number = $('.w_t_number');
  var wild_letter = $('.w_t_letter');


  var create_ui = function () {

    var letter = "";
    var tip = "";
    var title = "";
    var def = "";

    var w_tip = "";
    var w_two = "";
    var w_number = "";
    var w_letter = "";

    definitions.letters.forEach((elem, index) => {

      letter += "<div class='letter'><span class=''>" + elem.letter + "</span></div>";
      if(index===state.actual_letter){
      	tip = elem.tip;
      	title = elem.header;
      	def = elem.def;
      }
    });

    state.wildcards.forEach((elem, index, w) => {
    	w_tip = elem.additionaltip;
	   	w_two = elem.twotries;
	   	w_number = elem.numberletters;
	   	w_letter = elem.nextletter;
	
	    wild_tip.append(w_tip);
	    wild_two.append(w_two);
	    wild_number.append(w_number);
	    wild_letter.append(w_letter);
    });

    letterWall.append(letter);
    explanation.append(tip);
    wordTitle.append(title);
    wordDef.append(def);


  };

  create_ui();


}