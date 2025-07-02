document.addEventListener("DOMContentLoaded", function () {
  console.log("Made by: https://github.com/NewNamesAreHard");

  // Load saved user settings from localStorage
  LoadSettings();

  // Set initial date/time inputs if no saved values exist
  FillDates();

  // Setup event listeners for form submission and toggle switch
  SubmitDates();
  SetupToggleStars();
});

/**
 * Loads saved settings from localStorage and applies them to the UI.
 * Also controls the visibility of the shooting stars effect based on saved toggle.
 */
function LoadSettings() {
  const savedDate = localStorage.getItem("discordTimestamp_date");
  const savedTime = localStorage.getItem("discordTimestamp_time");
  const savedShortFormat = localStorage.getItem("discordTimestamp_shortFormat");
  const savedToggleStars = localStorage.getItem("discordTimestamp_toggleStars");

  if (savedDate) {
    document.getElementById("datepicker").value = savedDate;
  }
  if (savedTime) {
    document.getElementById("timepicker").value = savedTime;
  }
  if (savedShortFormat === "true") {
    document.getElementById("shortformat").checked = true;
  }
  if (savedToggleStars === "true") {
    document.getElementById("toggleStars").checked = true;
    ShowShootingStars(true);
  } else {
    document.getElementById("toggleStars").checked = false;
    ShowShootingStars(false);
  }
}

/**
 * Saves user-selected settings to localStorage for persistence.
 *
 * @param {string} date - Selected date (YYYY-MM-DD)
 * @param {string} time - Selected time (HH:mm)
 * @param {boolean} shortFormat - Whether short format is enabled
 * @param {boolean} toggleStars - Whether shooting stars effect is enabled
 */
function SaveSettings(date, time, shortFormat, toggleStars) {
  localStorage.setItem("discordTimestamp_date", date);
  localStorage.setItem("discordTimestamp_time", time);
  localStorage.setItem("discordTimestamp_shortFormat", shortFormat);
  localStorage.setItem("discordTimestamp_toggleStars", toggleStars);
}

/**
 * Returns the current date and time components padded for use in input fields.
 */
function SetInitialDates() {
  const now = new Date();

  return {
    Date: now,
    Year: now.getFullYear(),
    Month: String(now.getMonth() + 1).padStart(2, "0"),
    Day: String(now.getDate()).padStart(2, "0"),
    Hour: String(now.getHours()).padStart(2, "0"),
    Minute: String(now.getMinutes()).padStart(2, "0"),
  };
}

/**
 * Sets the date and time input values to current date/time if not already set.
 */
function FillDates() {
  const datepicker = document.getElementById("datepicker");
  const timepicker = document.getElementById("timepicker");

  if (!datepicker.value) {
    const { Year, Month, Day } = SetInitialDates();
    datepicker.value = `${Year}-${Month}-${Day}`;
  }

  if (!timepicker.value) {
    const { Hour, Minute } = SetInitialDates();
    timepicker.value = `${Hour}:${Minute}`;
  }
}

/**
 * Sets up the form submission event to generate and display the Discord timestamp,
 * and save the current settings.
 */
function SubmitDates() {
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedDate = document.getElementById("datepicker").value;
    const selectedTime = document.getElementById("timepicker").value;
    const selectedDateTime = new Date(`${selectedDate} ${selectedTime}`);

    // Convert date/time to Unix timestamp (seconds)
    const unixTimestamp = Math.floor(selectedDateTime.getTime() / 1000);

    // Format timestamp based on checkbox
    let formattedTimestamp;
    if (document.getElementById("shortformat").checked) {
      formattedTimestamp = `<t:${unixTimestamp}>`;
    } else {
      formattedTimestamp = `<t:${unixTimestamp}:F>`;
    }

    // Display formatted timestamp in output field
    const outputField = document.getElementById("formattedTimestamp");
    outputField.textContent = unixTimestamp;
    outputField.value = formattedTimestamp;

    // Save current settings to localStorage
    SaveSettings(
      selectedDate,
      selectedTime,
      document.getElementById("shortformat").checked,
      document.getElementById("toggleStars").checked
    );
  });
}

/**
 * Sets up the shooting stars toggle event listener.
 * Shows or hides the shooting stars effect and saves the toggle state.
 */
function SetupToggleStars() {
  const toggle = document.getElementById("toggleStars");

  toggle.addEventListener("change", function () {
    ShowShootingStars(toggle.checked);
    localStorage.setItem("discordTimestamp_toggleStars", toggle.checked);
  });
}

/**
 * Shows or hides the shooting stars animation section.
 *
 * @param {boolean} show - Whether to show the shooting stars animation
 */
function ShowShootingStars(show) {
  const starsSection = document.querySelector("section");
  if (!starsSection) return;

  starsSection.style.display = show ? "block" : "none";
}

/**
 * Copies the formatted timestamp to the clipboard.
 */
function CopyToClipboard() {
  const formattedTimestampField = document.getElementById("formattedTimestamp");

  // For input fields, select() works directly
  if (formattedTimestampField.select) {
    formattedTimestampField.select();
    document.execCommand("copy");
  }
}
