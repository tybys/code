$(function () {
	// custom select, by jquery.chosen, TABASOV
	var customSelectChosen = $('select.customChosen');
	$.each(customSelectChosen, function (key, val) {
		var t = $(this);

		t.chosen({
			disable_search: true
		});
	});
});