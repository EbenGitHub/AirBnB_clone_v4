$(document).ready(function () {
	let amenities = {};
	$('INPUT[type="checkbox"]').change(function() {
		if ($(this).is(':checked')) {
			amenities[$(this).attr('data-id')] = $(this).attr('data-name');
		} else {
			delete amenities[$(this).attr('data-id')];
		}
		$('.amenities H4').text(Object.values(amenities).join(', '));
	});
	
	$.get('http://3.227.251.198:5001/api/v1/status/', function(data) {
		if (data.status === "OK") {
			$('div#api_status').addClass('available');
		} else {
			$('div#api_status').removeClass('available');
		}
	});
	
	$.ajax({
		type: 'POST',
		url: 'http://3.227.251.198:5001/api/v1/places_search/',
		headers: {
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({}),
		success: function (response) {
			console.log(response);
			for (let i = 0; i < response.length; i++) {
				$('.places').append('<article><div class="title_box"><h2>' + 
					response[i].name + '</h2><div class="price_by_night">$' + 
					response[i].price_by_night + 
					'</div></div><div class="information"><div class="max_guest">' + 
					response[i].max_guest + '</div><div class="number_rooms">' + 
					response[i].number_rooms + '</div><div class="number_bathrooms">' + 
					response[i].number_bathrooms + '</div></div><div class="description">' + 
					response[i].description + ' </div></article>')

			}	
		},
		error: function (error) {console.log(error)}

	});



});
