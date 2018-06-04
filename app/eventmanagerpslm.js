


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

const modalShade = styler(document.querySelector('#dark-opacity'));

//const modalSections = Array.from(document.querySelector('.modal').children).map(styler);
//const sectionLabels = modalSections.map((s, i) => 'section' + i);


//--------- CREDITS MODAL------------
const openCreditsButton = document.querySelector('#openCredits');
const cancelCreditsButton = document.querySelector('#modalCredits .control.control_cross');
//const acceptCredits = document.querySelector('.modal-ok');
const modalContainerCredits = styler(document.querySelector('#modalCredits'));
const modalCredits = styler(document.querySelector('#modalCredits .modal'));



//--------- START MODAL------------
const openStartButton = document.querySelector('#openStart');
const cancelStartButton = document.querySelector('#modalStart .control.control_cross');
//const acceptStart = document.querySelector('.modal-ok');
const modalContainerStart = styler(document.querySelector('#modalStart'));
const modalStart = styler(document.querySelector('#modalStart .modal'));


//--------- INFO MODAL------------
const openInfoButton = document.querySelector('#openInfo');
const cancelInfoButton = document.querySelector('#modalInfo .control.control_cross');
//const acceptInfo = document.querySelector('.modal-ok');
const modalContainerInfo = styler(document.querySelector('#modalInfo'));
const modalInfo = styler(document.querySelector('#modalInfo .modal'));


//--------- PROGRESS MODAL------------
const openProgressButton = document.querySelector('#openProgress');
const cancelProgressButton = document.querySelector('#modalProgress .control.control_cross');
//const acceptProgress = document.querySelector('.modal-ok');
const modalContainerProgress = styler(document.querySelector('#modalProgress'));
const modalProgress = styler(document.querySelector('#modalProgress .modal'));


//--------- RESET MODAL------------
const openResetButton = document.querySelector('#openReset');
const cancelResetButton = document.querySelector('#modalReset .control.control_cross');
//const acceptReset = document.querySelector('.modal-ok');
const modalContainerReset = styler(document.querySelector('#modalReset'));
const modalReset = styler(document.querySelector('#modalReset .modal'));


//--------- STOP MODAL------------
const openStopButton = document.querySelector('#openStop');
const cancelStopButton = document.querySelector('#modalStop .control.control_cross');
//const acceptStop = document.querySelector('.modal-ok');
const modalContainerStop = styler(document.querySelector('#modalStop'));
const modalStop = styler(document.querySelector('#modalStop .modal'));


//--------- FINAL MODAL------------
const openFinalButton = document.querySelector('#openFinal');
const cancelFinalButton = document.querySelector('#modalFinal .control.control_cross');
//const acceptStop = document.querySelector('.modal-ok');
const modalContainerFinal = styler(document.querySelector('#modalFinal'));
const modalFinal = styler(document.querySelector('#modalFinal .modal'));





const tweenUp = (track, duration = 500, yFrom = 100) => ({
  track,
  duration,
  from: { y: yFrom, opacity: 0 },
  to: { y: 0, opacity: 1 },
  ease: { y: easing.backOut, opacity: easing.linear }
});

const setStylers = (v) => {
  if (v.shade !== undefined) {
    modalShade.set('opacity', v.shade);
  } else {
    const modal = styler(document.querySelector('#' + v.modalid + ' .modal'));

    modal.set(v.modal);
  }
  /*sectionLabels.forEach((label, i) => {
    if (v[label] !== undefined) modalSections[i].set(v[label])
  });*/
};

const showContainers = (modalid) => {
  modalShade.set('display', 'block');
  var modalContainer = styler(document.querySelector("#"+modalid));
  modalContainer.set('display', 'block');
};

const hideContainers = (modalid) => {
  modalShade.set('display', 'none');
  var modalContainer = styler(document.querySelector("#"+modalid));
  modalContainer.set('display', 'none');
};

const openModal = (modalid) => {
  showContainers(modalid);
  
  timeline([
    { track: 'shade', from: 0, to: 1, ease: easing.linear },
    '-100',
    tweenUp(modalid),
    '-200'
    //[...modalSections.map((s, i) => tweenUp(sectionLabels[i], 300, 50)), 50]
  ]).start(setStylers);
}

const cancelModal = (modalid) => {
  timeline([
    {
      track: modalid,
      duration: 200,
      from: { y: 0, opacity: 1 },
      to: { y: 100, opacity: 0 },
      ease: { y: easing.easeIn, opacity: easing.linear }
    },
    '-100',
    { track: 'shade', from: 1, to: 0, ease: easing.linear, duration: 200 }
  ]).start({
    update: setStylers,
    complete: ()=>hideContainers(modalid)
  });
}

/*const acceptModal = () => {
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

listen(openCreditsButton, 'click').start(()=>{openModal("modalCredits")});
listen(cancelCreditsButton, 'click').start(cancelCredits);
listen(modalShade, 'click').start(cancelCredits);
//listen(acceptCredits, 'click').start(acceptInfo);

listen(openStartButton, 'click').start(openStart);
listen(cancelStartButton, 'click').start(cancelStart);
listen(modalShade, 'click').start(cancelStart);
//listen(acceptStart, 'click').start(acceptStart);

listen(openInfoButton, 'click').start(openInfo);
listen(cancelInfoButton, 'click').start(cancelInfo);
listen(modalShade, 'click').start(cancelInfo);
//listen(acceptInfo, 'click').start(acceptInfo);

listen(openProgressButton, 'click').start(openProgress);
listen(cancelProgressButton, 'click').start(cancelProgress);
listen(modalShade, 'click').start(cancelProgress);
//listen(acceptProgress, 'click').start(acceptProgress);

listen(openResetButton, 'click').start(openReset);
listen(cancelResetButton, 'click').start(cancelReset);
listen(modalShade, 'click').start(cancelReset);
//listen(acceptReset, 'click').start(acceptReset);

listen(openStopButton, 'click').start(openStop);
listen(cancelStopButton, 'click').start(cancelStop);
listen(modalShade, 'click').start(cancelStop);
//listen(acceptStop, 'click').start(acceptStop);

listen(openFinalButton, 'click').start(openFinal);
listen(cancelFinalButton, 'click').start(cancelFinal);
listen(modalShade, 'click').start(cancelFinal);
//listen(acceptFinal, 'click').start(acceptFinal);


};





