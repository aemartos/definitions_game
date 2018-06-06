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





}