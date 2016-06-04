$(function () {
	$('.resizable').resizable({
		aspectRatio: true,
		start: function(event, ui) {
			if(!$(this).resizable('option', 'maxHeight')) {
				$(this).resizable('option', 'maxHeight', ui.originalSize.height * 2);
				$(this).resizable('option', 'maxWidth', ui.originalSize.width * 2);
				$(this).resizable('option', 'minHeight', ui.originalSize.height);
				$(this).resizable('option', 'minWidth', ui.originalSize.width);
			}
		}
	});
});
