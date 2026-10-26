const HOUR_HAND = document.querySelector("#hour");
const MINUTE_HAND = document.querySelector("#minute");
const SECOND_HAND = document.querySelector("#second");
const label_analog_timetext = document.querySelector("#label_analog_timetext");
const label_digital_timetext = document.querySelector("#label_digital_timetext");
const label_digital_millisecondstext = document.querySelector("#label_digital_millisecondstext");
const label_digital_ampmtext = document.querySelector("#label_digital_ampmtext");
const COUNTDOWN_CLOCK = document.querySelector("#countdown_clock");
const COUNTDOWN_HOURS = document.querySelector("#countdown_hours");
const COUNTDOWN_MINUTES = document.querySelector("#countdown_minutes");
const COUNTDOWN_SECONDS = document.querySelector("#countdown_seconds");
const CLOCK_CONTAINERS = ["analog", "digital", "countdown", "water", "about"];

var divider_60 = 360/60;
var divider_12 = 360/12;
var divider_10 = 1/10;
var divider_3 = 3/360;

var current_datetime;
var current_hour,current_minute,current_second;
var second_position,minute_position,hour_position;//initial hand points.
var countdown_duration_milliseconds = 0;
var countdown_remaining_milliseconds = 0;
var countdown_end_time = null;
var countdown_interval_id = null;

initialize();



function initialize()
{
	$("#container_digital").hide();	
	$("#container_countdown").hide();
	$("#container_water").hide();
	$("#container_about").hide();

	document.querySelectorAll("[data-countdown-input]").forEach(function (button)
	{
		button.addEventListener("click", function ()
		{
			const input_value = normalizeCountdownInput(document.getElementById(button.dataset.countdownInput));
			addCountdownTime(input_value * Number(button.dataset.countdownUnitSeconds));
		});
	});

	document.querySelectorAll(".countdown_add_control input").forEach(function (input)
	{
		input.addEventListener("change", function ()
		{
			normalizeCountdownInput(input);
		});
	});

	document.querySelector("#countdown_start").addEventListener("click", startCountdown);
	document.querySelector("#countdown_reset").addEventListener("click", resetCountdown);
	document.querySelector("#countdown_stop").addEventListener("click", stopCountdown);

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
	const selected_clock = clicked_button.innerText.toLowerCase();

	if (!CLOCK_CONTAINERS.includes(selected_clock))
		return;

	for (const clock_name of CLOCK_CONTAINERS)
		$("#container_" + clock_name).stop(true, true).hide();

	$("#container_" + selected_clock).fadeIn(500);
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

//Keeps countdown input values inside their supported whole-number range.
function normalizeCountdownInput(input)
{
	const input_value = Math.floor(Number(input.value) || 0);
	const normalized_value = Math.min(99, Math.max(0, input_value));

	input.value = normalized_value;
	return normalized_value;
}

//Adds time to a prepared or running countdown.
function addCountdownTime(seconds)
{
	const added_milliseconds = Math.max(0, seconds * 1000);
	const remaining_milliseconds = getCountdownRemainingMilliseconds();

	if (added_milliseconds === 0)
		return;

	if (remaining_milliseconds === 0)
		countdown_duration_milliseconds = 0;

	countdown_duration_milliseconds += added_milliseconds;
	countdown_remaining_milliseconds = remaining_milliseconds + added_milliseconds;

	if (countdown_end_time !== null)
		countdown_end_time = Date.now() + countdown_remaining_milliseconds;

	updateCountdownClock();
}

//Returns the remaining countdown duration without allowing a negative value.
function getCountdownRemainingMilliseconds()
{
	return countdown_end_time === null ? countdown_remaining_milliseconds : Math.max(0, countdown_end_time - Date.now());
}

//Starts or resumes a prepared countdown.
function startCountdown()
{
	if (countdown_end_time !== null || countdown_remaining_milliseconds <= 0)
		return;

	countdown_end_time = Date.now() + countdown_remaining_milliseconds;
	countdown_interval_id = setInterval(updateCountdownClock, 100);
	updateCountdownClock();
}

//Pauses the countdown while preserving its remaining time.
function stopCountdown()
{
	if (countdown_end_time === null)
		return;

	countdown_remaining_milliseconds = getCountdownRemainingMilliseconds();
	countdown_end_time = null;
	clearInterval(countdown_interval_id);
	countdown_interval_id = null;
	updateCountdownClock();
}

//Clears the countdown and returns the display to zero.
function resetCountdown()
{
	clearInterval(countdown_interval_id);
	countdown_duration_milliseconds = 0;
	countdown_remaining_milliseconds = 0;
	countdown_end_time = null;
	countdown_interval_id = null;
	updateCountdownClock();
}

//Updates the countdown display and circular elapsed-time fill.
function updateCountdownClock()
{
	const remaining_milliseconds = getCountdownRemainingMilliseconds();
	const display_seconds = Math.ceil(remaining_milliseconds / 1000);
	const duration_parts = getDurationParts(display_seconds);
	const elapsed_ratio = countdown_duration_milliseconds === 0 ? 0 : 1 - (remaining_milliseconds / countdown_duration_milliseconds);

	COUNTDOWN_HOURS.innerText = formatTimePart(duration_parts.hours < 99 ? duration_parts.hours : 99);
	COUNTDOWN_MINUTES.innerText = formatTimePart(duration_parts.minutes);
	COUNTDOWN_SECONDS.innerText = formatTimePart(duration_parts.seconds);
	COUNTDOWN_CLOCK.style.setProperty("--countdown-progress", Math.min(1, Math.max(0, elapsed_ratio)) + "turn");
	COUNTDOWN_CLOCK.setAttribute("aria-label", "Countdown timer: " + duration_parts.hours + " hours, " + duration_parts.minutes + " minutes, " + duration_parts.seconds + " seconds remaining");

	if (remaining_milliseconds > 0)
		return;

	countdown_remaining_milliseconds = 0;
	clearInterval(countdown_interval_id);
	countdown_interval_id = null;
	countdown_end_time = null;
}


//Update the clock periodically.
var updateAnalogClockID = setInterval(updateAnalogClock, 1000);
var updateDigitalClockID = setInterval(updateDigitalClock, 5);
