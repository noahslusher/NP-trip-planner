// click the state-picker and disable the first option
$("#userState").click(function () {
  $(this).find(".select-state").hide();
});

// click the date-picker display the calendar
$(function () {
  $("#datepicker").datepicker().addClass("font-color: blue");
  minDate: 1;
});
