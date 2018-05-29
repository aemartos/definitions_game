import Translator from './translator';


export default class TranslatorManager{
    constructor(lang){
      this.trans = new Translator(lang);
    }
    update(){
      $(".main_text").html(this.trans.t("¿te atreves con este reto? tienes una hora para completar y superar nuestro muro de palabras, sobre uso seguro de internet y las TIC"));
      $(".text_elab").html(this.trans.t("una aplicación de"));
      $(".start_game_text").html(this.trans.t("empezar prueba"));
      $(".credits").html(this.trans.t("créditos"));
      $(".time_text").html(this.trans.t("tiempo"));
      $(".score_text").html(this.trans.t("puntos"));
  }
  changeLocale(lang){
    this.trans.changeLocale(lang);
    this.update();
  }

}

//$("").html(trans.t(""));
