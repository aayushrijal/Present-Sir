var roll=1;
	$("#rollNoDisplay").text(roll);
	$("#rangeSlide").on("change",function(){
				$("#rollNoDisplay").html($("#rangeSlide").val());
				});
	$(".present").click(function(){
		$("#rangeSlide").val(++roll);
		$("#rollNoDisplay").html(roll);
	});
	$(".absent").click(function(){
		$("#rangeSlide").val(++roll);
		$("#rollNoDisplay").html(roll);
	});
