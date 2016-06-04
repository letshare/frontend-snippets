$(function () {
	$('#draggable li').draggable({
		cursorAt: {top: 2, left: 2},
		helper: 'clone',
		revert: 'invalid'
	});
	$('#droppable').droppable({
		drop: function(event, ui) {
			$(ui.draggable).fadeOut('slow', function() {
				$(this).remove();
			})
			.fadeIn(function() {
				$('#resule').append(this);
			});
		}
	});
	$('#draggable li, #droppable, #resule li').disableSelection();
});
