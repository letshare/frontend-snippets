$(function () {
	var fn = {
		hide: function() {
			$('#effect').hide('fold', {}, 2000, fn.setTimeOut(fn.show));
		},
		show: function() {
			$('#effect').show('fold', {}, 2000, fn.setTimeOut(fn.hide));
		},
		setTimeOut: function(object) {
			setTimeout(object, 0);
		}
	}
	fn.setTimeOut(fn.hide);
});
