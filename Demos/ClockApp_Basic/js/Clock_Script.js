const HOUR_HAND = document.querySelector("#hour");
const MINUTE_HAND = document.querySelector("#minute");
const SECOND_HAND = document.querySelector("#second");
const label_analog_timetext = document.querySelector("#label_analog_timetext");
const label_digital_timetext = document.querySelector("#label_digital_timetext");
const label_digital_millisecondstext = document.querySelector("#label_digital_millisecondstext");
const label_digital_ampmtext = document.querySelector("#label_digital_ampmtext");

var divider_60 = 360/60;
var divider_12 = 360/12;
var divider_10 = 1/10;
var divider_3 = 3/360;

var current_datetime;
var current_hour,current_minute,current_second;
var second_position,minute_position,hour_position;//initial hand points.

initialize();



function initialize()
{
	$("#container_digital").hide();	
	$("#container_about").hide();

	current_datetime = new Date();

	current_hour = current_datetime.getHours();
	current_minute = current_datetime.getMinutes();
	current_second = current_datetime.getSeconds();

	//Get initial hand points.
	second_position = current_second * divider_60;
	minute_position = current_minute * divider_60;
	hour_position = current_hour * divider_12;

	//Add the inbetween segments
	hour_position += minute_position/12;
	minute_position += second_position/60;
	
	updateAnalogClock();
}

function changeButton(clicked_button)
{	
	if(clicked_button.innerText == "Analog")
	{
		$("#container_digital").fadeOut(300);	

		setTimeout(function(){
			$("#container_digital").hide();
			$("#container_about").hide();
			$("#container_analog").fadeIn(500);
		}, 600);
	}
	else if(clicked_button.innerText == "Digital")
	{
		$("#container_analog").fadeOut(300);		
		
		setTimeout(function(){
			$("#container_analog").hide();
			$("#container_about").hide();
			$("#container_digital").fadeIn(500);
		}, 600);
	}
	else if (clicked_button.innerText == "About")
	{
		setTimeout(function () {
			$("#container_analog").hide();
			$("#container_digital").hide();
			$("#container_about").fadeIn(500);
		}, 600);

	}
}


function updateAnalogClock()
{
	hour_position += divider_3;
	minute_position += divider_10;
	second_position += 6;

	HOUR_HAND.style.transform = "rotate(" + hour_position + "deg)";
	MINUTE_HAND.style.transform = "rotate(" + minute_position + "deg)";
	SECOND_HAND.style.transform = "rotate(" + second_position + "deg)";
	
	label_analog_timetext.innerText = getCurrentAnalogTime();
}

function updateDigitalClock()
{
	label_digital_timetext.innerText = getCurrentDigitalTime();
	label_digital_millisecondstext.innerText = getCurrentMilliseconds();
    label_digital_ampmtext.innerText = getCurrentAMPM();
}


//Update the clock periodically.
var updateAnalogClockID = setInterval(updateAnalogClock, 1000);
var updateDigitalClockID = setInterval(updateDigitalClock, 5);
