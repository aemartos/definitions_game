


export default function init_events(){
	var start_button = $('#start_button');
	var game = $('.main_game');
	var initial_text = $('.main_text');
	var initial_controls = $('.control_text');
	var game_controls = $('.controls_menu');
	var game_controls_mob = $('.controls_menu_mob');
	var game_score = $('.progress_score');


	var startGame = function(){
		initial_text.addClass('hide');
		game.removeClass('hide');
		initial_controls.addClass('hide');
		game_controls.removeClass('hide');
		game_controls_mob.removeClass('hide');
		game_score.removeClass('hide');
	};


	start_button.on('click', startGame);


		window.addEventListener('fullscreenchange', fullscreenChange);
    window.addEventListener('webkitfullscreenchange', fullscreenChange);
    window.addEventListener('mozfullscreenchange', fullscreenChange);
    window.addEventListener('MSFullscreenChange', fullscreenChange);


	//-------- BURGER MENU -----------

	var accordion = function (className) {
	  var item = $(className);
	  item.toggleClass("closed");
	  if (item.css('max-height') == '0px'){
	  	item.css('max-height', item.prop("scrollHeight") + 20 + "px");
	  } else {
	  	item.css('max-height', '0');
	  }
	};

	//////////OPEN BURGER //////////

	var burger_button = $("#burger_button");

	burger_button.on("click", function() {
    $(this).toggleClass("closed");
    accordion(".controls_int");
	});


	//------------- FULLSCREEN --------------


function togglefullscreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
  } else {
      if (document.cancelFullScreen) {
          document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
      }
  }

};

function fullscreenChange(){
    //this method is called whenever a fullscreenChange event is fired.
    //we change state here and not in the other methods because fullscreen can be toggled also with keys, not only buttons
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      console.log("no fullscreen");
      enterfullScreenButton.removeClass('hide');
    	exitfullScreenButton.addClass('hide');
    } else{
      console.log("fullscreen");
      enterfullScreenButton.addClass('hide');
    	exitfullScreenButton.removeClass('hide');
    }
  }

var enterfullScreenButton = $('#enterfullscreen');
var exitfullScreenButton = $('#exitfullscreen');

enterfullScreenButton.on('click', togglefullscreen);
exitfullScreenButton.on('click', togglefullscreen);


};





