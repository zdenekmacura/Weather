
$(document).ready(function(){

    $("input[type=checkbox]").click(function(){
    $(this).next().next().toggle(300);
    if ($(this).is(':checked')) { $(this).next().next().next().show(300) ; } else {
    	$(this).next().next().next().hide(300) ; $(this).next().next().next().next().hide(300) ;
    }
	});
	$.get("strings.xml",{},function(xml) {
		$('string-array',xml).each(function(i) {
			var namefield = $(this).attr("name");
			$("#content").append(namefield);
			$('string-array[name="'+namefield+'"]',xml).children("item").each(function(i) {
				itemvalue = $(this).text();
				$('[id$="'+namefield+'"]').parent().next().append("<div class='Item'>"+itemvalue+"</div>");
			});
		});
		$('.Item').click(function() {
 			$("#generatedReproof").hide(300);
			$("#headingReproof").hide(300);
			$("#sendsms").hide();
			$("#sharevytka").hide();
			itemvalue = $(this).text();
			var textarea = this.parentNode.previousElementSibling.firstElementChild;
			if ($(textarea).val().length > 0 ) { del = ", ";} else { del = "";}
			$(textarea).val($(textarea).val() + del + itemvalue + " ");
			$(this).parent().hide(200);
			$(this).parent().next().show(300);
			$('.ShowExamples').click(function(){
				$(this).hide(300);
    			$(this).prev().show(300);
			});
		});
	});
	
	$("#generateReproof").click(function(){
		var vytkatext = "UDĚLENÍ OFICIÁLNÍ VÝTKY \nPane(í) ..... , uděluji vám tímto oficiální výtku za následující jednání ze dne ......, páchané na ......   ";
		$("input[type=checkbox]:checked:enabled").each(function(i) {
			var text = $(this).next().next().children(":first").val();
			vytkatext += "\n\n" + $(this).parent().parent().children(":first").text();
		    vytkatext += " - " + $(this).next().text();
		    vytkatext += " - Specifikace: " + text.trim();
	    });
	    vytkatext += "\n\n" + "Výtku zpracoval(a): .....";
		$("#generatedReproof").val(vytkatext);
		$("#headingReproof").show(300);
		$("#generatedReproof").show(300);
		$("#sendsms").show();
		$("#sharevytka").show();
	});
	$("#sendsms").click(function(){
		vytkatext = $("#generatedReproof").val();
		phonenumber = $("#phonenumber").text();
	window.plugins.socialsharing.shareViaSMS(vytkatext, phonenumber, function(msg) {console.log('ok: ' + msg)}, function(msg) {alert('error: ' + msg)})
	});
	$("#sharevytka").click(function(){
		vytkatext = $("#generatedReproof").text();
		phonenumber = $("#phonenumber").text();
		window.plugins.socialsharing.share(vytkatext);
	});
});
