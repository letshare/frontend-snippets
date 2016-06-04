$(function () {
	$.stylesheetInit();

	$('#toggler').bind('click', function() {
		$.stylesheetToggle();
		return false;
	});

	$('.styleswitch').bind('click', function() {
		$.stylesheetSwitch(this.getAttribute('rel'));
		return false;
	});
});
