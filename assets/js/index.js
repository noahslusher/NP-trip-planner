// click the calendar icon and trigger the calendar
$(".pick-date img").on("click", function () {
  $(".pick-date input").trigger("focus");
  $("#datepicker").attr("placeholder", "DD/MM/YY").removeClass("missingDate");
});

$(".pick-date").on("click", function () {
  $("#datepicker").attr("placeholder", "DD/MM/YY").removeClass("missingDate");
});

// click the state-picker and disable the first option
$("#userState").click(function () {
  $(this).removeClass("missingState");
});

// click the button and jump to parkCode.html
$("#form").on("submit", function (e) {
  e.preventDefault();

  var date = $("#datepicker").val();
  var state = $("#userState").val();
  if (!date || state === "null") {
    if (!date) {
      $("#datepicker").attr("placeholder", "ENTER DATE !").addClass("missingDate");
    }
    if (state === "null") {
      $(".select-state").text("SELECT STATE !");
      $("#userState").addClass("missingState");
      $("#userState option").addClass("optionColor");
    }
    return;
  }

  window.location.href = "./park.html?" + "date=" + date + "&state=" + state;
});

//datepicker set up to changethe color of text and block past/future dates
$(function () {
  $("#datepicker").datepicker({ minDate: 1, maxDate: 120 });
  $("#datepicker").on("change", function () {
    // $(this).css("color", "blue")
    var dateSelected = $(this).val();
    localStorage.setItem("date", dateSelected);
    // console.log(dateSelected);
  });
});
