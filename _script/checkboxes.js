$(document).ready(function () {

	$('#chk1').attr('data-content','Nonfiction');
	$('#chk2').attr('data-content','Fiction');
	$('#chk3').attr('data-content','Surreal');
	$('#chk4').attr('data-content','Abstraction');
	$('#chk5').attr('data-content','Soundscape');
	$('#chk6').attr('data-content','Visual Anthropology');
	$('#chk7').attr('data-content','Abandoned Places');
	$('#chk8').attr('data-content','Road Movie');
	$('#chk9').attr('data-content','Black & White');
	$('#chk10').attr('data-content','Made before 2000');

	$('.checkboxThree label').html('-');

function slider(n) {
	var cb = '#cb' + n;
	var chklabel = '#chk' + n + ' label';

	$(cb).change(function() {
		if(this.checked) { $(chklabel).html('+'); } 
		else { $(chklabel).html('-'); }
	});
	$(chklabel).hover(function() {
		if($(chklabel).text() == '-') { $(chklabel).html('hide'); }
	}, function() {
		if($(chklabel).text() == 'hide') { $(chklabel).html('-'); }
	});
}

	var Numbers = [1,2,3,4,5,6,7,8,9,10];
	Numbers.map(slider);
});

function dummy() { }