	
$(document).ready(function(){
	
	
	$('.sliderNewsPhoto').slick({
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 3,
		slidesToScroll: 3,
		 responsive: [
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				dots: true
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			  }
			}
		]
	});
	
	$('.MainSlider').slick({
		dots: true
	});
	
	 $('.list_adds img').one('load',function() {
        $('.list_adds').packery({
		  itemSelector: '.list_adds li',
		});
    });
	
	
	$('.caruselAbout').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		 responsive: [
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				dots: true
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			  }
			}
		]
	});
	
	$('.sldierComents').slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		 responsive: [
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				dots: true
			  }
			}
		]
	});
	
	
	if ($(".service_slider_box").length) {
		var slider = document.getElementById('serviceSlider');
		noUiSlider.create(slider, {
			 start: 2,
			step: 1,
			connect: "lower",
			range: {
			  'min': 0,
			  'max': 5
			},
			serialization: {
			  format: {
				decimals: 0
			  }
			}
		});
		slider.noUiSlider.on('update', function( values, handle ) {
			var value = values[handle];
			highlightLabel(value);
		});
		
	}
	function highlightLabel($this) {
		$('#serviceSliderNav li').removeClass('select_active');
		$('#serviceSliderNav li').removeClass('active');
		var index = parseInt($this);
			selectorAll = $('#serviceSliderNav li.select_active').length;
		var selector = '#serviceSliderNav li:eq(' + index + ')';
		$(selector).addClass('active');
		if (index > selectorAll) {
				for (i = 0; i < index; i++) {
					$('#serviceSliderNav li').eq(i).addClass('select_active');
					
				}
			}
		
		}
	
	
	
	
	$('.sliderAwards').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		 responsive: [
			{
			  breakpoint: 1200,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				dots: true
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			  }
			}
		]
	});
	
	
	$('.sldierPgoto').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		dots: true,
		 responsive: [
			{
				breakpoint:2000,
				settings:"unslick"
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			}
		]
	});
	
	

});