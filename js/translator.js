import {LOCALES} from './config/locales.js';


export default class Translator{
  constructor(lang){
      if(lang==="es" || LOCALES[this.lang]!==undefined){
        this.lang = lang;
      } else {
        this.lang = "en"; //default language
      }
  }
  changeLocale(lang){
    this.lang = lang;
  }
  getLocales(){
    let locales = Object.keys(LOCALES);
    locales.push("es");
    return locales;
  }
  t(txt){
    if(this.lang==="es"){
      return txt;
    } else if(LOCALES[this.lang]!==undefined && LOCALES[this.lang][txt]!==undefined){
      return LOCALES[this.lang][txt];
    } else {
      console.log("WARNING: " + txt + " not found in translations of lang: " + this.lang);
      return txt;
    }
  }
}
