/* Charles Paldino - Cepaling */

(function ()
{
	const COUNTDOWN_CLOCK = document.querySelector("#countdown_clock");
	const COUNTDOWN_HOURS = document.querySelector("#countdown_hours");
	const COUNTDOWN_MINUTES = document.querySelector("#countdown_minutes");
	const COUNTDOWN_SECONDS = document.querySelector("#countdown_seconds");

	var countdown_duration_milliseconds = 0;
	var countdown_remaining_milliseconds = 0;
	var countdown_end_time = null;
	var countdown_interval_id = null;

	initializeCountdownClock();

	//Connects the countdown controls and prepares the initial empty display.
	function initializeCountdownClock()
	{
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
		updateCountdownClock();
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
})();
