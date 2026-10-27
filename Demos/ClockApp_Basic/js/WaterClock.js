/* Charles Paldino - Cepaling */

(function ()
{
	const MAX_DURATION_MILLISECONDS = 10 * 60 * 1000;
	const UPPER_WATER_TRAVEL = 210;
	const LOWER_WATER_TRAVEL = 126;
	const FLOAT_EMPTY_Y = 630;
	const FLOAT_FULL_Y = 507;
	const LOWER_SURFACE_Y = 510;
	const DROPLET_START_Y = 436;
	const WATER_CLOCK = document.querySelector("#water_clock");
	const WATER_CLOCK_TIME = document.querySelector("#water_clock_time");
	const WATER_CLOCK_MINUTES = document.querySelector("#water_clock_minutes");
	const UPPER_WATER = document.querySelector("#water_clock_upper_water");
	const LOWER_WATER = document.querySelector("#water_clock_lower_water");
	const WATER_CLOCK_FLOAT = document.querySelector("#water_clock_float");
	const WATER_CLOCK_DROPLET = document.querySelector("#water_clock_droplet");

	var total_milliseconds = 0;
	var remaining_milliseconds = 0;
	var end_time = null;
	var interval_id = null;

	initializeWaterClock();

	//Connects the water clock controls and prepares the initial ten-minute display.
	function initializeWaterClock()
	{
		document.querySelector("#water_clock_start").addEventListener("click", startWaterClock);
		document.querySelector("#water_clock_reset").addEventListener("click", resetWaterClock);
		document.querySelector("#water_clock_stop").addEventListener("click", stopWaterClock);
		WATER_CLOCK_MINUTES.addEventListener("change", resetWaterClock);

		resetWaterClock();
	}

	//Keeps the selected duration between one and ten whole minutes.
	function normalizeMinuteInput()
	{
		const minutes = Math.floor(Number(WATER_CLOCK_MINUTES.value) || 1);
		const normalized_minutes = Math.min(10, Math.max(1, minutes));

		WATER_CLOCK_MINUTES.value = normalized_minutes;
		return normalized_minutes;
	}

	//Starts or resumes the water clock from its current level.
	function startWaterClock()
	{
		if (end_time !== null || remaining_milliseconds <= 0)
			return;

		end_time = Date.now() + remaining_milliseconds;
		WATER_CLOCK_MINUTES.disabled = true;
		WATER_CLOCK_DROPLET.classList.add("is-running");
		interval_id = setInterval(updateWaterClock, 100);
		updateWaterClock();
	}

	//Pauses the clock without changing either water level.
	function stopWaterClock()
	{
		if (end_time === null)
			return;

		remaining_milliseconds = getRemainingMilliseconds();
		end_time = null;
		clearInterval(interval_id);
		interval_id = null;
		WATER_CLOCK_MINUTES.disabled = false;
		WATER_CLOCK_DROPLET.classList.remove("is-running");
		updateWaterClock();
	}

	//Restores the clock to the duration currently selected by the visitor.
	function resetWaterClock()
	{
		clearInterval(interval_id);
		total_milliseconds = normalizeMinuteInput() * 60 * 1000;
		remaining_milliseconds = total_milliseconds;
		end_time = null;
		interval_id = null;
		WATER_CLOCK_MINUTES.disabled = false;
		WATER_CLOCK_DROPLET.classList.remove("is-running");
		updateWaterClock();
	}

	//Returns an accurate remaining duration without accumulating interval drift.
	function getRemainingMilliseconds()
	{
		return end_time === null ? remaining_milliseconds : Math.max(0, end_time - Date.now());
	}

	//Updates the exact time display and all three mechanical indicators.
	function updateWaterClock()
	{
		remaining_milliseconds = getRemainingMilliseconds();
		const display_seconds = Math.ceil(remaining_milliseconds / 1000);
		const display_minutes = Math.floor(display_seconds / 60);
		const display_remaining_seconds = display_seconds % 60;
		const elapsed_milliseconds = total_milliseconds - remaining_milliseconds;

		WATER_CLOCK_TIME.value = formatTimePart(display_minutes) + ":" + formatTimePart(display_remaining_seconds);
		updateWaterLevels(remaining_milliseconds, elapsed_milliseconds);
		WATER_CLOCK.setAttribute("aria-label", WATER_CLOCK_TIME.value + " remaining on the water clock");

		if (remaining_milliseconds > 0)
			return;

		clearInterval(interval_id);
		interval_id = null;
		end_time = null;
		WATER_CLOCK_MINUTES.disabled = false;
		WATER_CLOCK_DROPLET.classList.remove("is-running");
	}

	//Maps remaining and elapsed time onto both water levels, the float, and the droplet landing point.
	function updateWaterLevels(remaining_time, elapsed_time)
	{
		const upper_remaining_ratio = Math.min(1, Math.max(0, remaining_time / MAX_DURATION_MILLISECONDS));
		const lower_fill_ratio = Math.min(1, Math.max(0, elapsed_time / MAX_DURATION_MILLISECONDS));
		const upper_translation = (1 - upper_remaining_ratio) * UPPER_WATER_TRAVEL;
		const lower_translation = (1 - lower_fill_ratio) * LOWER_WATER_TRAVEL;
		const float_y = FLOAT_EMPTY_Y - ((FLOAT_EMPTY_Y - FLOAT_FULL_Y) * lower_fill_ratio);
		const droplet_distance = LOWER_SURFACE_Y + lower_translation - DROPLET_START_Y;

		UPPER_WATER.setAttribute("transform", "translate(0 " + upper_translation + ")");
		UPPER_WATER.style.opacity = remaining_time <= 0 ? 0 : 1;
		LOWER_WATER.setAttribute("transform", "translate(0 " + lower_translation + ")");
		LOWER_WATER.style.opacity = elapsed_time <= 0 ? 0 : 1;
		WATER_CLOCK_FLOAT.setAttribute("transform", "translate(260 " + float_y + ")");
		WATER_CLOCK_FLOAT.style.opacity = elapsed_time <= 0 ? 0 : 1;
		WATER_CLOCK_DROPLET.style.setProperty("--water-clock-drop-distance", droplet_distance + "px");
	}
})();
