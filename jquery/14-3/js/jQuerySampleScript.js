$(function () {
	$('#dialog').dialog({
		bgiframe: true,
		autoOpen: false,
		modal: true,
		buttons: {
			'追加': function() {
				$('<tr/>')
					.append($('<td/>').text($('#item').val()))
					.append($('<td/>').text($('#quantity').val()))
				.appendTo('#itemList tbody');
				$(this).dialog('close');
			},
			'关闭': function() {
				$(this).dialog('close');
			}
		},
		close: function(event) {
			$(':text').val('');
		}
	});

	$('#add').click(function() {
		$('#dialog').dialog('open');
	});
});
