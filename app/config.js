export let STATE = {
  game_started: false,
  game_ended: false,
  time: "60:00",
  time_paused: false,
  progress: "0/25",
  wildcards: [{name: "additional tip", quantity: 1}, {name: "two tries", quantity: 2}, {name: "number of letters",  quantity: 1}, {name: "next letter",  quantity: 2}],
  score: "0",
  letters: [{letter: "a", rigth: null}, {letter: "b", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null} ,{letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null} ,{letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}],
  actual_letter: 0,
};


export const UI = {
  with_reset_button: true,
  with_fullscreen: true,
  name:"wordwall",
  type_logo:"/assets/images/logos/type_logo.svg",
  survey: "https://docs.google.com/forms/d/10xa0gH9pLU9xAyxMz7ufmotky4mCROTxOLNzNs2VKkg/edit"
};

