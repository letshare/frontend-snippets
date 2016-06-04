$(function () {
	$('button').toggle(
		function() {
			$('#animate').animate({
				backgroundColor: '#000',
				color: '#fff',
				fontSize: '5em'
			}, 3000);
		},
		function() {
			$('#animate').animate({
				backgroundColor: '#fff',
				color: '#000',
				fontSize: '1em'
			}, 3000);
		}
	);
});
