$(document).ready(function () {
	$("input[type='text']").on("click", function () {
		$(this).select();
	});

	$("body").on("click", ".prove-process-submit", function(e){
		$.ajax({
			url: '/api/v1/checkSum',
			// data: formData,
			processData: false,
			contentType: false,
			dataType: "JSON",
			type: 'GET'
		}).done(function (data) {
			console.log(data);
			location.href = "/progress";

		}).fail(function (xhr, ajaxOptions, thrownError) {
			if (xhr.status == 403) {
				alert("일치하는 파일이 존재하지 않습니다!");
				// alert(JSON.parse(xhr.responseText).message);
			}
			else{
				alert("error!");
			}
			
		});
	});
})