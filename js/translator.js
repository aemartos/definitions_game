import {LOCALES} from './locales.js';


export default class Translator{
    constructor(lang){
        this.lang = lang;
    }
    changeLocale(lang){
      this.lang = lang;
    }
    t(txt){
      if(this.lang==="es"){
        return txt;
      } else if(LOCALES[this.lang]!==undefined && LOCALES[this.lang][txt]!==undefined){
        return LOCALES[this.lang][txt];
      } else {
        return txt + " not found in translations of lang: " + this.lang;
      }

  }
}
