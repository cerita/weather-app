$( document ).ready(function() {
    
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          
          var location = ""; 
          var weatherUrl = "http://api.wunderground.com/api/1cb96b656e0fe288/geolookup/conditions/q/" + lat + "," + lng + ".json";

          $.ajax({
            url : weatherUrl,
            dataType : "jsonp",
            success : function(response) {
                location = response.current_observation.display_location.full;
                $('#location').text(location);
                
                var weatherF = response.current_observation.temp_f;
                $('#temp').text(weatherF + '\xB0 F');
                
                var condition = response.current_observation.weather;
                $('#conditions').text(condition);
            }
          });
          
      });
    } else {
      $("#location").html("Location is not available");
    }

    
      
});















