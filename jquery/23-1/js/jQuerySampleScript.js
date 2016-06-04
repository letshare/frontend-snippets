$(function () {
	$.jsonp({
		url: 'http://api.flickr.com/services/rest/',
		data: {
			'format': 'json',
			'method': 'flickr.photos.search',
			'api_key': '9e343b2993df66bc3846fb57ab1f0e63',
			'text': 'snow'
		},
		callbackParameter: 'callback',
		callback: 'jsonFlickrApi',
		beforeSend: function (xOptions) {
			$('#flickr').empty();
		},
		success: function (json, textStatus) {
			if (json.stat !== 'ok') return this.error(this, textStatus);

			$.each(json.photos.photo, function () {
				var WebPageURL = 'http://www.flickr.com/photos/{owner}/{id}';
				$.each(this, function (index, value) {
					WebPageURL = WebPageURL.replace('{'+index+'}', value);
				});

				// Photo Source URL (size small) 的生成
				var PhotoSourceURL = 'http://farm{farm}.static.flickr.com/{server}/{id}_{secret}_s.jpg';
				$.each(this, function (index, value) {
					PhotoSourceURL = PhotoSourceURL.replace('{'+index+'}', value);
				});

				$('<a/>')
					.attr({
						'href': WebPageURL,
						'target': '_blank'
					})
					.append(
						$('<img/>')
							.attr({
								'src': PhotoSourceURL,
								'title': this.title
							})
					)
				.appendTo('#flickr');
			});
		},
		error: function(xOptions, textStatus) {
			$('#flickr').text('不能取得图片！');
		}
	});
});