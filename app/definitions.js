
export const MASTER = {
  countdown: true,
  time: "60:00",
  letter_limit: 25,
  wildcards: [{name: "additional tip", use: false}, {name: "two tries", use: false}, {name: "number of letters", use: false}, {name: "next letter", use: false}],
  letters: [
    {
      letter: "a",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "apodo o pseudónimo utilizado en las redes. nombre usualmente corto y fácil de recordar.",
      answer: "alias",
      comodines: [],
      tip: ""
    },
    {
      letter: "b",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "imagen, gráfico o texto con fines publicitarios que habitualmente enlaza con el sitio web del anunciante.",
      answer: "banner",
      comodines: [],
      tip: ""
    }
	]
};