import {state, UI_CONFIG} from './config/config';

export default function handleOrientationChange(mediaqueryevent, force_matches) {
  //we don't use mediaqueryevent because this function is called when entering or exiting two media queries
  //and mediaqueryevent.matches can be true or false because entering or exiting any of the two mediaqueries
  //we use the mediaqueries directly
  if(UI_CONFIG.mediaquery1.matches || UI_CONFIG.mediaquery2.matches || force_matches) {
		$('.owl-carousel').owlCarousel('destroy').owlCarousel({
        loop:true,
        margin:10,
        dots: true,
        startPosition: state.actual_letter,
        //nav: true,
    		navText: ["<div class='owl-prev'><img class='control control_left_arrow svg' src='assets/images/icons/left_arrow_fill.svg'/></div>","<div class='owl-next'><img class='control control_right_arrow svg' src='assets/images/icons/right_arrow_fill.svg'/></div>"],
        responsiveClass: true,
        responsiveBaseElement: ".word-wall",
        responsive:{
            0:{
                items:1,
                nav:true,
                dots: false
            },
            500:{
                items:4,
                nav:false
            },
            1000:{
                items:4,
                loop:false
            }
    	    }
		});

  } else {
  	 $('.owl-carousel').owlCarousel('destroy');
  }
}
