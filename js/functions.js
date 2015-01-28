function checkMark(pa){
	console.log("I'm here");
	if(currentTable==0){
		alert("Select a class or create a new class to modify!");
		return;
	}
	if(pa==1)
		$("#a"+(iloop+1)).css("background-color","#4CAF50");
	else
		$("#a"+(iloop+1)).css("background-color","#ff4444");
	student[iloop]=pa;
	var currentStudent=roll;
	
	console.log("I'm here",currentStudent," ",currentTable);
	db.transaction(function(tx){
		tx.executeSql('UPDATE '+currentTable+' SET attendance=? WHERE studentId=? AND date=?',[pa,currentStudent,todaysDate]);
		});
	if(roll==$("#rangeSlide").attr("max")){
		for(i=0;i<totalNo;i++){
			if(student[i]==1)
				presentNo++;
		}
		$("#rollNoDisplay").html(presentNo+'/'+(totalNo-1));
		presentNo=0;
		return;
	}
	iloop++;
	$("#rangeSlide").val(++roll);
	$("#rollNoDisplay").html(roll);
}
function sidebarLoad(){
	db.readTransaction(function(tx){
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
		for(i=1;i<51;i++){
			$("#a"+i).css("background-color","#FFF");
		}
		iloop=0;
		student=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		tableLoad(tN);	
	};
function tableLoad(tN){
	var temp;
	$(".td1").hide();	
	$("#classDisplay").html(tN);
	(function(){
	console.log("THerewr");
	db.readTransaction(function(tx){
		tx.executeSql("SELECT batch,section,nos FROM classIndex WHERE nameOfClass=?",[tN],function(transaction,results){
			rollStart=parseInt(results.rows.item(0).section);
			totalNo=parseInt(results.rows.item(0).nos);
			batch=parseInt(results.rows.item(0).batch);
			temp=rollStart+totalNo-2;
			console.log(batch,"asdf");
			roll=rollStart;
			$("input[type=range]").attr({min:roll,max:roll+totalNo-1});
			totalNo+=1;
			$("#rollNoDisplay").text(roll);
			});
	});
	})();			
	if(( localStorage["#"+currentTable+"md"] == undefined)||(localStorage["#"+currentTable+"md"] !=todaysDate)){
	localStorage["#"+currentTable+"md"] = todaysDate;
	for(i=rollStart;i<temp;i++){
		console.log(rollStart,totalNo,i,temp);
		(function(i){
		db.transaction(function(tx){
				tx.executeSql("INSERT INTO "+currentTable+"(studentId,date,attendance) VALUES(?,?,?)",[i,todaysDate,0]);
				$("#a"+(i-rollStart+1)).text(i).show();
				});
		})(i);		
	};
	}else{
	//alert("I'm here");
	db.readTransaction(function(tx){
		tx.executeSql("SELECT attendance FROM "+currentTable+" WHERE date=?",[todaysDate],function(transaction,results){
		var rows=results.rows;
		console.log(rows);
		for(i=1;i<totalNo;i++){
			$("#a"+i).text(i+rollStart-1).show();
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
function tablePresentCheck(tN){
	var a=0;
	db.readTransaction(function(tx){
	tx.executeSql("SELECT * FROM classIndex WHERE nameOfClass=?",[tN],function(transaction,results){
		if(results.rows.length>0){
			alert("Table already Present");
			a=1;
		}else{
			alert("Table not present");
			a=2;
		}		
		});
	});
	return a;
}
