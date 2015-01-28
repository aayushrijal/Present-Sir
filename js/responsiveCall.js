$(".present").click(function(){
		checkMark(1);
	});
$(".absent").click(function(){
		checkMark(0);
	});
$("#rangeSlide").on("change",function(){
				roll=parseInt($("#rangeSlide").val());
				iloop=roll-section;
				$("#rollNoDisplay").html(roll);
				});
$("#leftPanel").on("click",function(){$("#leftPanel").toggleClass("leftPanel1 leftPanel2")});
$(".menuIcon").click(function(){
	$("#leftPanel").toggleClass("leftPanel1 leftPanel2");
	});
$("#addGroup").click(function(){
	$("#rollnoPage").hide();
	$("#section-Rollno").hide();
	$("#newGroupForm").show();
	});
$("#cancelNewRegister").click(function(){
	$("#rollnoPage").show();
	$("#section-Rollno").show();
	$("#newGroupForm").hide();
});
sidebarLoad();
