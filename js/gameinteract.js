import generate_ui from './uigenerator';

export default function game_interactions(state, definitions){

  var nextButton = $('#next_arrow');

  nextButton.on('click', (ev) => {

    console.log(state.actual_letter);

    if (state.actual_letter===24) {
      state.actual_letter = -1;
    }

    state.actual_letter++
    create_ui();

  });



  //---------- COUNTDOWN -------------
  
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
   
    return {
      'total': t,
      'minutes': minutes,
      'seconds': seconds
    };
  }
   
  function initializeReloj(id, endtime) {
    var clock = document.getElementById(id);
    var minutes_box = clock.querySelector('.minutes_box');
    var seconds_box = clock.querySelector('.seconds_box');
    function updateReloj() {
      var t = getTimeRemaining(endtime);
      minutes_box.innerHTML = ('0' + t.minutes).slice(-2);
      seconds_box.innerHTML = ('0' + t.seconds).slice(-2);
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
    updateReloj();
    var timeinterval = setInterval(updateReloj, 1000);
  }

  var start_timer = $('#start_button');

  start_timer.on('click',  (ev) => {
    var deadline = new Date(Date.parse(new Date()) + 59 * 61 * 1000);
    initializeReloj('clock', deadline);
  });


}


