function checkMark(pa){
	if(currentTable==0){
		alert("Select a class or create a new class to modify!");
		return;
	}
	if(pa==1)
		$("#a"+(iloop+1)).css("background-color","#00E676");
	else
		$("#a"+(iloop+1)).css("background-color","#FFFFFF");//#ff4444");
	student[iloop]=pa;
	var currentStudent=roll;
	db.transaction(function(tx){
		tx.executeSql('UPDATE '+currentTable+' SET attendance=? WHERE studentId=? AND date=?',[pa,$("#rangeSlide").val(),todaysDate]);
		if(roll==$("#rangeSlide").attr("max")){
			for(i=0;i<totalNo;i++){
				if(student[i]==1)
					presentNo++;
				}
			$("#rollNoDisplay").html(presentNo+'/'+(totalNo-1));
			presentNo=0;
			}else{
				$("#rangeSlide").val(++roll);
				$("#rollNoDisplay").html(roll);
				iloop++;
				}
		});
	}
function sidebarLoad(){
	db.readTransaction(function(tx){
		tx.executeSql('select * from classIndex',[],function(transaction, results){
		     	for (var j=0; j<results.rows.length; j++) {
					var row = results.rows.item(j);
					classNumberArray.push([row.id,row.rollStart,row.nos]);
					$("#classList").prepend($(document.createElement("div")).html(row.nameOfClass).addClass("addGroup").attr("id","class"+row.id));
					console.log(row.id);
					$("#class"+row.id).click(function(){
						$("#leftPanel").toggleClass("leftPanel1 leftPanel2");
						currentWorkingTable(this.id,row.id,this.innerHTML);						
						});	
					}
			});
		});
}
function currentWorkingTable(tId,rowId,tN){
		currentTable=tId;
		$("#section-Rollno").show();
		for(i=1;i<51;i++){
			$("#a"+i).css("background-color","#FFFFFF");
		}
		iloop=0;
		tableLoad(rowId);
		$("#classDisplay").html(tN);
	};
function tableLoad(rowId){
	$(".td1").hide();
	for(i=0;i<classNumberArray.length;i++){
		if(classNumberArray[i][0]==rowId){
			rollStart=parseInt(classNumberArray[i][1]);
		student=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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
	var totalFromStart=totalNo+rollStart-1;
	for(i=rollStart;i<totalFromStart;i++){
		(function(i){
		db.transaction(function(tx){
				tx.executeSql("INSERT INTO "+currentTable+"(studentId,date,attendance) VALUES(?,?,?)",[i,todaysDate,0]);
				});
		})(i);		
	};
	}else{
	db.readTransaction(function(tx){
		tx.executeSql("SELECT attendance FROM "+currentTable+" WHERE date=?",[todaysDate],function(transaction,results){
		var rows=results.rows;
		console.log(rows);
		for(i=1;i<totalNo;i++){
			//$("#a"+i).text(i+rollStart-1).show();
			student[i-1]=results.rows.item(i-1).attendance;
			if(results.rows.item(i-1).attendance==1)
				$("#a"+i).css("background-color","#00E676");
			else
				$("#a"+i).css("background-color","#FFFFFF");
		}
		});
	});
	dateLister();
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
function dateLister(){
	db.readTransaction(function(tx){
		tx.executeSql("SELECT date FROM "+currentTable+" WHERE studentId=? ORDER BY date DESC LIMIT 2",[rollStart],function(transaction,results){
			dateList.push(results.rows.item(0).date,results.rows.item(1).date);
		});
	});
}
var t1,t2;
function attendanceList(){
	pastData=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];	
	db.readTransaction(function(tx){
		tx.executeSql("SELECT COUNT(*) AS count FROM "+currentTable+" WHERE attendance=1 GROUP BY studentId",[],function(transaction,results){
			t1=results.rows;
			for(i=0;i<results.rows.length;i++){
				//rows=results.rows;
				//pastData.push([results.rows.item(i).count,0,0]);
				pastData[i]=results.rows.item(i).count;
				}
				});
	});
	db.readTransaction(function(tx){
		tx.executeSql("SELECT distinct t1.studentId as ID,(SELECT attendance from "+currentTable+" AS t2 where t2.studentId=t1.studentId AND t2.date=?) as at1,(SELECT attendance from "+currentTable+" AS t3 where t3.studentId=t1.studentId AND t3.date=?) as at2 from "+currentTable+" AS t1",[dateList[0],dateList[1]],function(transaction,results){
			for(j=0;j<results.rows.length;j++){
					console.log("j is",j);
					var $tr = $('<tr/>');			
					$tr.append($('<td/>').html(rollStart+j).addClass("pastRoll"));
					var cls=((results.rows.item(j).at2==0)?"pastRoll1":"pastRoll");					
					$tr.append($('<td/>').addClass(cls));
					cls=((results.rows.item(j).at1==0)?"pastRoll1":"pastRoll");					
					$tr.append($('<td/>').addClass(cls));
					$tr.append($('<td/>').html(pastData[i]).addClass("pastRoll1"));
					$('#table tr:last').after($tr);	
					//pastData[j/2][1]=results.rows.item(j).attendance;
					//pastData[j/2][2]=results.rows.item(j+1).attendance;
				}
			/*
			for(i=0;i<pastData.length;i++){
					var $tr = $('<tr/>');
					$tr.append($('<td/>').html(rollStart+i).addClass("pastRoll"));
					//pastData[i][0]));
					var cls=(pastData[i][2]==0?"pastRoll1":"pastRoll");
      					$tr.append($('<td/>').addClass(cls));//pastData[i][1]));
					cls=(pastData[i][1]==0?"pastRoll1":"pastRoll");
					$tr.append($('<td/>').addClass(cls));
    					$tr.append($('<td/>').html(pastData[i][0]).addClass("pastRoll1"));
					$('#table tr:last').after($tr);
					//here i was coding
				}*/
		});
	});
	
};
/*function presentDaysCount(){
	//day list
	db.readTransaction(function(tx){
		tx.executeSql("SELECT date FROM class3 WHERE studentId=100 ORDER BY date DESC",[],function(transaction,results){
		var rows=results.rows;
		r=rows;
				});
	});
	db.readTransaction(function(tx){
		tx.executeSql("SELECT COUNT(*) AS c FROM class3 WHERE attendance=1 GROUP BY studentId",[],function(transaction,results){
		var rows=results.rows;
		r=rows;
				});
	});
}*/
