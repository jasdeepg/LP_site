$(document).ready(function(){

	/*************************************
	* INITIALIZATION BLOCK
	* vars, checks, functions that run on first load
	**************************************/
	// initialize variables
	var window_height = $(window).height();		//window height
	var window_width = $(window).width();		//window width
	var aspect_ratio = window_width/window_height;	//aspect ratio
	var aspect_flag = false;					// aspect ratio flag for switch statements
	var percent_full = window_width/1280;		// percent full measure for scaling components
	var timeout = 0;							// timer measure
	var colors = ['rgb(241,100,100)', 'rgb(162,216,203)', 'rgb(212,173,209)', 'rgb(246,148,114)']; // color for front panel
	var rand_color = Math.floor(Math.random()*4);	// random color selector
	var flag = 0;								// flag for initializing components	on first window measure

	var testDevice = function() {	// true if we're on a mobile device -- doesn't work for WinMo
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check; }	
	
	// store locations store components for jquery reference
	$okc = $('#okc_map');
	$tulsa = $('#tulsa_map');
	$chicago = $('#chicago_map');
	$roseville = $('#roseville_map');

	// check if components have been adjusted for screen resolution
	if (flag==0){	
		flag = 1;
		adjust_components();
	}

	/*************************************
	* MAIN BLOCK
	* run on load
	**************************************/

	//is it a mobile device?
	isMobile();

	//test if aspect ratio is too low to sustain parallax
	aspectRatioTest();

	/*************************************
	* FUNCTION BLOCK
	* abstract some functions
	**************************************/
	// function to check if we're on a mobile device
	function isMobile(){
		testDevice();

		// is it mobile? yes -- then fix our panel backgrounds
		if (testDevice()){
			$('.story').css('width','100%');
			$('#second').css('background-attachment','scroll');
			$('#second').css('background-position', '25%')
			$('#third').css('background-attachment','scroll');
			$('#third').css('background-position','25%');
		}
	}

	// check the aspect ratio so we can disable parallax if we need
	function aspectRatioTest(){
		aspect_ratio = window_width/window_height;	//aspect ratio
		aspect_flag = false;

		// are we on an aspect ratio that can't support parallax? yes -- then fix our panel backgrounds
		if (aspect_ratio < 1.6){
			aspect_flag = true;
			$('.story').css('width','100%');
			$('#second').css('background-attachment','scroll');
			$('#second').css('background-position', '25%');
			$('#second-promo').css('background-attachment','scroll');
			$('#second-promo').css('background-position','25%');
			$('#third').css('background-attachment','scroll');
			$('#third').css('background-position','25%');
			$('#fourth').css('background-attachment','scroll');
			$('#fourth').css('background-position','25%');
		}
		else {
			aspect_flag = false;
			$('.story').css('width','100%');
			$('#second').css('background-attachment','fixed');
			$('#second').css('background-position', '100%')
			$('#second-promo').css('background-attachment','fixed');
			$('#second-promo').css('background-position','100%');
			$('#third').css('background-attachment','fixed');
			$('#third').css('background-position','100%');
			$('#fourth').css('background-attachment','fixed');
			$('#fourth').css('background-position','100%');
		}
	}

	// adjust the components regularly to scale components to [screen size, device, aspect ratio]
	function adjust_components(){
		// first panel adjustments
			// scale and center logo
		$('#first img').css('width', (window_width)*.375+'px')
		$('#first img').css('height', 'auto');
		$('#first img').css('left', '-'+$('#first img').width()/2+'px')
			// change panel background color
		$('#first').css('background-color', colors[rand_color])
					
			//adjust parallax background offset
		$('#third').data('offsetY', percent_full*95+percent_full*100);

		// store components
			// divs scaling
		$('.location').css('height', percent_full*100);
		$('.location').css('line-height', (percent_full*2.5)+'em');
			// store detail scaling
		$('.store-city').css('font-size', (window_width*.04)+'px');
		$('.store-address').css('font-size', (window_width*.0156)+'px')
		$('.store-detail').css('height', (window_width)*.0390625+'%')
			// expand button scaling
		$('.expand').css('font-size', (window_width*.0156)+'px')
		$('.expand img').css('width', (window_width)*.01645+'px')
		$('.expand img').css('height', (window_width)*.01645+'px')
		
		// nav scaling
			// nav panel
		$('#nav').css('background-color', colors[rand_color])
		$('#nav').css('height', (window_width*.046875)+'px')
			// nav list items
		$('#nav #nav-items ul').css('font-size', (window_width*.0234375)+'px')
		$('#nav #nav-items li').css('padding-right', (window_width*.0234375)+'px')
		$('#nav #nav-items li').css('padding-left', (window_width*.0234375)+'px')
			// nav social icons
		$('#social img').css('width', (window_width)*.015+'px')
		$('#social img').css('height', 'auto');
			// bottom stamp
		$('.stamp img').css('height', (window_width)*.0585+'px')
		$('.stamp img').css('width', (window_width)*.0585+'px')

		// panel classes
			// change panel heights
		$('.story').css('height', (window_width*.5078125)+'px')
			// set image width
		$('.story').css('background-size', window_width+window_width/3);
			// adjust text size
		$('.content-contain').css('font-size', (window_width/22) + 'px');
		$('#second').css('font-size', (window_width/1280)*38.4);
		$('#second p').css('line-height', (window_width/1280)*60+'px');
		$('.content-contain .sub-content').css('font-size', (window_width*.015)+'px')

		//mobile adjustments
		$('.small-story').css('font-size', (window_width*.049396268)+'px')

		//promo panel
		$('#second-promo form').css('bottom', (window_width/1280)*5+'%');
		$('#second-promo .banner-promo').css('width', (window_width/1280)*700+'px');
		$('#second-promo .banner-promo').css('height', (window_width/1280)*80+'px');
		$('#second-promo .banner-promo p').css('line-height', (window_width/1280)*60+'px');
		$('#second-promo .banner-promo').css('font-size', (window_width/1280)*36.9+'px');
	}

	/*************************************
	* EVENT BLOCK
	* events for various actions and components
	**************************************/

	//small site
	$('#about').click(function(){
		$('#about-desc').animate({
		    height: 'toggle'
		  }, 10, function() {
		    // Animation complete.
		    $('.small-story #stores-desc').hide();
		   	$('.small-story #sweets-desc').hide();
		  });
	})
	$('#stores').click(function(){
		$('#stores-desc').animate({
		    height: 'toggle'
		  }, 10, function() {
		    // Animation complete.
		    $('.small-story #about-desc').hide();
		   	$('.small-story #sweets-desc').hide();
		  });
	})
	$('#sweets').click(function(){
		$('#sweets-desc').animate({
		    height: 'toggle'
		  }, 10, function() {
		    // Animation complete.
		    $('.small-story #about-desc').hide();
		   	$('.small-story #stores-desc').hide();
		  });
	})

	// animate store location panels
	$('#loc-fourth').click(function(){
		$roseville.animate({
		    height: 'toggle'
		  }, 250, function() {
		    // Animation complete.
		    $('.rect-filler-roseville').show();
		    $tulsa.hide();
		    $okc.hide();
		    $chicago.hide();
		    initialize();
		  });
	})

	$('#loc-third').click(function(){
		$chicago.animate({
		    height: 'toggle'
		  }, 250, function() {
		    // Animation complete.
		    $('.rect-filler-chicago').show();
		    $tulsa.hide();
		    $okc.hide();
		    $roseville.hide();
		    initialize();
		  });
	})	

	$('#loc-second').click(function(){
		$okc.animate({
		    height: 'toggle'
		  }, 250, function() {
		    // Animation complete.
		    $('.rect-filler').show();
		    $tulsa.hide();
		    $chicago.hide();
		    $roseville.hide();
		    initialize();
		  });
	})	

	$('#loc-first').click(function(){
		$tulsa.animate({
		    height: 'toggle'
		  }, 250, function() {
		    // Animation complete.
		    $('.rect-filler').hide();
		    $okc.hide();
		    $chicago.hide();
		    $roseville.hide();
		    initialize();
		});
	})

	// adjust components whenever the window is resized
	$(window).resize(function() {
	  // This will execute whenever the window is resized
	  window_height = $(window).height(); // New height
	  window_width = $(window).width(); // New width
	  percent_full = window_width/1280;
	  adjust_components();
	  aspectRatioTest();
	});

	// play video if the fourth panel is clicked
	$('#fourth').click(function(){
		$('#fourth img').css('display', 'none')
		$('.lp-vid').attr('src', 'http://player.vimeo.com/video/45144457?autoplay=true&title=0')
		$('.lp-vid').show();
		$('#vid').hide();
	});

	// track the mouse movements for the menu -- fade in and out
	$('html').mousemove(function(e){
		if ($(window).scrollTop() > $('#first').height()-75){
			$('#nav').fadeIn('slow').css('display', 'block');
			$('#social').fadeIn('slow').css('display', 'block');
			if ($(window).scrollTop() < ($('#fourth').offset().top - $('#fourth').height())){
				$('.stamp').fadeIn('slow').css('display', 'block');
				$('.panel').fadeIn('slow').css('display', 'block')
			}
			if (!testDevice()){
			clearTimeout(timeout);
	  		timeout = setTimeout(function(){$('#nav').fadeOut('slow'); $('#social').fadeOut();$('.stamp').fadeOut('slow');}, 2000);		}
  		}
	})

	// track window scroll to fade menu in and out
	$(window).scroll(function(){
		if ($(window).scrollTop() < $('#first').height()-75){
			$('#nav').fadeOut('slow');
			$('#social').fadeOut('slow');
			$('.stamp').fadeOut('slow');
		}
		else if ($(window).scrollTop() > ($('#fourth').offset().top - $('#fourth').height())){
			$('.stamp').fadeOut('slow');
			$('.panel').fadeOut('slow');
		}
		else if ($(window).scrollTop() > $('#first').height()-75){
			$('#nav').fadeIn('slow').css('display', 'block');
			$('#social').fadeIn('slow').css('display', 'block');
			$('.stamp').fadeIn('slow').css('display', 'block');
		}

	})

	//
	// Parallax code -- adapted from Smashing Magazine
	//

	// Cache the Window object
	$window = $(window);
	
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});
	
	// For each element that has a data-type attribute
	$('section[data-type="background"]').each(function(){
	
		// Store some variables based on where we are
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;

		if (!testDevice()){
		// When the window is scrolled...
		    $(window).scroll(function() {

		    	// don't do parallax if our aspect ratio is below a threshold
		    	if (!aspect_flag){
					// If this section is in view
					if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
						 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {				
			
						// Scroll the background at var speed
						// the yPos is a negative value because we're scrolling it UP!								
						var yPos = -($window.scrollTop() / $self.data('speed')); 
						
						// If this element has a Y offset then add it on
						if ($self.data('offsetY')) {
							yPos += $self.data('offsetY');
						}
						
						// Put together our final background position
						var coords = '50% '+ Math.round(yPos) + 'px';

						
						// Move the background
						$self.css({ backgroundPosition: coords });
					
					}; // in view

				}
			}); // window scroll
		}
	});	// each data-type

}); // document ready
