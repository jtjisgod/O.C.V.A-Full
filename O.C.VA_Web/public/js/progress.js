var totalPercent = 0;
var nowSelected = 0;
var totalNum = 0;
$(document).ready(function () {
	totalNum = $(".progress-list-item").length;
	attack();
});

function attack() {
	if (totalNum <= nowSelected) {
		// alert("done");

		return;
	}

	$.ajax({
		url: '/api/v1/attack?type=' + $(".progress-list-item:eq(" + nowSelected + ")").attr("pg-id"),
		processData: false,
		contentType: false,
		dataType: "JSON",
		type: 'GET'
	}).done(function (data) {
		$(".progress-list-item:eq(" + nowSelected + ")").addClass("now");
		progress();
	}).fail(function (xhr, ajaxOptions, thrownError) {
		// if (xhr.status == 403) {
		// 	alert(JSON.parse(xhr.responseText).message);
		// }
		// else {
		// 	alert("error!");
		// }
		// $(".main-enter-submit").removeClass("loading");

	});
}

function progress() {

	$.ajax({
		url: '/api/v1/progress',
		processData: false,
		contentType: false,
		dataType: "JSON",
		type: 'GET'
	}).done(function (data) {


		if (data.status == 2) {


			$.ajax({
				url: '/api/v1/getInfo',
				processData: false,
				contentType: false,
				dataType: "JSON",
				type: 'GET'
			}).done(function (data) {
				console.log(data);
				$(".progress-list-item:eq(" + nowSelected + ")").removeClass("now");
				$(".progress-list-item:eq(" + nowSelected + ")").addClass("passed");
				$(".progress-list-log:eq(" + nowSelected + ")").text(data.info);
				nowSelected++;
				$(".progress-list-percent").text(parseInt(100 / totalNum * nowSelected) + "%");
				attack();

			});

		}
		else {
			$(".progress-list-percent").text(parseInt((parseInt(100 / totalNum * nowSelected) + parseInt(data.percent) / totalNum)) + "%");

			setTimeout(function () {
				progress();
			}, (data.percent > 88 ? 1200 : 100));
		}
	}).fail(function (xhr, ajaxOptions, thrownError) {
		// if (xhr.status == 403) {
		// 	alert(JSON.parse(xhr.responseText).message);
		// }
		// else {
		// 	alert("error!");
		// }
		// $(".main-enter-submit").removeClass("loading");

	});
}