function navigateclick() {
  

	if($('#navbutton').val().toString() == 'Show Local Weather')
	{
	   $("#navbutton").prop('value', 'Show Major Cities');		
	   $("#infodiv").fadeIn();
	   $("#citiesinfodiv").hide();	 
	}
	else
	{
	   $("#navbutton").prop('value', 'Show Local Weather');		
	   $("#infodiv").hide();	   
	   $("#citiesinfodiv").fadeIn();
	}
}

function convertKToF(kelvin) {
    
	var calc = ""+(kelvin * (9 / 5) - 459.67);
	
	if(calc.length > 4)
	{
	   return calc.substring(0,5);
	}

	return calc;
}

$(document).ready(function() {
		//Hide divs	
		$("#citiesinfodiv").hide();
		$("#infodiv").hide();
		$("#navdiv").hide();
		$("#errordiv").hide();

		//Grab user local location data
		$.ajax({
       		 	url: "https://weathersync.herokuapp.com/ip"
   		 }).then(function(data) {
			$('#citylabel').append(data.city);   	 	 	
			$('#latlonglabel').append("".concat(data.location.latitude).concat(",").concat(data.location.longitude)); 
			var dataurl = "https://weathersync.herokuapp.com/weather/".concat(data.location.latitude).concat(',').concat(data.location.longitude);
			
			//set local data
			$.ajax({
				url: dataurl,
				error: function(xerror)
				        {
     					   
					}
   		 	}).then(function(weatherdata) {
				var weather_fahrenheit = convertKToF(weatherdata.main.temp.toString());

				$('#degreeslabel').append(weather_fahrenheit + "\u00B0"+"F");				
				$('#iconimg').attr("src","http://openweathermap.org/img/w/"+weatherdata.weather[0].icon+".png");								
				$('#skieslabel').append(weatherdata.weather[0].main);	
				
				$("#loadingdiv").hide();
				$("#infodiv").show();
				$("#navdiv").show();			    
			}).fail(callfailure);

			//set city data
			$.ajax({
       		 		url: "https://weathersync.herokuapp.com/weather/40.730610,-73.935242"
   		 	}).then(function(data) {				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#nycp').append("New York, NY");	
				$('#nycp_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#nycp_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#nycp').append("Could not find New York");
			    });

			$.ajax({
       		 		url: "https://weathersync.herokuapp.com/weather/34.052235,-118.243683"
   		 	}).then(function(data) {				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#lap').append("Los Angeles, CA");	
				$('#lap_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#lap_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#lap').append("Could not find Los Angeles");
			    });

			$.ajax({
       		 		url: "https://weathersync.herokuapp.com/weather/41.881832,-87.623177"
   		 	}).then(function(data) {				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#ccp').append("Chicago, IL");	
				$('#ccp_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#ccp_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#ccp').append("Could not find Chicago");
			    });

			$.ajax({
       		 		url: "https://weathersync.herokuapp.com/weather/39.952583,-75.165222"
   		 	}).then(function(data) {				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#pap').append("Philadelphia, PA");	
				$('#pap_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#pap_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#pap').append("Could not find Philadelphia");
			    });

			$.ajax({
       		 		url: "https://weathersync.herokuapp.com/weather/29.762778,-95.383056"
   		 	}).then(function(data) {				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#hsp').append("Houston, TX");	
				$('#hsp_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#hsp_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#hsp').append("Could not find Houston");
			    });

		 }).fail(callfailure);


function callfailure(xerror)
{
	$("#loadingdiv").hide();
	$("#infodiv").hide();
	$("#navdiv").hide();
	$("#errordiv").show();
	$("#errortext").append("Error Occurred, Status: "+xerror.status+". Message: "+ xerror.statusText + ' ' + xerror.responseText);
}
		
	
});