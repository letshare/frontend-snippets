$(function () {
	$('#mytabset').semantictabs({
		panel:'panel',	//-- Selector of individual panel body
		head:'h3',			//-- Selector of element containing panel header
		active:':first'	//-- Which panel to activate by default
	});
});
