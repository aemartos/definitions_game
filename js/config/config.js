import {INTERNET_DEFINITIONS} from './definitions';

export let state = {};

//function that clones initial_state into state
//this has to be here because when you export a variable it is read-only it can´t be reasigned
export function set_initial_state(){
    state = JSON.parse(JSON.stringify(INITIAL_STATE));
    INTERNET_DEFINITIONS.letters.forEach((elem, index) => {
      elem.right = undefined;   
      state.letters.push(elem);
    });
}

const INITIAL_STATE = {
  game_started: false,
  game_ended: false,
  time: 3600,
  time_paused: false,
  progress: 0,
  wildcards: [
    {additionaltip: 1},
    {twotries: 2},
    {numberletters: 1},
    {nextletter: 2}
  ],
  score: 0,
  letters: [],
  /*letters will contain the letters of the game and if they have been answered
  letters: [{
        letter: "a",
        number: 0,
        starts_or_contains: "start",
        header: "empieza por la",
        def: "apodo o pseudónimo utilizado en las redes. nombre usualmente corto y fácil de recordar",
        answer: "alias",
        tip: "también suele emplearse el anglicismo nick, para designar el mismo concepto"
        right: undefined
      }, ...]*/
  actual_letter: 0,
};


export const UI = {
  with_reset_button: true,
  with_fullscreen: true,
  name:"wordwall",
  type_logo:"/assets/images/logos/internet.svg",
  survey: "https://docs.google.com/forms/d/10xa0gH9pLU9xAyxMz7ufmotky4mCROTxOLNzNs2VKkg/edit"
};
