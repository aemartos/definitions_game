import Translator from './translator';


export default class TranslatorManager{
  constructor(translator){
    this.trans = translator;
  }
  update(){
    $("#main_text").html(this.trans.t("¿te atreves con este reto? tienes una hora para completar y superar nuestro muro de palabras, sobre uso seguro de internet y las TIC"));
    $("#text_elab").html(this.trans.t("una aplicación de"));
    $("#start_game_text").html(this.trans.t("empezar prueba"));
    $("#openCredits").html(this.trans.t("créditos"));
    $("#time_text").html(this.trans.t("tiempo"));
    $("#score_text").html(this.trans.t("puntos"));
    $("#modalCredits .modal-title-prin").html(this.trans.t("créditos"));
    $("#modalCredits .modal-text-info").html(this.trans.t("aplicación de <a href='#' target='_blank'><img class='e_logo' src='assets/images/logos/elab_logo_black.svg'/></a>, desarrollada por el Grupo Internet de Nueva Generación de la UPM, con el apoyo institucional del INCIBE, el CRIF las Acacias y Orange."));
    $("#modalCredits .modal-title-license").html(this.trans.t("licencia"));
    $("#modalCredits .modal-text-license").html(this.trans.t("esta obra está bajo una <a href='https://creativecommons.org/licenses/by-nc/4.0/' target='_blank'>licencia de Creative Commons Reconocimiento-NoComercial 4.0 Internacional.</a> <a href='https://creativecommons.org/licenses/by-nc/4.0/' target='_blank'><img class='license_logo' src='assets/images/logos/license.png'/></a>"));
    $("#modalInfo .modal-title-prin").html(this.trans.t("instrucciones"));
    $("#modalInfo .modal-text-info").html(this.trans.t("para comprobar una palabra pulsa intro o haz click en el botón de check. tienes un intento, pero puedes ayudarte de los comodines si te atascas. los controles son muy sencillos:"));
    $("#modalInfo .t-info").html(this.trans.t("muestra las instrucciones"));
    $("#modalInfo .t-progress").html(this.trans.t("muestra el progreso"));
    $("#modalInfo .t-reset").html(this.trans.t("reinicia la prueba"));
    $("#modalInfo .t-stop").html(this.trans.t("finaliza la prueba"));
    $("#modalInfo .t-full").html(this.trans.t("modo pantalla completa"));
    $("#modalInfo .btn-red").html(this.trans.t("cerrar"));
    $("#modalProgress .modal-title-prin").html(this.trans.t("progreso de la prueba"));
    $("#modalProgress .modal-text-info").html(this.trans.t("palabras contestadas <span class='game-score'></span>"));
    $("#modalProgress .modal-text-right").html(this.trans.t("palabras contestadas bien <span class='game-score-right'></span>"));
    $("#modalProgress .modal-text-wrong").html(this.trans.t("palabras contestadas mal <span class='game-score-wrong'></span>"));
    $("#modalProgress .btn-red").html(this.trans.t("cerrar"));
    $("#modalReset .modal-title-prin").html(this.trans.t("reiniciar la prueba"));
    $("#modalReset .modal-text-info").html(this.trans.t("¿estás seguro de que quieres reiniciar la prueba? esta acción eliminará todo tu progreso."));
    $("#modalReset .btn-red").html(this.trans.t("cancelar"));
    $("#modalReset .btn-green").html(this.trans.t("aceptar"));
    $("#modalStop .modal-title-prin").html(this.trans.t("finalizar la prueba"));
    $("#modalStop .modal-text-info").html(this.trans.t("¿estás seguro de que quieres parar y finalizar la prueba? todavía tienes <span class='game-score'></span> palabras sin contestar."));
    $("#modalStop .btn-red").html(this.trans.t("cancelar"));
    $("#modalStop .btn-green").html(this.trans.t("aceptar"));
    $("#modalFinal .modal-title-end").html(this.trans.t("¡enhorabuena! terminaste"));
    $("#modalFinal .modal-text-info.answerGreat").html(this.trans.t("eres un crack, ¡has acertado casi todas! dominas muy bien el lenguaje de internet y las TIC, enhorabuena"));
    $("#modalFinal .modal-text-info.answerNormal").html(this.trans.t("lo has hecho bastante bien, pero has fallado algunas. siempre se puede aprender algo más acerca de internet y las TIC"));
    $("#modalFinal .modal-text-info.answerBad").html(this.trans.t("no has acertado muchas, ¡necesitas dar un repaso! es muy importante que aprendas uso seguro TIC e internet"));
    $("#modalFinal .score-time").html(this.trans.t("tiempo"));
    $("#modalFinal .score-right").html(this.trans.t("aciertos"));
    $("#modalFinal .score-points").html(this.trans.t("puntos"));
    $("#modalFinal .btn-red-r").html(this.trans.t("reiniciar"));
    /*$("#modalFinal .btn-red-t").html(this.trans.t("terminar"));
    $("#modalFinal .btn-green").html(this.trans.t("ver respuestas"));*/
    $("#modalFinal .btn-green").html(this.trans.t("terminar"));
    $("#tip_type_tip").html(this.trans.t("pista extra"));
    $("#tip_type_two").html(this.trans.t("dos intentos"));
    $("#tip_type_number").html(this.trans.t("número de letras"));
    $("#tip_type_next").html(this.trans.t("siguiente letra"));
    $("#two_tries_1_more").html(this.trans.t("tienes 1 intento extra"));
    $("#two_tries_try_again").html(this.trans.t("no es correcto, prueba otra vez"));
  }
  changeLocale(lang){
    this.trans.changeLocale(lang);
    this.update();
  }
}

//$("").html(this.trans.t(""));
