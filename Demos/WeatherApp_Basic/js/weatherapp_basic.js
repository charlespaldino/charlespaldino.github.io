$(document).ready(function () {
    //Hide divs	
    $("#div_info_cities").hide();
    $("#div_info_current").hide();
    $("#div_about").hide();
    $("#div_nav").hide();
    $("#div_error").hide();

    //Check for geolocator
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocalWeather, locationErrorCallback);
    }
    else {
        showError("Geolocation is not supported by this browser.");
    }
});


function navigateWeatherInfo()
{
    if ($('#button_infoswitch').val().toString() == 'Local Weather')
    {
        $("#button_infoswitch").prop('value', 'Major Cities');
        $("#div_info_current").fadeIn();
        $("#div_info_cities").hide();
        $("#div_about").hide();
    }
    else
    {
        $("#button_infoswitch").prop('value', 'Local Weather');
        $("#div_info_current").hide();
        $("#div_about").hide();
        $("#div_info_cities").fadeIn();
    }
}

function navigateAbout()
{
    $("#div_info_current").hide();
    $("#div_info_cities").hide();
    $("#div_about").fadeIn();
}

function convertKToF(kelvin)
{
    var calc = "" + (kelvin * (9 / 5) - 459.67);

    if (calc.length > 4) {return calc.substring(0, 5);}

    return calc;
}

function getLocalWeather(position) {
    var ip_lat = position.coords.latitude;
    var ip_long = position.coords.longitude;
    var apid = "3afd95114b0b9a7868ee51e059f7f45b";
    var ap_weather_api_endpoint = "https://api.openweathermap.org/data/2.5/weather?"
   
    var dataurl = ap_weather_api_endpoint + "lat=" + ip_lat + "&lon=" + ip_long + "&appid=" + apid;

    $.ajax({
        url: dataurl
    }).then(function (data) {
        var weather_fahrenheit = convertKToF(data.main.temp.toString());

        $('#citylabel').append(data.name);
        $('#degreeslabel').append(weather_fahrenheit + "\u00B0" + "F");
        $('#iconimg').attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        $('#skieslabel').append(data.weather[0].main);

        $("#div_loading").hide();
        $("#div_info_current").show();
        $("#div_nav").show();

        //set city data
        $.ajax({
            url: ap_weather_api_endpoint + "lat=40.730610&lon=-73.935242" + "&appid=" + apid
        }).then(function (data)
        {
            var fahrenheit = convertKToF(data.main.temp.toString());

            $('#nycp').append("New York, NY");
            $('#nycp_temp').append("" + fahrenheit + "\u00B0" + "F");
            $('#nycp_icon').attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        }).fail(function (data) {
            $('#nycp').append("Could not find New York");
        });

        $.ajax({
            url: ap_weather_api_endpoint + "lat=34.052235&lon=-118.243683" + "&appid=" + apid
        }).then(function (data)
        {
            var fahrenheit = convertKToF(data.main.temp.toString());

            $('#lap').append("Los Angeles, CA");
            $('#lap_temp').append("" + fahrenheit + "\u00B0" + "F");
            $('#lap_icon').attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        }).fail(function (data) {
            $('#lap').append("Could not find Los Angeles");
        });

        $.ajax({
            url: ap_weather_api_endpoint + "lat=41.881832&lon=-87.623177" + "&appid=" + apid
        }).then(function (data)
        {
            var fahrenheit = convertKToF(data.main.temp.toString());

            $('#ccp').append("Chicago, IL");
            $('#ccp_temp').append("" + fahrenheit + "\u00B0" + "F");
            $('#ccp_icon').attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        }).fail(function (data) {
            $('#ccp').append("Could not find Chicago");
        });

        $.ajax({
            url: ap_weather_api_endpoint + "lat=39.952583&lon=-75.165222" + "&appid=" + apid
        }).then(function (data)
        {
            var fahrenheit = convertKToF(data.main.temp.toString());

            $('#pap').append("Philadelphia, PA");
            $('#pap_temp').append("" + fahrenheit + "\u00B0" + "F");
            $('#pap_icon').attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        }).fail(function (data) {
            $('#pap').append("Could not find Philadelphia");
        });

        $.ajax({
            url: ap_weather_api_endpoint + "lat=29.762778&lon=-95.383056" + "&appid=" + apid
        }).then(function (data)
        {
            var fahrenheit = convertKToF(data.main.temp.toString());

            $('#hsp').append("Houston, TX");
            $('#hsp_temp').append("" + fahrenheit + "\u00B0" + "F");
            $('#hsp_icon').attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        }).fail(function (data) {
            $('#hsp').append("Could not find Houston");
        });

    }).fail(callFailure);

}

function locationErrorCallback(error)
{
    if (error.code == error.PERMISSION_DENIED)
    {
        showError("This site requires permission to know your location.");
    }
    else
    {
        showError("Unknown error getting your location.");
    }
}

function showError(message)
{
    $("#div_loading").hide();
    $("#div_info_current").hide();
    $("#div_nav").hide();
    $("#div_error").show();
    $("#errortext").append(message);
}

function callFailure(xerror)
{
    $("#div_loading").hide();
    $("#div_info_current").hide();
    $("#div_nav").hide();
    $("#div_error").show();
    $("#errortext").append("Error Occurred, Status: " + xerror.status + ". Message: " + xerror.statusText + ' ' + xerror.responseText);
}