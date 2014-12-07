var student= [[68001,0,0],[68002,0,0],[68003,0,0],[68004,0,0],[68005,0,0],[68006,0,0],[68007,0,0],[68008,0,0],[68009,0,0],[68010,0,0],[68011,0,0],[68012,0,0],[68013,0,0],[68014,0,0],[68015,0,0],[68016,0,0],[68017,0,0],[68018,0,0],[68019,0,0],[68020,0,0],[68021,0,0],[68022,0,0],[68023,0,0],[68024,0,0],[68025,0,0],[68026,0,0],[68027,0,0],[68028,0,0],[68029,0,0],[68030,0,0],[68031,0,0],[68032,0,0],[68033,0,0],[68034,0,0],[68035,0,0],[68036,0,0],[68037,0,0],[68038,0,0],[68039,0,0],[68040,0,0],[68041,0,0],[68042,0,0],[68043,0,0],[68044]];
var roll=1;
	$("#rollNoDisplay").text(roll);
	$("#rangeSlide").on("change",function(){
				roll=parseInt($("#rangeSlide").val());
				$("#rollNoDisplay").html(roll);
				});
	$(".present").click(function(){
		if(student[roll-1][2]==0){
			student[roll-1][2]=1;
			student[roll-1][1]++;
		}		
		if(roll==$("#rangeSlide").attr("max"))
		{
			var presentStudents=0;
			for(i=0;i<$("#rangeSlide").attr("max");i++){
				if(student[i][2]==1)
					presentStudents++;
			}
			presentStudents+="/"+$("#rangeSlide").attr("max");
			$("#rollNoDisplay").html(presentStudents);
		}else{
		$("#rangeSlide").val(++roll);
		$("#rollNoDisplay").html(roll);
		}
	});
	$(".absent").click(function(){
		if(student[roll-1][2]==1){
			student[roll-1][2]=0;
			student[roll-1][1]--;
		}
		if(roll==$("#rangeSlide").attr("max"))
		{
			
		}else{
		$("#rangeSlide").val(++roll);
		$("#rollNoDisplay").html(roll);
		}
	});
$(".menuIcon").click(function(){
	$("#leftPanel").toggleClass("leftPanel1").toggleClass("leftPanel2");
	});

