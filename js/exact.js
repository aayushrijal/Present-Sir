//variables declared here
var currentTable=0; // currently working table
var batch=0,section=0; //current batch and section
var student= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var iloop=0;
var roll=1;
var presentNo=0; // total no of present students
var todaysDate=new Date();
todaysDate=todaysDate.getMonth()+" "+todaysDate.getDate();		
//variables declaration end
var db = openDatabase('studentDatabase','1.0','Attendance Register',3*1024*1024);
db.transaction(function(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS classIndex(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nameOfClass TEXT NOT NULL,batch INTEGER NOT NULL,section INTEGER NOT NULL)',[]);
});
//functions to run when program initializes

//initial functions end
$('#addNewRegister').click(function(){
	className=$(".collegeInput").val();
	className+=(" "+$('#facultyId').val()+"'"+$('#sectionId').val()+"' "+$('#yearId').val()+"/"+$('#semesterId').val());
	batch=$('#batchId').val();
	section=$('#sectionId').val();
	switch(section){
	case "A":
		section=1;
		break;
	case "B":
		section=45;
		break;
	case "C":
		section=89;
		break;
	}
	db.transaction(function(tx){
		tx.executeSql('INSERT INTO classIndex(nameOfClass,batch,section) VALUES(?,?,?)',[className,batch,section],function(transaction,results){
		sqlTableName=results.insertId;
		currentTable="class"+sqlTableName;		
		});
		});
	db.transaction(function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS '+currentTable+'(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, studentId INTEGER NOT NULL,date TEXT NOT NULL,attendance INTEGER );');
	});
	$("#classList").prepend($(document.createElement("div")).html(className).addClass("addGroup").attr("id",currentTable));
	tableLoad(className);
	$("#rollnoPage").show();
	$("#newGroupForm").hide();
	$("#section-Rollno").show();
});
