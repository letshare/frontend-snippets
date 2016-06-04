$(function () {
	$('#draggable li').draggable({
		connectToSortable: '#sortable',
		cursorAt: {top: 2, left: 2},
		helper: 'clone',
		revert: 'invalid'
	});
	$('#sortable').sortable({
		items: 'li:gt(0)',
		revert: true,
		out: function() {
			$('#result').empty();
			$(this).children().each(function(index) {
				if(index == 0) return;
				$('#result').append('<p>第' + index + '号的' + $(this).text() + '。</p>');
			});
		}
	});
	$('#draggable li, #sortable li').disableSelection();
});
