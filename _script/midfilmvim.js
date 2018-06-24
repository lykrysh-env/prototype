
function launchfullscreen(element) {
	if(element.requestFullscreen) { element.requestFullscreen();}
	else if(element.webkitRequestFullscreen) { element.webkitRequestFullscreen();}
	else if(element.mozRequestFullScreen) { element.mozRequestFullScreen(); }
}

function fullscreen() {
	launchfullscreen(document.getElementById("blackcontent"));
}

function exitfullscreen() {
	if(document.exitFullscreen) { document.exitFullscreen(); }
	else if(document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
	else if(document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
}

$(document).ready(function() {

	var vid = $('#vid').text();
	var vopt = { id: vid, 
		loop:0,
		autoplay:0,
		byline:!1,
		portrait:!1,
		title:!1,
		speed:!0,
		transparent:0
	};
	var player;
	var mydur;
	var s = !1;

	player = new Vimeo.Player('longvideo', vopt);
    	player.ready().then(function() {
    	//player.loadVideo(vid).then(function() {
		$('#play1').fadeIn(); 
		$('#backduct').fadeOut(1000);
	//});
	});
	player.play().then(function() {
		player.pause().then(function() {
			player.setCurrentTime(0);
		});
	});

	player.getDuration().then(function(duration) {
		mydur = duration;
		var t = gettm(mydur); 
		$("#final-timer-number").text(t);
	});

	function gettm(t){
		var e=parseInt(t,10),n=Math.floor(e/3600),a=Math.floor((e-3600*n)/60),i=e-3600*n-60*a;
		return n<10&&(n="0"+n),a<10&&(a="0"+a),i<10&&(i="0"+i),"00"==n ? a+" m "+i+" s" : n+" h"+a+" m "+i+" s"
	}
	function getbar(t,e){
		var n = 100*t/e, a = -1 == (a = gettm(t)).indexOf("m") ? "00m"+a : a;
		$("#current-time-bar").css("width",n+"%");
		$("#current-timer-number").text(a);
	}
	function getbuff(t,e){
		var n = 100*t/e;
		$("#buffer-bar").css("width",n+"%");
	}

	player.on('timeupdate', function(data) {
		getbar(data.seconds, mydur);
	});
	player.on('seeked', function(data) {
		getbar(data.seconds, mydur);
	});
	player.on('progress', function(data) {
		getbuff(data.seconds, mydur);
	});
	player.on('ended', function(data) {
		$("#current-timer-number").text('ended');
		$('.belowmvmask').css('display','block');
		$('.mvmask').css('display','block');
		$('.xblk').fadeIn();
		$('.mvmask #playagain #watchagain').css("display", "block");
		$('#movietoggle').attr("class", "playmovie");
	});

	function mvloaded() {
		$('.movieplayer').css('display', 'block');
		$(".locatepreloader").fadeOut();
		$('.pausemask').css('display', 'block');
	}

	function unloadmv() {
		$('.mvmask').css("display", "none");
		$('#movietoggle').attr("class", "pausemovie");
	}

	$(window).on('beforeunload', function(){
		player.unload();
	});

	$('.watchcreditbutton').click(function() {
		$(this).off('mouseout'); 
		$('#blackbar').css('display','block'); 
		$(".locatepreloader").fadeIn();
		$('.mvmask #playagain #watchagain').css("display", "none");
		player.play().then(function() { mvloaded(); $(".xblk").fadeIn(); }); 
		
	}).mouseover(function() {
		$('#fakebar').css("height", "60px");
	}).mouseout(function() {
		$('#fakebar').css("height", "0px");
	});

	function now(t){
		player.getDuration().then(function(duration) {
			var e = $("#progress-bar"), n = e.width(), a=duration,r=100*(t-e.offset().left)/n, r=Math.max(0,r), r=Math.min(r,100);
			$("#current-time-bar").css("width",r+"%");
			player.setCurrentTime(a*r/100);
		});
	}

	$("#progress-bar").on("mousedown",function(t){
		var e = t.pageX;
		s = !0, now(e);
	}),$(document).on("mouseup",function(t){
		if(s){
			var e = t.pageX;
			s = !1, now(e);
		}
	}).on("mousemove",function(t){
			s && n(t.pageX);
	});

	$( ".xblk" ).click(function() {
		$("#blackbar").css("display", "none");
		player.getPaused().then(function(paused) {
			if(paused){
			}else{
				player.pause().then(function() {
					player.setCurrentTime(0);
				});
			}
		});
		unloadmv();
		$(this).fadeOut();
		$(".belowmvmask").css("display", "none");
		$(".mvmask").css("display", "none");
		$(".pausemask").css("display", "none");
		$("#fakebar").css("height", "0px");
		$('.watchcreditbutton').on('mouseout', function() {
			$("#fakebar").css("height", "0px");
		});
		getbar(0, mydur); getbuff(0, mydur);
	});

	$('.mvmask #playagain').click(function() {
			player.play();		
			$('#movietoggle').attr("class", "pausemovie");
			$('.mvmask').fadeOut();
			$('.pausemask').css('display', 'block');
			$('.mvmask #playagain #watchagain').css("display", "none");
			if ( $('.belowmvmask').is(':visible')) { $('.belowmvmask').fadeOut(1500); }
	});
	$('.pausemask').click(function() {
			player.pause();
			$('#movietoggle').attr("class", "playmovie");
			$('.pausemask').css('display', 'none');
			$('.mvmask').fadeIn();

			var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
			var event = state ? 'FullscreenOn' : 'FullscreenOff';
	    		if (event == 'FullscreenOff') { $('.xblk').fadeIn(); }
	});
	$('#movietoggle').bind("click", function() {
		player.getPaused().then(function(paused) {
			if(paused){
				player.play();
				$('#movietoggle').attr("class", "pausemovie");
				$('.mvmask').fadeOut();
				$('.pausemask').css('display', 'block');
			}else{
				player.pause();
				$('#movietoggle').attr("class", "playmovie");
				$('.pausemask').css('display', 'none');
				$('.mvmask').fadeIn();

				var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
				var event = state ? 'FullscreenOn' : 'FullscreenOff';
	    			if (event == 'FullscreenOff') { $('.xblk').fadeIn(); }
			}
		});
	});
	$("#player-btn-mute").on("click",function(){
		var wdt = $("#player-current-volume").width() / $("#player-volume-bar").width() ;
		if (! $('#player-current-volume').is(':visible') ) {
			$('#player-current-volume').css("display", "block");
			$('#player-btn-mute').css("opacity", "1.0");
			player.setVolume(wdt);		
		}
		else {
			$('#player-current-volume').css("display", "none");
			$('#player-btn-mute').css("opacity", "0.2");
			player.setVolume(0.0);		
		}
	}),
	$("#player-volume-bar").on("mousedown touchstart",function(t){
		var e=$(this),
		n=100*(t.pageX-e.offset().left)/e.width();
		$("#player-current-volume").css("width",n+"%");
		if (n > 0 && ! $("#player-current-volume").is(':visible') ) {
			$('#player-current-volume').css("display", "block");
			$('#player-btn-mute').css("opacity", "1.0");
		}
		player.setVolume(n/100);
	});
	$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(){
		var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		var event = state ? 'FullscreenOn' : 'FullscreenOff';
	    	if (event == 'FullscreenOff') {
			$('.movieplayer').css("display", "block");
			$('#fullbuttoggle').attr("class", "fullbut");
		} else {
			if ( $('.mvmask').is(':visible')) { $('.xblk').css('display','block');}
		}
	});
	$('#fullbuttoggle').bind("click", function() {
		var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		var event = state ? 'FullscreenOn' : 'FullscreenOff';
		if (event === 'FullscreenOff'){
			//bar.css("transition", "none");
			fullscreen();
			$(this).attr("class", "unfullbut");
		}
		else {
			exitfullscreen();
			$(this).attr("class", "fullbut");
			if ( $('.mvmask').is(':visible')) { $('.xblk').css('display','block');}
		}
	});

	$(document).mousemove(function(e){
		diff = $('#placeformoviename').offset().top - e.pageY ;
		if (diff > -80 && diff < 0) {
			if ( ! $('.mvmask').is(':visible')) {
				var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
				var event = state ? 'FullscreenOn' : 'FullscreenOff';
				if (event === 'FullscreenOff'){
					$('.xblk').css('display','block');
				}
			}
		} else {
			if ( ! $('.mvmask').is(':visible')) {
				$('.xblk').fadeOut(1500);
			}
			if ($('#placeformoviename').height()  + diff > 90) {
				$('.movieplayer').fadeOut(1500);
			}
			else {
				$('.movieplayer').css('display','block');
			}
		} 
	}); 
	$(".watchitblackbottom").on("contextmenu",function(e){
		return false;
	});
	$('.watchitblackbottom').bind('cut copy paste', function (e) {
		e.preventDefault();
	}); 

	$(window).on('mouseleave', function(event) {
		if ( $('.movieplayer').is(':visible')) {
			$('.movieplayer').css('display','none');
		}
	});
});



var bigbg = "url(../_images/live/" + localStorage.getItem('filmname') + ".png)";
document.getElementById("bicpic").style.backgroundImage = bigbg;

var ttl = toTitle(localStorage.getItem('filmname'));
document.getElementById("filmtitle").innerHTML = ttl;
document.getElementById("filmtitletop").innerHTML = ttl;