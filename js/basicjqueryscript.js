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

		//Check for geolocator
		if (navigator.geolocation) 
		{
       			navigator.geolocation.getCurrentPosition(getLocalWeather);		
    		} 
		else 
		{ 
      	  		showError("Geolocation is not supported by this browser.");
    		}
});


		


function getLocalWeather(position)
{
	var ip_lat = position.coords.latitude;
	var ip_long = position.coords.longitude;
	
	var dataurl = "http://api.openweathermap.org/data/2.5/weather?lat="+ip_lat+"&lon="+ip_long+"&appid=77f6677e96a00ad72436c97b767535e4";

	$.ajax({
       		 url: dataurl
   	}).then(function(data) {
		var weather_fahrenheit = convertKToF(data.main.temp.toString());

		$('#citylabel').append(data.name); 
		$('#degreeslabel').append(weather_fahrenheit + "\u00B0"+"F");				
		$('#iconimg').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");								
		$('#skieslabel').append(data.weather[0].main);	
				
		$("#loadingdiv").hide();
		$("#infodiv").show();
		$("#navdiv").show();	

		//set city data
		$.ajax({
       		 	url: "http://api.openweathermap.org/data/2.5/weather?lat=40.730610&lon=-73.935242&appid=77f6677e96a00ad72436c97b767535e4"
   		 	}).then(function(data) 
			{				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#nycp').append("New York, NY");	
				$('#nycp_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#nycp_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#nycp').append("Could not find New York");
			    });

			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather?lat=34.052235&lon=-118.243683&appid=77f6677e96a00ad72436c97b767535e4"
   		 	}).then(function(data) {				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#lap').append("Los Angeles, CA");	
				$('#lap_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#lap_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#lap').append("Could not find Los Angeles");
			    });

			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather?lat=41.881832&lon=-87.623177&appid=77f6677e96a00ad72436c97b767535e4"	
   		 	}).then(function(data) {				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#ccp').append("Chicago, IL");	
				$('#ccp_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#ccp_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#ccp').append("Could not find Chicago");
			    });

			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather?lat=39.952583&lon=-75.165222&appid=77f6677e96a00ad72436c97b767535e4"
   		 	}).then(function(data) {				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#pap').append("Philadelphia, PA");	
				$('#pap_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#pap_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#pap').append("Could not find Philadelphia");
			    });

			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather?lat=29.762778&lon=-95.383056&appid=77f6677e96a00ad72436c97b767535e4"
   		 	}).then(function(data) {				
				var fahrenheit = convertKToF(data.main.temp.toString());
				
				$('#hsp').append("Houston, TX");	
				$('#hsp_temp').append(""+fahrenheit + "\u00B0"+"F");	
				$('#hsp_icon').attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");				
			    }).fail(function(data) {				
				$('#hsp').append("Could not find Houston");
			    });

	}).fail(callfailure);

}

function showError(message)
{
	$("#loadingdiv").hide();
	$("#infodiv").hide();
	$("#navdiv").hide();
	$("#errordiv").show();
	$("#errortext").append(message);
}

function callfailure(xerror)
{
	$("#loadingdiv").hide();
	$("#infodiv").hide();
	$("#navdiv").hide();
	$("#errordiv").show();
	$("#errortext").append("Error Occurred, Status: "+xerror.status+". Message: "+ xerror.statusText + ' ' + xerror.responseText);
}