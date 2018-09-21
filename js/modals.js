const { styler, timeline, listen, easing } = window.popmotion;
import {state} from './config/config';
import UIManager from './uimanager';

export default class ModalManager{
  constructor(eventmanager){
    this.ev = eventmanager;

    this.modalShade = document.querySelector('#dark-opacity');
    this.modalShadeStyled = styler(this.modalShade);

    //--------- CREDITS MODAL------------
    this.openCreditsButton = document.querySelector('#openCredits');
    this.crossCreditsButton = document.querySelector('#modalCredits .control.control_cross');

    //--------- INFO MODAL------------
    this.startGameButton = document.querySelector('#start_button');
    this.openInfoButton = document.querySelector('#openInfo');
    this.crossInfoButton = document.querySelector('#modalInfo .control.control_cross');
    this.closeInfoButton = document.querySelector('#modalInfo .btn-red');

    //--------- PROGRESS MODAL------------
    this.openProgressButton = document.querySelector('#openProgress');
    this.crossProgressButton = document.querySelector('#modalProgress .control.control_cross');
    this.closeProgressButton = document.querySelector('#modalProgress .btn-red');

    //--------- RESET MODAL------------
    this.openResetButton = document.querySelector('#openReset');
    this.crossResetButton = document.querySelector('#modalReset .control.control_cross');
    this.cancelResetButton = document.querySelector('#modalReset .btn-red');
    this.acceptResetButton = document.querySelector('#modalReset .btn-green');

    //--------- STOP MODAL------------
    this.openStopButton = document.querySelector('#openStop');
    this.crossStopButton = document.querySelector('#modalStop .control.control_cross');
    this.cancelStopButton = document.querySelector('#modalStop .btn-red');
    this.acceptStopButton = document.querySelector('#modalStop .btn-green');

    //--------- FINAL MODAL------------
    this.crossFinalButton = document.querySelector('#modalFinal .control.control_cross');
    //this.resetFinalButton = document.querySelector('#modalFinal .btn-red-r');
    //this.finishFinalButton = document.querySelector('#modalFinal .btn-red-t');
    //this.answersFinalButton = document.querySelector('#modalFinal .btn-green');
    this.finishFinalButton = document.querySelector('#modalFinal .btn-green');

    this.modal = {};
    this.openedmodal = {};
    this.isopenmodal = false;

    this.init_modals = this.init_modals.bind(this);
    this.setStylers = this.setStylers.bind(this);
    this.showContainers = this.showContainers.bind(this);
    this.hideContainers = this.hideContainers.bind(this);
    this.openModal = this.openModal.bind(this);
    this.acceptModal = this.acceptModal.bind(this);
    this.cancelModal = this.cancelModal.bind(this);

    this.add_ui_manager = this.add_ui_manager.bind(this);
    this.isOpenedModal = this.isOpenedModal.bind(this);
  }
  add_ui_manager(uimanager){
    this.ui = uimanager;
  }
  init_modals(){
    listen(this.modalShade, 'click').start(this.cancelModal);

    listen(this.openCreditsButton, 'click').start(()=>{this.openModal("modalCredits")});
    listen(this.crossCreditsButton, 'click').start(this.cancelModal);

    listen(this.openInfoButton, 'click').start(()=>{this.openModal("modalInfo")});
    listen(this.startGameButton, 'click').start(()=>{this.openModal("modalInfo")});
    listen(this.crossInfoButton, 'click').start(this.cancelModal);
    listen(this.closeInfoButton, 'click').start(this.cancelModal);

    listen(this.openProgressButton, 'click').start(()=>{this.openModal("modalProgress")});
    listen(this.crossProgressButton, 'click').start(this.cancelModal);
    listen(this.closeProgressButton, 'click').start(this.cancelModal);

    listen(this.openResetButton, 'click').start(()=>{this.openModal("modalReset")});
    listen(this.crossResetButton, 'click').start(this.cancelModal);
    listen(this.cancelResetButton, 'click').start(this.cancelModal);
    listen(this.acceptResetButton, 'click').start(this.acceptModal);

    listen(this.openStopButton, 'click').start(()=>{this.openModal("modalStop")});
    listen(this.crossStopButton, 'click').start(this.cancelModal);
    listen(this.cancelStopButton, 'click').start(this.cancelModal);
    listen(this.acceptStopButton, 'click').start(this.acceptModal);

    listen(this.crossFinalButton, 'click').start(this.cancelModal);
    //listen(this.resetFinalButton, 'click').start(this.cancelModal);
    listen(this.finishFinalButton, 'click').start(this.cancelModal);
    //listen(this.answersFinalButton, 'click').start(this.acceptModal);
  }
  isOpenedModal(){
    return this.isopenmodal;
  }
  tweenUp(track, duration = 500, yFrom = 100) {
    return {track,
            duration,
            from: { y: yFrom, opacity: 0 },
            to: { y: 0, opacity: 1 },
            ease: { y: easing.backOut, opacity: easing.linear }}
  }
  setStylers(v){
    if (v.shade !== undefined) this.modalShadeStyled.set('opacity', v.shade);
    if (v.modal !== undefined) this.modal.set(v.modal);
    /*sectionLabels.forEach((label, i) => {
      if (v[label] !== undefined) modalSections[i].set(v[label])
    });*/
  }
  showContainers(modalid){
    this.modalShadeStyled.set('display', 'block');
    var modalContainer = styler(document.querySelector("#" + modalid));
    modalContainer.set('display', 'block');
  }
  hideContainers(modalid){
    this.modalShadeStyled.set('display', 'none');
    var modalContainer = styler(document.querySelector("#" + modalid));
    modalContainer.set('display', 'none');
    this.isopenmodal = false;
  }
  openModal(modalid){
    this.modal = styler(document.querySelector('#'+modalid+' .modal'));
    this.openedmodal = modalid;
    this.isopenmodal = true;
    this.fillModal(modalid);
    this.showContainers(modalid);
    //pause timer
    state.time_paused = true;
    if(modalid==="modalFinal"){
      $("#main_input").blur();
    }
    timeline([
      { track: 'shade', from: 0, to: 1, ease: easing.linear },
      '-100',
      this.tweenUp('modal'),
      '-200'
      //[...modalSections.map((s, i) => tweenUp(sectionLabels[i], 300, 50)), 50]
    ]).start(this.setStylers);
  }
  fillModal(modalid){
    if(modalid==="modalFinal"){
      this.final_time = $('#final_time');
      this.final_progress = $('#final_progress');
      this.final_score = $('#final_score');

      this.final_time.html(this.ui.toHHMMSS(state.time));
      this.final_progress.html(state.success + "/" + state.letters.length);
      this.final_score.html(state.score);
    }
    if(modalid==="modalProgress"){
      this.progress_modal_text = $('.game-score');
      this.progress_modal_text.html(state.progress + "/" + state.letters.length);
    }
  }
  cancelModal(){
    //unpause timer
    $("#main_input").focus();

    state.time_paused = false;
    timeline([
      {
        track: 'modal',
        duration: 200,
        from: { y: 0, opacity: 1 },
        to: { y: 100, opacity: 0 },
        ease: { y: easing.easeIn, opacity: easing.linear }
      },
      '-100',
      { track: 'shade', from: 1, to: 0, ease: easing.linear, duration: 200 }
    ]).start({
      update: this.setStylers,
      complete: ()=> {
        this.hideContainers(this.openedmodal);
        if(this.openedmodal==="modalFinal"){
          this.ev.resetGame();
        }
      }

    });
  }
  processModal(modalid){
    if(modalid==="modalStop"){
      this.openModal("modalFinal");
    }
  }
  acceptModal(modalid){
    //unpause timer
    //$("#main_input").focus();
    state.time_paused = false;
    timeline([
      {
        track: 'modal',
        duration: 200,
        from: { y: 0, opacity: 1 },
        to: { y: -200, opacity: 0 },
        ease: { y: easing.easeOut, opacity: easing.linear }
      },
      '-100',
      { track: 'shade', from: 1, to: 0, ease: easing.linear, duration: 300 }
    ]).start({
      update: this.setStylers,
      complete: ()=>{
        this.hideContainers(this.openedmodal);
        this.processModal(this.openedmodal);
      }
    });
  }
}
