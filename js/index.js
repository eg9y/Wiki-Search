$(document).ready(function(){
  
 $("#button").click(function(){  
	 
	 $('body').attr('style', "background-size: default");
	
	 
   //Get user input
   var term = $("#userSearch").val();

    //Open Search action for wiki API
    var link = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + term +"&format=json&callback=?";
	 	 
   
    //API call
    $.ajax({
      type:"GET",
      url:link,
      async:false,
      dataType:"json",
      success: function(array){
				if(term !== ""){
        $("#results").html("Results for: " + term);
				
				var desCount = 0;
			  var greyscale = "greyscale";
			  // var animation = "animated fadeInDown";
				var descID = "description";
				var newTab = "_blank";
				
				//reset search if user searches again
				$("#choices").html("");
				
				//Search results. Title and description
				 array[1].forEach(function(val){
					 if(term.toUpperCase() !==  val.toUpperCase()){ //Prevent "term refers to", it's redundant
          $("#choices").append(
						'<a href='+array[3][desCount]+' target =' +newTab+ '><p class='+greyscale+'><b>' + val + '</b></p></a>'					 
						+'<p id='+descID+'>' +array[2][desCount++] + '</p><br/>'); //end append Title
				 }
					 else desCount++;
        });//end foreach
					
					$("#userSearch").val('');
				}
      },
      error: function(error){
        alert("ERROR");
      }
    }); //end ajax   
  });  //end button click
	
	//Allow user to search using Enter/Return (ascii value is 13)
	$("#userSearch").keypress(function(key){
		 if(key.which === 13){
			 $("#button").click();
		 }
	 });
});