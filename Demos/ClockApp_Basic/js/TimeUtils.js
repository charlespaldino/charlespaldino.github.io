//Returns HH:MM AM/PM
function getCurrentAnalogTime() 
{
  return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
}

//Returns HH:MM:SS
function getCurrentDigitalTime() 
{
	var current_date = new Date();
	
	var hours = current_date.getHours();
	var minutes = current_date.getMinutes();
	var seconds = current_date.getSeconds();
	hours = hours > 12 ? hours - 12 : hours;
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	
    return hours + ":" + minutes + ":" + seconds;
}

//Returns ssss
function getCurrentMilliseconds() 
{
	var milliseconds = new Date().getMilliseconds();
	
	milliseconds = milliseconds < 10 ? "00" + milliseconds : milliseconds;
	milliseconds = milliseconds < 100 && milliseconds > 10  ? "0" + milliseconds : milliseconds;
	
    return "0" + milliseconds;
}

//Returns AM or PM
function getCurrentAMPM() 
{
    return new Date().getHours() >= 12 ? "PM" : "AM";
}

//Converts a duration in seconds to normalized hour, minute, and second values.
function getDurationParts(total_seconds)
{
	total_seconds = Math.max(0, Math.floor(Number(total_seconds) || 0));

	return { hours: Math.floor(total_seconds / 3600), minutes: Math.floor((total_seconds % 3600) / 60), seconds: total_seconds % 60 };
}

//Formats one part of a time display with at least two digits.
function formatTimePart(value)
{
	return String(value).padStart(2, "0");
}
