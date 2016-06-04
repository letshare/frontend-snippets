$(function () {
	$('#jticker').ticker({
		cursorList: ' ',
		rate: 40,
		delay: 4000
	}).trigger('play');

	$('.next').live('click', function(){
		$('#jticker').trigger({
			type: 'play'
		});
		return false;
	});
});
