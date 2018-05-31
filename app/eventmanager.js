


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
		$("#main_input").focus();
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





//-------------------- MODALS ----------------------



const { styler, timeline, listen, easing } = window.popmotion;

const openModalButton = document.querySelector('.credits');
const cancelModalButton = document.querySelector('.control.control_cross');
//const okModalButton = document.querySelector('.modal-ok');

const modalShade = styler(document.querySelector('.dark-opacity'));
const modalContainer = styler(document.querySelector('.modal-content'));
const modal = styler(document.querySelector('.modal'));
//const modalSections = Array.from(document.querySelector('.modal').children).map(styler);
//const sectionLabels = modalSections.map((s, i) => 'section' + i);

const tweenUp = (track, duration = 500, yFrom = 100) => ({
  track,
  duration,
  from: { y: yFrom, opacity: 0 },
  to: { y: 0, opacity: 1 },
  ease: { y: easing.backOut, opacity: easing.linear }
});

const setStylers = (v) => {
  if (v.shade !== undefined) modalShade.set('opacity', v.shade);
  if (v.modal !== undefined) modal.set(v.modal);
  /*sectionLabels.forEach((label, i) => {
    if (v[label] !== undefined) modalSections[i].set(v[label])
  });*/
};

const showContainers = () => {
  modalShade.set('display', 'block');
  modalContainer.set('display', 'block');
};

const hideContainers = () => {
  modalShade.set('display', 'none');
  modalContainer.set('display', 'none');
};

const openModal = () => {
  showContainers();
  
  timeline([
    { track: 'shade', from: 0, to: 1, ease: easing.linear },
    '-100',
    tweenUp('modal'),
    '-200'
    //[...modalSections.map((s, i) => tweenUp(sectionLabels[i], 300, 50)), 50]
  ]).start(setStylers);
}

const cancelModal = () => {
  timeline([
    {
      track: 'modal',
      duration: 200,
      from: { y: 0, opacity: 1 },
      to: { y: 100, opacity: 0 },
      ease: { y: easing.easeIn, opacity: easing.linear }
    },
    '-100',
    { track: 'shade', from: 1, to: 0, ease: easing.linear, duration: 200 }
  ]).start({
    update: setStylers,
    complete: hideContainers
  });
}

/*const okModal = () => {
  timeline([
    {
      track: 'modal',
      duration: 200,
      from: { y: 0, opacity: 1 },
      to: { y: -200, opacity: 0 },
      ease: { y: easing.easeOut, opacity: easing.linear }
    },
    '-100',
    { track: 'shade', from: 1, to: 0, ease: easing.linear, duration: 300 }
  ]).start({
    update: setStylers,
    complete: hideContainers
  });
}*/

listen(openModalButton, 'click').start(openModal);
listen(cancelModalButton, 'click').start(cancelModal);
listen(modalShade, 'click').start(cancelModal);
//listen(okModalButton, 'click').start(okModal);





};





