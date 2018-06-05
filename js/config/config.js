export let STATE = {
  game_started: false,
  game_ended: false,
  time: "60:00",
  time_paused: false,
  progress: "0/25",
  wildcards: [{name: "additional tip", quantity: 1}, {name: "two tries", quantity: 2}, {name: "number of letters",  quantity: 1}, {name: "next letter",  quantity: 2}],
  score: "0",
  /*letters: [{letter: "a", rigth: null}, {letter: "b", rigth: null}, {letter: "c", rigth: null}, {letter: "c", rigth: null} ,{letter: "d", rigth: null}, {letter: "e", rigth: null}, {letter: "f", rigth: null}, {letter: "f", rigth: null}, {letter: "h", rigth: null}, {letter: "i", rigth: null}, {letter: "j", rigth: null}, {letter: "l", rigth: null}, {letter: "l", rigth: null}, {letter: "m", rigth: null} ,{letter: "n", rigth: null}, {letter: "o", rigth: null}, {letter: "p", rigth: null}, {letter: "p", rigth: null}, {letter: "q", rigth: null}, {letter: "r", rigth: null}, {letter: "s", rigth: null}, {letter: "t", rigth: null}, {letter: "u", rigth: null}, {letter: "w", rigth: null}, {letter: "y", rigth: null}],*/
  letters: [{letter: 0, rigth: null}, {letter: 1, rigth: null}, {letter: 2, rigth: null}, {letter: 3, rigth: null} ,{letter: 4, rigth: null}, {letter: 5, rigth: null}, {letter: 6, rigth: null}, {letter: 7, rigth: null}, {letter: 8, rigth: null}, {letter: 9, rigth: null}, {letter: 10, rigth: null}, {letter: 11, rigth: null}, {letter: 12, rigth: null}, {letter: 13, rigth: null} ,{letter: 14, rigth: null}, {letter: 15, rigth: null}, {letter: 16, rigth: null}, {letter: 17, rigth: null}, {letter: 18, rigth: null}, {letter: 19, rigth: null}, {letter: 20, rigth: null}, {letter: 21, rigth: null}, {letter: 22, rigth: null}, {letter: 23, rigth: null}, {letter: 24, rigth: null}],
  actual_letter: 0,
};


export const UI = {
  with_reset_button: true,
  with_fullscreen: true,
  name:"wordwall",
  type_logo:"/assets/images/logos/internet.svg",
  survey: "https://docs.google.com/forms/d/10xa0gH9pLU9xAyxMz7ufmotky4mCROTxOLNzNs2VKkg/edit"
};

