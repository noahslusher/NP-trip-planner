// click the state-picker and disable the first option
$("#userState").click(function () {
  $(this).find(".select-state").hide();
});

// click the date-picker display the calendar
//$(function () {
  //$("#datepicker").datepicker().addClass("font-color: blue");
  //minDate: 1;


  //datepicker set up to changethe color of text and block past/future dates
  $(function () {
    $("#datepicker").datepicker({minDate: 1, maxDate: 60})
  $('#datepicker').on("change", function() {
    $(this).css("color", "blue")
    var selected = $(this).val();
    console.log(selected);
       });


});

