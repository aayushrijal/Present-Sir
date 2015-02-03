 $(function() {      
      //Enable swiping...
      $("#leftPanel").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          //$(this).text("You swiped " + direction );
		$("#leftPanel").toggleClass("leftPanel1 leftPanel2");  
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
      });
	$("#rollno").swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
		switch(direction){
			case "right":	
          		$("#leftPanel").toggleClass("leftPanel1 leftPanel2");
			break;
			case "left":
			checkMark(0);
			break;
		}  
        },
	tap:function(event,target){
			alert("Hello");
	},
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:50
      });
	$("#addGroup").swipe( {
		tap:function(event,target){
			alert(target);
			$("#rollnoPage").hide();
			$("#section-Rollno").hide();
			$("#newGroupForm").show();
	},threshold:50
	});
    });
