$(function () {

	dropDownBuilder();
	$('.drop').hover(function () {
		var t = $(this);

		t.addClass('act');
		t.find('.submenu').show().addClass('c-act');

		// ofs
		var el = t;

		if (el.children('ul').offset().left + el.children('ul').outerWidth(true) > $('.mega-menu .container').width()) {
			el.children('ul').css({
				left: 'auto',
				right: 0
			})
		} else {
			el.children('ul').css({
				left: 0
			})
		}
	}, function () {
		var t = $(this);

		t.removeClass('act');
		t.find('.submenu').hide().removeClass('c-act');
	});
	//debugger
});

$.fn.Exists = function() {
	return this.length > 0
};

function dropDownBuilder() {
	// on DOMREADY parse menu, get childrens count, add class to <li> root tag
	/*
	col-1
	col-2
	col-3
	3 is max, 1 - min;
	max col width - 250
	 */
	var menu = $('.menu').find('.drop');

	$.each(menu, function (key, val) {
		var t = $(this);
		var dropMenuCount = t.children().find('div').length;

		t.addClass('col-'+dropMenuCount);
	});
};