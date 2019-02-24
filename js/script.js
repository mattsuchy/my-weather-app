$.ajax({
	type: 'get',
	url: 'http://api.openweathermap.org/data/2.5/group?id=2643743&units=metric&appid=6e07549fae534e1a943faf2fcf172cff',
	success: function (cities) {

		$.each(cities.list, function (i, city) {

			var shortTemp = Math.round(city.main.temp);

			$("#therow").append(`

<div class="row">
      <div class="col-md-12">
        <h1 id="location">${city.name} <span id="txt${i}"></span></h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="temperature infoContainer">
          <h1 id="currTemp">${shortTemp}°C</h1>
          <h2 id="currTempDesc">${city.weather[0].description}</h2>
          <img src="https://openweathermap.org/img/w/${city.weather[0].icon}.png" alt="asd"> </div>
      </div>
      <div class="col-md-6">
        <div class="infoContainer wind">
          <h1 class="col-12 align-center">Wind</h1>
          <div class="windLeft col-6">
            <h2>Speed</h2>
            <h3 id="windSpeed">${city.wind.speed} km/h</h3>
          </div>
          <div class="windRight col-6">
            <h2>Direction</h2>
            <h3 id="windDirection">${city.wind.deg}°</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="infoContainer sunRiseSet">
          <h2>Sunrise</h2>
          <h3 id="sunrise${i}"></h3>
          <h2>Sunset</h2>
          <h3 id="sunset${i}"></h3>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="infoContainer mapContainer"> <span class="metadata-marker" style="display: none;" data-region_tag="html-body"></span>
          <div id='map'></div>
          <span class="metadata-marker" style="display: none;" data-region_tag="script-body"></span> </div>
      </div>
    </div>

`);

			var map;

			function initMap() {
				var latitude = city.coord.lat;
				var longitude = city.coord.lon;
				map = new google.maps.Map(document.getElementById('map'), {
					center: {
						lat: latitude,
						lng: longitude
					},
					zoom: 12
				});
			}
			initMap();

			function getSunrise() {
				var sunrise = city.sys.sunrise * 1000;
				var h = new Date(sunrise).getHours();
				var m = (new Date(sunrise).getMinutes() < 10 ? '0' : '') + new Date(sunrise).getMinutes();
				var sunrisetime = $('#sunrise' + [i]);
				sunrisetime.append('<h3>' + h + ':' + m + '</h3>');
			}
			getSunrise();

			function getSunset() {
				var sunset = city.sys.sunset * 1000;
				var h = new Date(sunset).getHours();
				var m = (new Date(sunset).getMinutes() < 10 ? '0' : '') + new Date(sunset).getMinutes();
				var sunsettime = $('#sunset' + [i]);
				sunsettime.append('<h3>' + h + ':' + m + '</h3>');
			}
			getSunset();

			function startTime() {
				var loc = city.name;
				var today = new Date();
				var h = today.getHours();
				var tokTime = h + 7;
				var lonTime = h - 2;
				var rioTime = h - 5;
				var m = today.getMinutes();
				var s = today.getSeconds();
				m = checkTime(m);
				s = checkTime(s);

				if (loc == "Tokyo") {
					document.getElementById('txt' + [i]).innerHTML = tokTime + ":" + m + ":" + s;
				} else if (loc == "London") {
					document.getElementById('txt' + [i]).innerHTML = lonTime + ":" + m + ":" + s;
				} else if (loc == "Rio de Janeiro") {
					document.getElementById('txt' + [i]).innerHTML = rioTime + ":" + m + ":" + s;
				};

				var t = setTimeout(startTime, 500);
			}



			function checkTime(i) {
				if (i < 10) {
					i = "0" + i
				}; // add zero in front of numbers < 10
				return i;
			}
			startTime();

		});

	}
});


