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
	$('#chk0').attr('data-content','Made before 2000');

	$('.checkboxThree label').html('-');

	$("#cb1").change(function() {
		if(this.checked) { $('#chk1 label').html('+'); } 
		else { $('#chk1 label').html('-'); }
	});
	$('#chk1 label').hover(function() {
		if($('#chk1 label').text() == '-') { $('#chk1 label').html('hide'); }
	}, function() {
		if($('#chk1 label').text() == 'hide') { $('#chk1 label').html('-'); }
	});

	$("#cb2").change(function() {
		if(this.checked) { $('#chk2 label').html('+'); } 
		else { $('#chk2 label').html('-'); }
	});
	$('#chk2 label').hover(function() {
		if($('#chk2 label').text() == '-') { $('#chk2 label').html('hide'); }
	}, function() {
		if($('#chk2 label').text() == 'hide') { $('#chk2 label').html('-'); }
	});

	$("#cb3").change(function() {
		if(this.checked) { $('#chk3 label').html('+'); } 
		else { $('#chk3 label').html('-'); }
	});
	$('#chk3 label').hover(function() {
		if($('#chk3 label').text() == '-') { $('#chk3 label').html('hide'); }
	}, function() {
		if($('#chk3 label').text() == 'hide') { $('#chk3 label').html('-'); }
	});

	$("#cb4").change(function() {
		if(this.checked) { $('#chk4 label').html('+'); } 
		else { $('#chk4 label').html('-'); }
	});
	$('#chk4 label').hover(function() {
		if($('#chk4 label').text() == '-') { $('#chk4 label').html('hide'); }
	}, function() {
		if($('#chk4 label').text() == 'hide') { $('#chk4 label').html('-'); }
	});

	$("#cb5").change(function() {
		if(this.checked) { $('#chk5 label').html('+'); } 
		else { $('#chk5 label').html('-'); }
	});
	$('#chk5 label').hover(function() {
		if($('#chk5 label').text() == '-') { $('#chk5 label').html('hide'); }
	}, function() {
		if($('#chk5 label').text() == 'hide') { $('#chk5 label').html('-'); }
	});

	$("#cb6").change(function() {
		if(this.checked) { $('#chk6 label').html('+'); } 
		else { $('#chk6 label').html('-'); }
	});
	$('#chk6 label').hover(function() {
		if($('#chk6 label').text() == '-') { $('#chk6 label').html('hide'); }
	}, function() {
		if($('#chk6 label').text() == 'hide') { $('#chk6 label').html('-'); }
	});

	$("#cb7").change(function() {
		if(this.checked) { $('#chk7 label').html('+'); } 
		else { $('#chk7 label').html('-'); }
	});
	$('#chk7 label').hover(function() {
		if($('#chk7 label').text() == '-') { $('#chk7 label').html('hide'); }
	}, function() {
		if($('#chk7 label').text() == 'hide') { $('#chk7 label').html('-'); }
	});

	$("#cb8").change(function() {
		if(this.checked) { $('#chk8 label').html('+'); } 
		else { $('#chk8 label').html('-'); }
	});
	$('#chk8 label').hover(function() {
		if($('#chk8 label').text() == '-') { $('#chk8 label').html('hide'); }
	}, function() {
		if($('#chk8 label').text() == 'hide') { $('#chk8 label').html('-'); }
	});

	$("#cb9").change(function() {
		if(this.checked) { $('#chk9 label').html('+'); } 
		else { $('#chk9 label').html('-'); }
	});
	$('#chk9 label').hover(function() {
		if($('#chk9 label').text() == '-') { $('#chk9 label').html('hide'); }
	}, function() {
		if($('#chk9 label').text() == 'hide') { $('#chk9 label').html('-'); }
	});

	$("#cb0").change(function() {
		if(this.checked) { $('#chk0 label').html('+'); } 
		else { $('#chk0 label').html('-'); }
	});
	$('#chk0 label').hover(function() {
		if($('#chk0 label').text() == '-') { $('#chk0 label').html('hide'); }
	}, function() {
		if($('#chk0 label').text() == 'hide') { $('#chk0 label').html('-'); }
	});
});

function dummy() { }