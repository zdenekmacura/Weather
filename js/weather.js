
$(document).ready(function(){
	$("#desc").show(1000);
	 navigator.geolocation.getCurrentPosition(onSuccess, onError);
	 function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';

    }
	$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139', function(jd) {
			 $('#stage').html('<p> Current weather is:<b>' + jd.weather[0].description + ' </b></p>');
             $('#stage2').html('<p> Image: <img src="http://openweathermap.org/img/w/' + jd.weather[0].icon + '.png"></p>');
          });


});
