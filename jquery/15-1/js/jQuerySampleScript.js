$(function () {
	$('button').click(function() {
			$('#effect').queue([]).addClass('effect', 1000, function() {
				$(this).removeClass('effect', 2000);
			});
	});
});
