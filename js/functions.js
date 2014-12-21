function checkMark(pa){
	if(currentTable==0){
		alert("Select a class or create a new class to modify!");
		return;
	}
	if(pa==1)
		$("#a"+(iloop+1)).css("background-color","#4CAF50");
	else
		$("#a"+(iloop+1)).css("background-color","#ff4444");
	student[iloop]=pa;
	var currentStudent=batch+roll;
	db.transaction(function(tx){
		tx.executeSql('UPDATE '+currentTable+' SET attendance=? WHERE studentId=? AND date=?',[pa,currentStudent,todaysDate]);
		});
	if(roll==$("#rangeSlide").attr("max")){
		for(i=0;i<44;i++){
			if(student[i]==1)
				presentNo++;
		}
		$("#rollNoDisplay").html(presentNo+'/44');
		presentNo=0;
		return;
	}
	iloop++;
	$("#rangeSlide").val(++roll);
	$("#rollNoDisplay").html(roll);
}
function sidebarLoad(){
	db.transaction(function(tx){
		tx.executeSql('select * from classIndex',[],function(transaction, results){
		     	for (var j=0; j<results.rows.length; j++) {
					var row = results.rows.item(j);
					$("#classList").prepend($(document.createElement("div")).html(row.nameOfClass).addClass("addGroup").attr("id","class"+row.id));
					$("#class"+row.id).click(function(){
						currentWorkingTable(this.id,this.innerHTML);						
					});	
	}	
		});
	});
	

}
function currentWorkingTable(tId,tN){
		currentTable=tId;
		//alert("currentTable");
		$("#section-Rollno").show();
		for(i=1;i<45;i++){
			$("#a"+i).css("background-color","#FFF");
		}
		iloop=0;
		student=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		tableLoad(tN);	
	};
function tableLoad(tN){
	$("#classDisplay").html(tN);
	db.transaction(function(tx){
		tx.executeSql("SELECT batch,section FROM classIndex WHERE nameOfClass=?",[tN],function(transaction,results){
			console.log(results.rows.item(0).section);
			batch=parseInt(results.rows.item(0).batch);
			section=parseInt(results.rows.item(0).section);
			roll=section;
			$("input[type=range]").attr({min:roll,max:roll+43});
			$("#rollNoDisplay").text(roll);
						});
	});
	if(( localStorage["#"+currentTable+"md"] == undefined)||(localStorage["#"+currentTable+"md"] !=todaysDate)){
	localStorage["#"+currentTable+"md"] = todaysDate;
	for(i=section;i<(section+44);i++){
		(function(i){
		db.transaction(function(tx){
				tx.executeSql("INSERT INTO "+currentTable+"(studentId,date,attendance) VALUES(?,?,?)",[batch+i,todaysDate,0]);
				});
		})(i);		
	};
	}else{
	//alert("I'm here");
	db.transaction(function(tx){
		tx.executeSql("SELECT attendance FROM "+currentTable+" WHERE date=?",[todaysDate],function(transaction,results){
		var rows=results.rows;
		console.log(rows);
		for(i=1;i<45;i++){
			student[i-1]=results.rows.item(i-1).attendance;
			if(results.rows.item(i-1).attendance==1)
				$("#a"+i).css("background-color","#4CAF50");
			else
				$("#a"+i).css("background-color","#ff4444");
		}
		});
	});
	}	
	
}
