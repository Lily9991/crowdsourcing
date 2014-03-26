
$(function(){
	
	$("#ChatButton").on("click",function(){
		
		
		  $Msg = $("#ChatValue").val();
	      $("#ChatContent").append("<Strong>Me:</Strong>"+$Msg+"<br/>"); 
	      $("#ChatValue").val("");
	      
	      var user =['Kate','Stella','Lily'];
	      $.each(user,function(key,val){
	      setTimeout(function(){
				
	    	  
	    	  $("#ChatContent").append("<Strong>"+val+":</Strong>"+"Hello! <br/>");
				
	    	  
			},1000);
		
	      });
	}); 

});

$(function(){

	setInterval(function() {
		console.log("every 30 seconds: "+$("#emotionSlider").val());
	}, 3000);
	
	detectChange($("#emotionSlider"), 2000);
	$("#emotionSlider").bind("changed", function() {
		console.log("detected change to "+$("#emotionSlider").val()+$.now());
                $.post("http://127.0.0.1:8125",{Value:$("#emotionSlider").val(), Time: $.now()});
		$("#SliderMsg").fadeIn("slow");
		//$("#SliderMsg").css("visibility","visible");
		$("#Reminder").css("visibility","hidden");
		setTimeout(function(){	
			$("#SliderMsg").fadeOut("slow");
			//$("#SliderMsg").css("visibility","hidden");
		},3000);
		setTimeout(function(){
			$("#Reminder").css("visibility","visible");
		},5000);
	});

});

function detectChange(el, timeout) { 		    
	var timer; 		    
	el.bind("change", function() { 				
		var me = $(this); 		        
		if (timer) { 		            
			clearTimeout(timer); 		        
		} 		        
		timer = setTimeout(function() { 					
			me.trigger("changed"); 				
		}, timeout); 		    
	}); 		
}

$(function(){
    $("#Reminder").animate({
        "font-size" : "+=14px"
    }, 10000);
});