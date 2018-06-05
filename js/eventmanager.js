


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
const crossCreditsButton = document.querySelector('#modalCredits .control.control_cross');


//--------- INFO MODAL------------
const openInfoButton = document.querySelector('#openInfo');
const crossInfoButton = document.querySelector('#modalInfo .control.control_cross');
const closeInfoButton = document.querySelector('#modalInfo .btn-red');


//--------- PROGRESS MODAL------------
const openProgressButton = document.querySelector('#openProgress');
const crossProgressButton = document.querySelector('#modalProgress .control.control_cross');
const closeProgressButton = document.querySelector('#modalProgress .btn-red');


//--------- RESET MODAL------------
const openResetButton = document.querySelector('#openReset');
const crossResetButton = document.querySelector('#modalReset .control.control_cross');
const cancelResetButton = document.querySelector('#modalReset .btn-red');
const acceptResetButton = document.querySelector('#modalReset .btn-green');


//--------- STOP MODAL------------
const openStopButton = document.querySelector('#openStop');
const crossStopButton = document.querySelector('#modalStop .control.control_cross');
const cancelStopButton = document.querySelector('#modalStop .btn-red');
const acceptStopButton = document.querySelector('#modalStop .btn-green');

//--------- FINAL MODAL------------
const crossFinalButton = document.querySelector('#modalFinal .control.control_cross');
const resetFinalButton = document.querySelector('#modalFinal .btn-red-r');
const finishFinalButton = document.querySelector('#modalFinal .btn-red-t');
const answersFinalButton = document.querySelector('#modalFinal .btn-green');



let modal;
let openedmodal;

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

const showContainers = (modalid) => {
  modalShade.set('display', 'block');
  var modalContainer = styler(document.querySelector("#" + modalid));
  modalContainer.set('display', 'block');
};

const hideContainers = (modalid) => {
  modalShade.set('display', 'none');
  var modalContainer = styler(document.querySelector("#" + modalid));
  modalContainer.set('display', 'none');
};

const openModal = (modalid) => {
  modal = styler(document.querySelector('#'+modalid+' .modal'));
  openedmodal = modalid;
  showContainers(modalid);
  
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
    complete: ()=>hideContainers(openedmodal)
  });
}

const acceptModal = () => {
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
    complete: ()=>hideContainers(openedmodal)
  });
}

listen(document.querySelector('#dark-opacity'), 'click').start(cancelModal);

listen(openCreditsButton, 'click').start(()=>{openModal("modalCredits")});
listen(crossCreditsButton, 'click').start(cancelModal);

listen(openInfoButton, 'click').start(()=>{openModal("modalInfo")});
listen(crossInfoButton, 'click').start(cancelModal);
listen(closeInfoButton, 'click').start(cancelModal);

listen(openProgressButton, 'click').start(()=>{openModal("modalProgress")});
listen(crossProgressButton, 'click').start(cancelModal);
listen(closeProgressButton, 'click').start(cancelModal);

listen(openResetButton, 'click').start(()=>{openModal("modalReset")});
listen(crossResetButton, 'click').start(cancelModal);
listen(cancelResetButton, 'click').start(cancelModal);
listen(acceptResetButton, 'click').start(acceptModal);

listen(openStopButton, 'click').start(()=>{openModal("modalStop")});
listen(crossStopButton, 'click').start(cancelModal);
listen(cancelStopButton, 'click').start(cancelModal);
listen(acceptStopButton, 'click').start(acceptModal);

listen(crossFinalButton, 'click').start(cancelModal);
listen(resetFinalButton, 'click').start(cancelModal);
listen(finishFinalButton, 'click').start(cancelModal);
listen(answersFinalButton, 'click').start(acceptModal);


};





