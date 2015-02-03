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
		tx.executeSql('UPDATE '+currentTable+' SET attendance=? WHERE studentId=? AND date=?',[pa,$("#rangeSlide").val(),todaysDate]);
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
					classNumberArray.push([row.id,row.rollStart,row.nos]);
					$("#classList").prepend($(document.createElement("div")).html(row.nameOfClass).addClass("addGroup").attr("id","class"+row.id));
					$("#class"+row.id).click(function(){
						currentWorkingTable(this.id,row.id,this.innerHTML);						
					});	
	}	
		});
	});
	

}
function currentWorkingTable(tId,rowId,tN){
		currentTable=tId;
		//alert("currentTable");
		$("#section-Rollno").show();
		for(i=1;i<51;i++){
			$("#a"+i).css("background-color","#FFF");
		}
		iloop=0;
		student=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		tableLoad(rowId);
		$("#classDisplay").html(tN);
	};
function tableLoad(rowId){
	$(".td1").hide();
	for(i=0;i<classNumberArray.length;i++){
		if(classNumberArray[i][0]==rowId){
			rollStart=parseInt(classNumberArray[i][1]);
			totalNo=parseInt(classNumberArray[i][2]);
			break;
		}
	}
	for(j=1;j<=totalNo;j++){
				$("#a"+j).text(rollStart+j-1).show();
				}
	roll=rollStart;
	$("input[type=range]").attr({min:roll,max:roll+totalNo-1});
	totalNo+=1;
	$("#rollNoDisplay").text(roll);	
	/*(function(){
	db.readTransaction(function(tx){
		tx.executeSql("SELECT batch,rollStart,nos FROM classIndex WHERE nameOfClass=?",[tN],function(transaction,results){
			console.log("I'm here");			
			if((totalNo=parseInt(results.rows.item(0).nos))&&(rollStart=parseInt(results.rows.item(0).rollStart))){
			for(j=1;j<=totalNo;j++){
				$("#a"+j).text(rollStart+j-1).show();
				}			
			}
			batch=parseInt(results.rows.item(0).batch);
			temp=rollStart+totalNo-2;
			roll=rollStart;
			$("input[type=range]").attr({min:roll,max:roll+totalNo-1});
			totalNo+=1;
			$("#rollNoDisplay").text(roll);
			});
	});
	})();*/
	if(( localStorage["#"+currentTable+"md"] == undefined)||(localStorage["#"+currentTable+"md"] !=todaysDate)){
	localStorage["#"+currentTable+"md"] = todaysDate;
	console.log("I'm here too");
	for(i=rollStart;i<totalNo;i++){
		(function(i){
		db.transaction(function(tx){
				tx.executeSql("INSERT INTO "+currentTable+"(studentId,date,attendance) VALUES(?,?,?)",[i,todaysDate,0]);
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
			//$("#a"+i).text(i+rollStart-1).show();
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
