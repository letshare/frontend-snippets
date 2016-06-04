$(function () {
	$('#slider').slider({
		max: 30,
		min: parseFloat($('#content').css('fontSize')),
		slide: function(event, ui) {
			$('#content').css('fontSize', ui.value);
		}
	});
});
