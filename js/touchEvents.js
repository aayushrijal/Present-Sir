var ev,ph,tg,dat;
                $('#mainContainer').bind('touchy-swipe', function (event, phase, $target, data) {
			ev=event;
			ph=phase;
			tg=$target;
			dat=data;
			console.log("swipe");
			//$("#rollnoDisplay").text(parseInt($("#rollnoDisplay").text())+1);
	              /*  var movePoint = data.movePoint,
                       	startPoint = data.startPoint,
                        velocity = data.velocity;
                    /*switch (phase) {
                        case 'start':
			    console.log("Hello");
                            $target.css('border','2px solid yellow');
                            break;
                        case 'move':
                            $target.css({'zIndex':'99', 'webkitTransform': 'translate(' + (movePoint.x - startPoint.x) + 'px, ' + (movePoint.y - startPoint.y) + 'px)'});
                            if ((302 < movePoint.x && movePoint.x < 402) && (402 < movePoint.y && movePoint.y < 502)) {
                                $('#test_target').css({'border':'4px solid red', 'webkitTransform':'translate(-2px, -2px)'});
                            }
                            break;
                        case 'end':
                            if ((302 < movePoint.x && movePoint.x < 402) && (402 < movePoint.y && movePoint.y < 502)) {
                                $target.css({'top':'402px', 'left':'302px', 'webkitTransform':'translate(0,0)', 'border':'0'});
                                $('#test_target').css({'border':'2px solid blue', 'webkitTransform':'translate(0,0)'});
                                $target.unbind('touchy-drag', handleTouchyDrag);
                            } 
                            else {
                                $target.css({'zIndex':'5', 'webkitTransform':'translate(0px, 0px)', 'border':'0'});
                            }
                            
                            break;
                    }*/
                });
