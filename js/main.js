var currentTable="";
var student= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var batch;
var roll=1; //roll number starts at;
	$("#rollNoDisplay").text(roll);
	$("#rangeSlide").on("change",function(){
				roll=parseInt($("#rangeSlide").val());
				$("#rollNoDisplay").html(roll);
				});
	$(".present").click(function(){
		if(student[roll-1]==0){
			student[roll-1]=1;
			//student[roll-1][0]++;
			db.transaction(function(transaction){
			alert(currentTable+" "+batch);
			//alert(currentTable+' '+(batch+roll)+' '+todaysDate);
			transaction.executeSql('UPDATE '+currentTable+' SET attendance=1 WHERE studentId=? AND date=?',[batch+roll-1,todaysDate]);
			});	
		}		
		if(roll==$("#rangeSlide").attr("max"))
		{
			var presentStudents=0;
			for(i=0;i<$("#rangeSlide").attr("max");i++){
				if(student[i]==1)
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
		if(student[roll-1]==1){
			student[roll-1]=0;
			//student[roll-1][0]--;
			db.transaction(function(transaction){
			transaction.executeSql('UPDATE '+currentTable+' SET attendance=0 WHERE studentId=? AND date=?',[student[roll-1],todaysDate]);
			});
		}
		if(roll==$("#rangeSlide").attr("max"))
		{
			var presentStudents=0;
			for(i=0;i<$("#rangeSlide").attr("max");i++){
				if(student[i]==1)
					presentStudents++;
			}
			presentStudents+="/"+$("#rangeSlide").attr("max");
			$("#rollNoDisplay").html(presentStudents);
		}else{
		$("#rangeSlide").val(++roll);
		$("#rollNoDisplay").html(roll);
		}
	});
$("#leftPanel").on("click",function(){$("#leftPanel").toggleClass("leftPanel1 leftPanel2")});
	
$(".menuIcon").click(function(){
	$("#leftPanel").toggleClass("leftPanel1 leftPanel2");
	});
$("#addGroup").click(function(){
	$("#rollnoPage").hide();
	$("#newGroupForm").show();
		
	});
$("#option").click(function(){
	$("#pastRecord").toggle();
});
var temp,sqlTableName,sqlTableNameParsed;
$("#addNewRegister").click(function(){
	temp=$(".collegeInput").val();
	temp+=(" "+$('#facultyId').val()+"'"+$('#sectionId').val()+"' "+$('#yearId').val()+"/"+$('#semesterId').val());
	batch=$('#batchId').val();
	db.transaction(function(transaction){
		transaction.executeSql('INSERT INTO classIndex(nameOfClass,batch) VALUES(?,?)',[temp,batch]);
		transaction.executeSql('SELECT id FROM classIndex WHERE nameOfClass=?',[temp],function(transaction,results){
			sqlTableName=results.rows.item(0).id;
											});
		});
	db.transaction(function(transaction){
		sqlTableNameParsed=sqlTableName;
		sqlTableName="class"+sqlTableName;
		transaction.executeSql('CREATE TABLE IF NOT EXISTS '+sqlTableName+'(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, studentId INTEGER NOT NULL,date TEXT NOT NULL,attendance INTEGER );');
		//transaction.executeSql('ALTER TABLE '+sqlTableName+' ADD UNIQUE(studentId,date)');
		});		
	$("#rollnoPage").show();
	$("#newGroupForm").hide();
	currentTable=sqlTableName;
	db.transaction(function(transaction){
						transaction.executeSql("SELECT batch FROM classIndex WHERE id=?",[sqlTableNameParsed],function(transaction,results){
						batch=parseInt(results.rows.item(0).batch);
						});
	});
	localStorage["#class"+sqlTableNameParsed+"md"] = todaysDate;
	for(i=1;i<45;i++){
		(function(i){
		db.transaction(function(tx){
				tx.executeSql("INSERT INTO class"+sqlTableNameParsed+"(studentId,date,attendance) VALUES(?,?,?)",[batch+i,todaysDate,0]);
				});
		})(i);		
		};
	$("#classList").prepend($(document.createElement("div")).html(temp).addClass("addGroup").attr("id",sqlTableName));
	student=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	$("#classDisplay").html(temp);
	
	});
$("#cancelNewRegister").click(function(){
	$("#rollnoPage").show();
	$("#newGroupForm").hide();
});
$(".optionIcon").click(
function(){
	$("#versionDisplay").toggle("versionDisplay");
});
