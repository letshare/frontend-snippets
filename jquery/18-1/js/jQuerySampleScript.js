$(function () {
	$('ul.overscroll li:even').css({
		'backgroundColor': '#000',
		'color': '#fff'
	});
	$('ul.overscroll').overscroll();
});
