$(document).ready(function () {
	var s1lideCount = $('#s1 ul li').length;
	var s1lideWidth = $(window).width();
	var s1liderUlWidth = s1lideCount * s1lideWidth;
	$('#s1').css({ width: s1liderUlWidth, height: $(window).height() });
	$('#s1').css({ marginLeft: - s1lideWidth});
	$('#s1 ul li').css({ width: s1lideWidth });
	$('#s1 ul li:last-child').prependTo('#s1 ul');

	$( window ).resize(function() {
		s1lideWidth = $(window).width();
		s1liderUlWidth = s1lideCount * s1lideWidth;
		$('#s1').css({ width: s1liderUlWidth, height: $(window).height() });
		$('#s1').css({ marginLeft: - s1lideWidth});
		$('#s1 ul li').css({ width: s1lideWidth });
		$(".fullfoto").load(location.href + " .fullfoto");
	});

	function randomNumberFromRange(min,max) {
    		return Math.floor(Math.random()*(max-min+1)+min);
	}

	function move1left() {
		$('#s1 ul').animate({
			left: + (s1lideWidth)
		}, "slow",  function () {
			$('#s1 ul li:last-child').prependTo('#s1 ul');
 			$('#s1 ul').css('left', '');
		});
		var curr = Number(sessionStorage.getItem('doctapestorage')) - 1;
		// sessionStorage.setItem('doctapestorage', curr);

		var rand = randomNumberFromRange(1, s1lideCount - 1) + curr;
		sessionStorage.setItem('doctapestorage', rand);
	};

	function move1right() {
		$('#s1 ul').animate({
			left: - (s1lideWidth)
		}, "slow",   function () {
			$('#s1 ul li:first-child').appendTo('#s1 ul');
			$('#s1 ul').css('left', '');
		});
		var curr = Number(sessionStorage.getItem('doctapestorage')) + 1;
		//sessionStorage.setItem('doctapestorage', curr);

		var rand = randomNumberFromRange(1, 10) + curr;
		sessionStorage.setItem('doctapestorage', rand);
	};

	$('#kw1prev').click(function () { move1left(); });
	$('#kw1prev').hover(function () { $(this).toggleClass('togarrow') });
	$('#kw1next').click(function () { move1right(); });
	$('#kw1next').hover(function () {$(this).toggleClass('togarrow')  });

	$(document).keydown(function(e){
		if (e.keyCode == 37) {
			move1left();
			$('#kw1prev').toggleClass('togarrow') ;
			return false;
		}
		if (e.keyCode == 39) {
			move1right();
			$('#kw1next').toggleClass('togarrow') ;
			return false;
		}
	});
	$(document).keyup(function(e){
		if (e.keyCode == 37) {
			$('#kw1prev').toggleClass('togarrow');
			return false;
		}
		if (e.keyCode == 39) {
			$('#kw1next').toggleClass('togarrow');
			return false;
		}
	});



});
