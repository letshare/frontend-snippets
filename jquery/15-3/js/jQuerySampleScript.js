$(function () {
	(function effectMode() {
		$('#effect').effect('scale', {percent: 0}, 3000, callback);
	})();
	function callback(){
			setTimeout(function(){
				$("#effect:hidden").removeAttr('style').hide().fadeIn();
			}, 1000);
	};
});
