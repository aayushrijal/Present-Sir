//variables declared here
var currentTable=0; // currently working table
var batch=0,section=0; //current batch and section
var student= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var iloop=0;
var roll=1;
var presentNo=0; // total no of present students
var todaysDate=new Date();
var totalNo=0,rollStart=0;
var classNumberArray=new Array();
var dateList=new Array();
var pastData=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
todaysDate=todaysDate.getMonth()+" "+todaysDate.getDate();		
//variables declaration end

var db = openDatabase('studentDatabase','1.0','Attendance Register',3*1024*1024);
db.transaction(function(tx){
	tx.executeSql('CREATE TABLE IF NOT EXISTS classIndex(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nameOfClass TEXT NOT NULL,batch INTEGER NOT NULL,rollStart INTEGER NOT NULL,nos INTEGER NOT NULL)',[]);
});
//functions to run when program initializes

//initial functions end
$('#addNewRegister').click(function(){
	var currentTableTemp;
	currentTableTemp=currentTable;
	className=$(".collegeInput").val();
	className+=(" "+$('#facultyId').val()+"'"+$('#sectionId').val()+"' "+$('#yearId').val()+"/"+$('#semesterId').val());
	db.readTransaction(function(tx){
		tx.executeSql("SELECT * FROM classIndex WHERE nameOfClass=?",[className],function(transaction,results){	
			if(results.rows.length>0){
				className=undefined;
			}
		});
	});	
	batch=$('#batchId').val();
	section=$('#sectionId').val();
	rollStart=$('#rollInput').val();
	totalNo=$('#totalNumber').val();
	db.transaction(function(tx){
		if(className==undefined){
			alert("Class already Exists");
			return;
		}
		tx.executeSql('INSERT INTO classIndex(nameOfClass,batch,rollStart,nos) VALUES(?,?,?,?)',[className,batch,rollStart,totalNo],function(transaction,results){
			sqlTableName=results.insertId;
			classNumberArray.push([sqlTableName,rollStart,totalNo])
			currentTable="class"+sqlTableName;
		});
		//while(currentTableTemp==currentTable);
	});
	db.transaction(function(tx){
		if(className==undefined){
			return;
		}
		tx.executeSql('CREATE TABLE IF NOT EXISTS '+currentTable+'(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, studentId INTEGER NOT NULL,date TEXT NOT NULL,attendance INTEGER );',[],function(){
			$("#classList").prepend($(document.createElement("div")).html(className).addClass("addGroup").attr("id",currentTable));
			$("#"+currentTable).click(function(){
				//alert(this.id+" "+this.innerHTML);
				currentWorkingTable(this.id,this.id.slice(5),this.innerHTML);						
			});
			//tableLoad(className);
			$("#rollnoPage").show();
			pastData=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
			currentWorkingTable(currentTable,classNumberArray[classNumberArray.length-1][0],className);
			$("#newGroupForm").hide();
			//$("#section-Rollno").show();
		});
	});
});
