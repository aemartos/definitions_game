export default function handleOrientationChange(mediaqueryevent, force_matches) {
  if (force_matches || (mediaqueryevent && mediaqueryevent.matches) ) {
		$('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        dots: true,
        //dots: false,
        //nav: true,
    		navText: ["<div class='owl-prev'><img class='control control_left_arrow svg'src='/assets/images/icons/left_arrow_fill.svg'/></div>","<div class='owl-next'><img class='control control_right_arrow svg'src='/assets/images/icons/right_arrow_fill.svg'/></div>"],
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
                items:5,
                loop:false
            }
    	    }
		});

  } else {
  	 $('.owl-carousel').owlCarousel('destroy');
  }
}
