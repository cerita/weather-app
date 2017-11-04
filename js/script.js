/*

https://darksky.net/dev/docs#forecast-request
https://github.com/erikflowers/weather-icons

User Story: I can see the weather in my current location.

User Story: I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.

User Story: I can push a button to toggle between Fahrenheit and Celsius.
*/

$(document).ready(function () {
	var currentLocation = document.getElementById("weather-location");
	var currentTemp = document.getElementById("weather-temp");
	var currentConditions = document.getElementById("weather-conditions");
	var weatherIcon = document.getElementById("weather-icon");
	var weatherUnits = document.getElementById("weather-units");
	var tempFah = 0;
	var tempCel = 0;
	var currentUnit = "F";

	var API_KEY = "2ea2b5490f8ed6e42471acc80453766b";


	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			//https://api.darksky.net/forecast/[key]/[latitude],[longitude]

			weatherUnits.addEventListener("click", function () {
				if (currentUnit == "F") {

					weatherUnits.innerHTML = "&deg; C";
					currentUnit = "C";
					tempCel = Math.round((tempFah - 32) * .5556);
					currentTemp.innerHTML = tempCel;
				} else {
					weatherUnits.innerHTML = "&deg; F";
					currentUnit = "F";
					currentTemp.innerHTML = tempFah;
				}
			});

			var locationUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyAsktuMz7xDVv3Qo8OtmGLeXTiX3UVaNU8";
			var weatherUrl =
				"https://api.darksky.net/forecast/" + API_KEY + "/" + lat + "," + lng + "?units=us";

			console.log(locationUrl);

			$.ajax({
				url: locationUrl,
				dataType: "json",
				success: function (location) {
					currentLocation.innerHTML = location.results[0].address_components[3].short_name + ", " + location.results[0].address_components[5].short_name + ", " + location.results[0].address_components[6].short_name;
				}
			});

			$.ajax({
				url: weatherUrl,
				dataType: "jsonp",
				success: function (response) {
					tempFah = Math.round(
						response.currently.temperature
					);
					currentTemp.innerHTML = tempFah
					currentConditions.innerHTML = response.currently.summary;
					var tempIcon = "wi wi-forecast-io-" + response.currently.icon;
					weatherIcon.innerHTML = "<i class='" + tempIcon + "'></i>";
					weatherUnits.innerHTML = "&deg; F";
				}
			});
		});
	} else {
		$("#location").html("Location is not available");
	}



});
