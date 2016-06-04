$(function () {

	var date      = new Date();
	var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
	var lastDate  = new Date(date.getFullYear(), date.getMonth() + 1, 0);

	// 设置年月
	$('h2').text(date.getFullYear() + '/' + (date.getMonth() + 1));

	// 设置星期
	var week = ['日', '一', '二', '三', '四', '五', '六'];
	$.each(week, function(index, value) {
		if (index == 0) {
			$('<li/>').text(value).css('backgroundColor', '#f00').appendTo('ul');
		} else {
			$('<li/>').text(value).appendTo('ul');
		}
	});

	// 设置日期
	var calendarNum = (firstDate.getDay() + lastDate.getDate()) <= 35 ? 7 * 5 : 7 * 6;
	var day = 0;
	$.each((new Array(calendarNum)), function(index, value) {
		var dayValue = '';
		if (index >= firstDate.getDay() && day < lastDate.getDate()) {
			day++;
			dayValue = (date.getMonth() + 1) + '/' + day;
		}
		if ((new Date(date.getFullYear(), date.getMonth(), day).getDay()) == 0 && dayValue != '') {
			$('<li/>').text(dayValue).css('backgroundColor', '#f00').appendTo('ul');
		} else {
			$('<li/>').text(dayValue).appendTo('ul');
		}
	});

	// 指定多个选择设置
	$('ul').selectable({
		filter: 'li:contains(' + (date.getMonth() + 1) + '/)',
		stop: function() {
			var result = $('#result').empty();
			$('.ui-selected', this).each(function(){
				result.append('<' + $(this).text() + '>');
			});
		}
	});
});
