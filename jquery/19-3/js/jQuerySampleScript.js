$(function () {
	$('#calendar').jCal({
		day: new Date(),
		days: 1,
		showMonths: 2,
		monthSelect: true,
		dow: ['日', '一', '二', '三', '四', '五', '六'],
		ml: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		callback: function (day, days) {
			$('#result').html(day.getFullYear() + '/' + (day.getMonth() + 1) +'/'+ day.getDate());
		}
	});
});
