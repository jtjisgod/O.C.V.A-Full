$(document).ready(function () {
	$("body").on("focus", ".main-enter-input", function () {
		$(".main").addClass("selected");
	});

	$("body").on("focusout", ".main-enter-input", function () {
		$(".main").removeClass("selected");

	});

	$("body").on("submit", "#main-form", function (e) {
		e.preventDefault();
		if ($(".main-enter-submit").hasClass("loading")) {
			return;
		}
		$(".main-enter-submit").addClass("loading");


		// var formData = new FormData($(this)[0]);

		$.ajax({
			url: '/api/v1/checkUrl?url=' + $(".main-enter-input").val(),
			// data: formData,
			processData: false,
			contentType: false,
			dataType: "JSON",
			type: 'GET'
		}).done(function (data) {
			console.log(data);
			location.href = "/select";

		}).fail(function (xhr, ajaxOptions, thrownError) {
			if (xhr.status == 403) {
				alert(JSON.parse(xhr.responseText).message);
			}
			else{
				alert("error!");
			}
			$(".main-enter-submit").removeClass("loading");
			
		});
	})

})