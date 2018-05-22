let STATE = {
  game_started: false,
  game_ended: false,
  time: "60:00",
  time_paused: false,
  progress: "0/25",
  wildcards: [{name: "additional tip", quantity: 1}, {name: "two tries", , quantity: 2}, {name: "number of letters", use: false}, {name: "next letter", use: false}],
  score: "0",
  letters: [{letter: "a", rigth: null}, {letter: "b", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null} ,{letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null} ,{letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}, {letter: "", rigth: null}],
  actual_letter: 0,
};


const UI = {
  with_reset_button: false,
  with_fullscreen: true,
  name:"",
  app_logo:"img/logos/definitions_logo.svg",
  type_app_logo:"",
  elab_text:"una aplicación de",
  elab_logo:"img/logos/elab_logo_white.svg",
  main_text: "",
  initial_text:"",
  instructions:"para comprobar una palabra pulsa intro o haz click en el botón de check. tienes intentos limitados, pero puedes ayudarte de los comodines. los controles son muy sencillos:",
  final_text:"has terminado la prueba. puedes repasar tus definiciones acertadas.",
  message_pro: "eres un crack, ¡a ti no hay quien te engañe! sabemos que no necesitas que te enseñemos uso seguro TIC e internet, pero aquí te dejamos un pequeño vídeo por si quieres saber más:",
  message_good: "lo has hecho bastante bien, pero has fallado algunas. revisa el siguiente video para aprender un poco más:",
  message_ok: "no has acertado muchas. es muy importante que aprendas uso seguro TIC e internet. te dejamos un video para que aprendas un poco más:",
  survey: ""
};

