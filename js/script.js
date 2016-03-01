$( document ).ready(function() {
    var $conditionIcon = $('#weatherIcon');
    var $tempDisplay = $('#temp');
    
    
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
                
                $tempDisplay.click(function() {
                    $tempDisplay.toggleClass('units');
                    if($tempDisplay.hasClass('units')) {
                        var weatherF = response.current_observation.temp_f;
                        $tempDisplay.text(weatherF + '\xB0 F');
                    } else {
                        var weatherC = response.current_observation.temp_c;
                        $tempDisplay.text(weatherC + '\xB0 C');
                    }
                });
                var weatherF = response.current_observation.temp_f;
                $tempDisplay.text(weatherF + '\xB0 F');
                
                var condition = response.current_observation.weather;
                $('#conditions').text(condition);
                
                var conditionIcon = response.current_observation.icon;
                
                var wuIcon = 'wi wi-wu-' + conditionIcon;
                console.log(wuIcon);
                $("#weatherIcon").append('<i class="' + wuIcon + '"></li>');
                        
                }
          });
          
      });
    } else {
      $("#location").html("Location is not available");
    }

      //background
  var bgUrl = 'url("http://placehold.it/300x300")';
  
    
  
      
});















