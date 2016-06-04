$(function () {
	var address = ['东方明珠电视塔', '浦东体育公园', '莘庄地铁站', '上海体育馆'];
	var southWest = {}, northEast = {};
	var map = new google.maps.Map($('#map_canvas')[0], {
		zoom: 8,
		scaleControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	$.each(address, function (index, value) {
		(new google.maps.Geocoder()).geocode({
			'address': value
		},
		function (results, status) {
			if (status !== google.maps.GeocoderStatus.OK) return;

			var location = results[0].geometry.location;
			southWest.lat = southWest.lat < location.lat() ? southWest.lat : location.lat();
			southWest.lng = southWest.lng < location.lng() ? southWest.lng : location.lng();
			northEast.lat = northEast.lat > location.lat() ? northEast.lat : location.lat();
			northEast.lng = northEast.lng > location.lng() ? northEast.lng : location.lng();
			map.fitBounds(new google.maps.LatLngBounds(
				new google.maps.LatLng(southWest.lat, southWest.lng),
				new google.maps.LatLng(northEast.lat, northEast.lng)
			));

			var marker = new google.maps.Marker({
				map: map,
				position: location,
				title: value
			});

			google.maps.event.addListener(marker, 'click', function() {
				(new google.maps.InfoWindow({
					content: '<p id="locationTitle">'+value+'</p><p>纬度：'+location.lat()+'</p><p>经度：'+location.lng()+'</p>'
				})).open(map, marker);
			});

		});
	});
});
