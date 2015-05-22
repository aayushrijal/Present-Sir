$(".present").click(function(){
	checkMark(1);
});
$(".absent").click(function(){
	checkMark(0);
});

$("#rangeSlide").on("change",function(){
	roll=parseInt($("#rangeSlide").val());
	iloop=roll-rollStart;
	$("#rollNoDisplay").html(roll);
});

//$("#leftPanel").on("click",function(){$("#leftPanel").toggleClass("leftPanel1 leftPanel2")});
$(".menuIcon").click(function(){
	$("#leftPanel").toggleClass("leftPanel1 leftPanel2");
});
/*$("#addGroup").click(function(){
	alert("Hello");
	$("#rollnoPage").hide();
	$("#section-Rollno").hide();
	$("#newGroupForm").show();
	});*/
$("#cancelNewRegister").click(function(){
	$("#rollnoPage").show();
	$("#section-Rollno").show();
	$("#newGroupForm").hide();
});

$("#option").click(function(){
	if(currentTable==0){
		alert("Select a Table First");
		return;
	}
	$("#section-Rollno").hide();
	$("#rollnoPage").hide();
	$("#leftPanel").toggleClass("leftPanel1 leftPanel2");
	attendanceList();
});

sidebarLoad();
