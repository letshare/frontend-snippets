$(function () {
	$('.column').sortable({
		connectWith: '.column',
		forcePlaceholderSize : true,
		placeholder: 'ui-state-highlight'
	});

	$('.portlet').addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all');
	$('.header').addClass('ui-widget-header ui-corner-all');

	$('.column').disableSelection();
});
