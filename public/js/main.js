function deleteThis(div, id)
{
	var jqxhr = $.get( "calls.php?a=delete&id=" + id, function() {
		$(div).fadeOut();
	})
	.fail(function() {
		alert( "error deleting track" );
	});
}