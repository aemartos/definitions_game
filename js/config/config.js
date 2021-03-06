import {INTERNET_DEFINITIONS_2} from './definitions';

export let state = {};

//function that clones initial_state into state
//this has to be here because when you export a variable it is read-only it can´t be reasigned
export function set_initial_state(){
    state = JSON.parse(JSON.stringify(INITIAL_STATE));
    state.type_app = INTERNET_DEFINITIONS_2.type_app;
    var lang = state.lang!=="" ? state.lang:navigator.language.substring(0,2);
    state.lang = lang;
    INTERNET_DEFINITIONS_2.letters.forEach((elem, index) => {
      elem.right = undefined;
      elem.answered = undefined;
      elem.second_try = false;
      state.letters.push(elem);
    });
}

const INITIAL_STATE = {
  lang: "",
  type_app: "",
  game_started: false,
  game_ended: false,
  time: 3600,
  time_paused: false,
  progress: 0,
  success: 0,
  average: 0,
  grade: 0,
  wildcards: {
    additionaltip: 4,
    twotries: 5,
    numberletters: 2,
    nextletter: 6
  },
  active_wildcard: "",
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
        score: 10,
        wildcards: {
          additionaltip: false,
          twotries: false,
          numberletters: false,
          nextletter: 0
        },
        tip: "también suele emplearse el anglicismo nick, para designar el mismo concepto"
        right: undefined
      }, ...]*/
  actual_letter: 0,
  previous_letter: 0
};


export const UI_CONFIG = {
  with_reset_button: true,
  with_fullscreen: true,
  finish_screen: true,
  name:"wordwall",
  type_logo:"assets/images/logos/internet.svg",
  survey: "https://docs.google.com/forms/d/10xa0gH9pLU9xAyxMz7ufmotky4mCROTxOLNzNs2VKkg/edit",
  mediaquery1: matchMedia("(max-width: 1024px) and (orientation: portrait)"),
  mediaquery2: matchMedia("(max-width: 980px)")
};
