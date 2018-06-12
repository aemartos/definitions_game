
export const INTERNET_DEFINITIONS = {
  letter_limit: 25, //4, 9, 16 or 25
  wildcards: [
    {additionaltip: 1},
    {twotries: 2},
    {numberletters: 1},
    {nextletter: 2}
  ],
  letters: [
    {
      letter: "a",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "apodo o pseudónimo utilizado en las redes. nombre usualmente corto y fácil de recordar",
      answer: "alias",
      score: 10,
      tip: "también suele emplearse el anglicismo nick, para designar el mismo concepto"
    },
    {
      letter: "b",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "imagen, gráfico o texto con fines publicitarios que habitualmente enlaza con el sitio web del anunciante",
      answer: "banner",
      score: 10,
      tip: "de forma rectangular y con orientación horizontal que se coloca muchas veces en el tercio superior de la página web"
    },
    {
      letter: "c",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "navegador web de código abierto más popular, con interfaz sencilla, muy buena estabilidad, velocidad y seguridad",
      answer: "chrome",
      score: 10,
      tip: "es el navegador más usado de internet, desarrollado por google"
    },
    {
      letter: "c",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "datos que se envian desde un servidor web al navegador del cliente y que se guardan localmente en el pc del usuario",
      answer: "cookies",
      score: 10,
      tip: "lo utilizan las páginas web para consultar la actividad previa del usuario, llevar un control sobre él y conseguir información sobre sus hábitos"
    },
    {
      letter: "d",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "sistema de denominación de hosts en internet el cual está formado por un conjunto de caracteres el cual identifica un sitio de la red accesible por un usuario",
      answer: "dominio",
      score: 10,
      tip: "nombre único y exclusivo que se le da a un sitio web en internet para que cualquiera pueda visitarlo"
    },
    {
      letter: "e",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "símbolo gráfico que representa diversas expresiones, permitiendo que una persona puede mostrar su estado de ánimo en medios como la mensajería instantánea ;)",
      answer: "emoticon",
      score: 10,
      tip: "🙂"
    },
    {
      letter: "f",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "compilación de las preguntas más frecuentes que se hacen en una web de cualquier tema",
      answer: "FAQ",
      score: 10,
      tip: "expresión inglesa: frequently asked questions"
    },
    {
      letter: "f",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "mini grafico (a modo de marca o logo), que aparece a los usuarios en la barra de direcciones del navegador",
      answer: "favicon",
      score: 10,
      tip: 'mezcla de las palabras en inglés  "favorite" e "icon"'
    },
    {
      letter: "h",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "persona experta en el manejo de computadoras, que se ocupa de la seguridad de los sistemas y de desarrollar técnicas de mejora, utiliza sus conocimientos técnicos para superar un problema, normalmente asociado a la seguridad",
      answer: "hacker",
      score: 10,
      tip: "no hay que confundir con cracker, que es el que rompe la seguridad de un sistema"
    },
    {
      letter: "i",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "red informática de nivel mundial que utiliza la línea telefónica para transmitir la información",
      answer: "internet",
      score: 10,
      tip: "red de redes que comunica ordenadores a través de protocolos IP"
    },
    {
      letter: "j",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "formato de imagen más popular. es un formato comprimido, lo que le permite ocupar poco espacio en la memoria o ser enviado con rapidez por internet",
      answer: "JPG",
      score: 10,
      tip: 'extensión de archivo de las imágenes, nombre de la imagen, seguido de un punto:  "imagen.xxx"'
    },
    {
      letter: "l",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "red social orientada al ambiente comercial y de negocios",
      answer: "linkedin",
      score: 10,
      tip: "partiendo del perfil de cada usuario, que libremente revela su experiencia laboral y sus destrezas, esta web pone en contacto a millones de empresas y empleados"
    },
    {
      letter: "l",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "clave de acceso que se le asigna a un usuario, lo identifica dentro de internet junto con la dirección electrónica del pc que utiliza",
      answer: "login",
      score: 10,
      tip: "en español: entrar o ingresar en un sitio web, a través de tu perfil de usuario"
    },
    {
      letter: "m",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "programa malicioso cuyo objetivo es causar daños a ordenadores, sistemas o redes y, por extensión, a sus usuarios",
      answer: "malware",
      score: 10,
      tip: "abreviatura de malicious software"
    },
    {
      letter: "n",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "aplicación para visualizar todo tipo de información y navegar por internet con funcionalidades plenamente multimedia",
      answer: "navegador",
      score: 10,
      tip: "como ejemplo de este tipo de aplicaciones existen: internet explorer, firefox, chrome y safari"
    },
    {
      letter: "o",
      starts_or_contains: "contain",
      header: "contiene la",
      def: "programa cuyo código fuente está disponible al público general, para usar y modificar",
      answer: "open source",
      score: 10,
      tip: "código fuente abierto o software libre, aunque el software libre no es siempre gratuito"
    },
    /*{
      letter: "p",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "su contenido puede ir desde un texto corto a un conjunto de textos, gráficos estáticos o en movimiento, sonido, etc, en lenguaje HTML",
      score: 10,
      answer: "página web",
      tip: ""
    },*/
    {
      letter: "p",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "es una aplicación web para la transferencia segura de fondos, entre cuentas de miembros",
      answer: "paypal",
      score: 10,
      tip: "empresa que facilita un servicio virtual de pago. a través de este sistema es posible realizar compras online de forma segura"
    },
    {
      letter: "p",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "comunicaciones fraudulentas diseñadas para inducir a los consumidores a divulgar información personal o financiera, incluyendo nombre de usuario, contraseña, información sobre tarjetas de crédito, entre otros",
      answer: "phishing",
      score: 10,
      tip: "utilizado por los delincuentes para obtener información confidencial,  haciéndose pasar por una comunicación confiable y legítima"
    },
    {
      letter: "q",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "forma como se le denomina al tipo de teclado que más se usa en la actualidad",
      answer: "QWERTY",
      score: 10,
      tip: "el nombre viene de la forma en como están distribuidas las letras y los caracteres"
    },
    {
      letter: "r",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "dispositivo de hardware que permite la interconexión de ordenadores en red, que determina el siguiente punto hacia donde se dirigen los datos",
      answer: "router",
      score: 10,
      tip: "aparato que nos facilita nuestra compañía de teléfono que nos provee acceso a la red local y a internet de forma inalámbrica"
    },
    {
      letter: "s",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "programa especial que se carga en un ordenador al encenderlo y cuya función es gestionar los demás programas o aplicaciones que se ejecutarán",
      answer: "sistema operativo",
      score: 10,
      tip: "windows, linux, unix, MacOS son algunos ejemplos"
    },
    {
      letter: "t",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "formato de archivo que almacena información, especialmente destinado a distribuir archivos de gran tamaño",
      answer: "torrent",
      score: 10,
      tip: "almacena los datos necesarios para que una aplicación de BitTorrent comparta el contenido"
    },
    {
      letter: "u",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "persona que tiene una cuenta por medio de la cual puede acceder a los recursos y servicios que ofrece una red",
      answer: "usuario",
      score: 10,
      tip: "a las redes sociales accedemos con el nombre con el que iniciamos el registro y con la contraseña"
    },
    {
      letter: "w",
      starts_or_contains: "start",
      header: "empieza por la",
      def: "websites que permiten a los usuarios modificar o crear contenido de forma rápida y sencilla",
      answer: "wiki",
      score: 10,
      tip: "estas páginas se desarrollan a partir de la colaboración de los internautas y el término se popularizó con el auge de la wikipedia"
    },
    /*{
      letter: "x",
      starts_or_contains: "contain",
      header: "contiene la",
      def: "servidor especial encargado de centralizar el tráfico entre internet y una red privada, de forma que evita que cada una de las máquinas de la red interior tenga que disponer necesariamente de una conexión directa a la red",
      answer: "proxy",
      score: 10,
      tip: ""
    },*/
    {
      letter: "y",
      starts_or_contains: "contain",
      header: "contiene la",
      def: "término inglés que se refiere al acto de atormentar y molestar a otra persona usando medios electrónicos",
      answer: "cyberbullying",
      score: 10,
      tip: "acoso psicológico entre iguales en internet y redes sociales, suele derivar del acoso escolar"
    }
	]
};
