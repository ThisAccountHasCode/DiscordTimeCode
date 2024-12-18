document.addEventListener("DOMContentLoaded", function () {
   console.log("Made by: https://github.com/NewNamesAreHard");
   SetInitialDates();
   FillDates();
   SubmitDates();
});

function CopyToClipboard() {
   const formattedTimestampField =
      document.getElementById("formattedTimestamp");
   formattedTimestampField.select();
   document.execCommand("copy");
}

function SetInitialDates() {
   const currentDate = new Date();
   const currentYear = currentDate.getFullYear();
   // Extract the current VAR from the DateOBJ in two-digit format (2 digits - Pad with 0)
   const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
   const currentDay = String(currentDate.getDate()).padStart(2, "0");
   const currentHour = String(currentDate.getHours()).padStart(2, "0");
   const currentMinute = String(currentDate.getMinutes()).padStart(2, "0");
   return {
      Date: currentDate,
      Year: currentYear,
      Month: currentMonth,
      Day: currentDay,
      Hour: currentHour,
      Minute: currentMinute,
   };
}

function FillDates() {
   const { Date, Year, Month, Day, Hour, Minute } = SetInitialDates();
   document.getElementById("datepicker").value = `${Year}-${Month}-${Day}`;
   document.getElementById("timepicker").value = `${Hour}:${Minute}`;
}

function SubmitDates() {
   document.getElementById("form").addEventListener("submit", function (e) {
      e.preventDefault();
      const selectedDate = document.getElementById("datepicker").value;
      const selectedTime = document.getElementById("timepicker").value;
      const selectedDateTime = new Date(selectedDate + " " + selectedTime);
      const unixTimestamp = Math.floor(selectedDateTime.getTime() / 1000); // Convert the selected date and time into seconds
      let formattedTimestamp;
      if (document.getElementById("shortformat").checked) {
         formattedTimestamp = `<t:${unixTimestamp}>`;
      } else {
         formattedTimestamp = `<t:${unixTimestamp}:F>`;
      }
      document.getElementById("formattedTimestamp").textContent = unixTimestamp;
      document.getElementById("formattedTimestamp").value = formattedTimestamp;
   });
}
