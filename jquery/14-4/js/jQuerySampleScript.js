$(function () {
	$('#progressbar').progressbar({ value: 0 });
	var intervalCode = setInterval((function() {
		var counter = 0;
		return function() {
			counter > 100 ? clearInterval(intervalCode) : $('#progressbar').progressbar('value', ++counter);
		}
	})(), 100);
});
