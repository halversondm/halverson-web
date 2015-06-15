$(document).ready(function(){
	$('#now').click(function(){
		var date = new Date();
		$('#dateTime').html(date.toLocaleString());
	});
	$('#save').click(function(event) {
		event.preventDefault();
		var abcChecklist = new Object();
		//checkboxes
		abcChecklist.people = processArray($('input:checkbox[name=people]:checked').get());
		abcChecklist.behavior = processArray($('input:checkbox[name=behavior]:checked').get());
		abcChecklist.consequence = processArray($('input:checkbox[name=consequence]:checked').get());
		//radios
		abcChecklist.antecedent = $("input:radio[name=antecedent]:checked").val();
		abcChecklist.location = $("input:radio[name=location]:checked").val();
		abcChecklist.duration = $("input:radio[name=duration]:checked").val();
		abcChecklist.intensity = $("input:radio[name=intensity]:checked").val();
		// text boxes
		abcChecklist.antecedentOther = $("#antecedentOther").val();
		abcChecklist.peopleOther = $("#peopleOther").val();
		abcChecklist.behaviorOther = $("#behaviorOther").val();
		abcChecklist.consequenceOther = $("#consequenceOther").val();
		//date
		abcChecklist.when = $("#dateTime").html();
		ajaxToPhp(JSON.stringify(abcChecklist));
		
	});
	
	function ajaxToPhp(dataToPost) {	
		$.ajax({
			url: 'abc.php',
			type: 'post',
			data: dataToPost,
			success: function(data, status) {
				$('#fromDatabase').html(data);
			},
			error: function(xhr, desc, err) {
				console.log(xhr);
		        console.log("Details: " + desc + "\nError:" + err);
		    }
		});
	}
	
	function processArray(array) {
		var valueArray = new Array();
		for (i = 0; i < array.length; i++) {
			valueArray[i] = array[i].value;
		}
		return valueArray;
	}
	
});