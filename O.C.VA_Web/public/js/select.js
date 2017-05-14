$(document).ready(function(){
	$("body").on("submit", "#select-form", function(e){
		e.preventDefault();
		

		// var formData = new FormData($(this)[0]);

		$.ajax({
			url: '/api/v1/select',
			data: $(this).serialize(),
			processData: false,
			contentType: false,
			dataType: "JSON",
			type: 'GET'
		}).done(function (data) {
			location.href = "/prove";

		}).fail(function (xhr, ajaxOptions, thrownError) {
			if (xhr.status == 403) {
				alert(JSON.parse(xhr.responseText).message);
			}
			else{
				alert("error!");
			}
			$(".main-enter-submit").removeClass("loading");
			
		});
	});

	$("body").on("change", "#selectAll", function(e){
		if( $(this).is(':checked') ) {
			$("input[type=checkbox]").prop("checked",true); 
		}
		else{
			$("input[type=checkbox]").prop("checked",false); 
		}
	})
});