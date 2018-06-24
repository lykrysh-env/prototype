var mytransition;

if('ontransitionend' in window) {
	mytransition = 'transitionend';
} else if('onwebkittransitionend' in window) {
	mytransition = 'webkitTransitionEnd';
} else if(navigator.appName == 'Opera') {
	mytransition = 'oTransitionEnd';
} else { // IE
	mytransition = false;
}

function opento(page) {
	window.open(page,'_blank');
}
function moveto(page) {
	window.open(page,'_self');
}
function play(page) {
	localStorage.setItem('filmname',page);
	var addr = page + '/index.html';
	window.open(addr,'_self');
}
function goup() {
	EPPZScrollTo.scrollVerticalToElementById('hi', 0);
}
function gotoid(id, offset) {
	EPPZScrollTo.scrollVerticalToElementById(id, offset);
}

function toTitle(string) { 
	var words = string.split("-");
	var output = "";
	for (i = 0 ; i < words.length; i ++){
		lowerWord = words[i].toLowerCase();
		lowerWord = lowerWord.trim();
		if (i > 0 && (lowerWord == 'of' || lowerWord == 'the' || lowerWord == 'in' || lowerWord == 'from' || lowerWord == 'with' ) ) {
			capitalizedWord = lowerWord;
		} else {
			capitalizedWord = lowerWord.slice(0,1).toUpperCase() + lowerWord.slice(1);
		}
		output += capitalizedWord;
		if (i != words.length-1){
			output+=" ";
		}
	}
	output[output.length-1] = '';
	return output;
};

var EPPZScrollTo = {
	documentVerticalScrollPosition: function() {
		if (self.pageYOffset) return self.pageYOffset;
		return 0;
	},
	viewportHeight: function() {
		return (document.compatMode === "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
	},
	documentHeight: function() {
		return (document.height !== undefined) ? document.height : document.body.offsetHeight;
	},
	documentMaximumScrollPosition: function() {
		return this.documentHeight() - this.viewportHeight();
	},
	elementVerticalClientPositionById: function(id) {
		var element = document.getElementById(id);
		var rectangle = element.getBoundingClientRect();
		return rectangle.top;
	},
	scrollVerticalTickToPosition: function(currentPosition, targetPosition) {
		var filter = 0.2;
		var fps = 60;
		var difference = parseFloat(targetPosition) - parseFloat(currentPosition);
		var arrived = (Math.abs(difference) <= 0.5);
		if (arrived) {
			scrollTo(0.0, targetPosition);
			return;
		}
		currentPosition = (parseFloat(currentPosition) * (1.0 - filter)) + (parseFloat(targetPosition) * filter);
		scrollTo(0.0, Math.round(currentPosition));
		setTimeout("EPPZScrollTo.scrollVerticalTickToPosition("+currentPosition+", "+targetPosition+")", (1000 / fps));
	},
	scrollVerticalToElementById: function(id, padding) {
		var element = document.getElementById(id);
		if (element == null) {
			console.warn('Cannot find element with id \''+id+'\'.');
			return;
		}
		var targetPosition = this.documentVerticalScrollPosition() + this.elementVerticalClientPositionById(id) - padding;
		var currentPosition = this.documentVerticalScrollPosition();
		var maximumScrollPosition = this.documentMaximumScrollPosition();
		if (targetPosition > maximumScrollPosition) targetPosition = maximumScrollPosition;
		this.scrollVerticalTickToPosition(currentPosition, targetPosition);
	}
}

$(document).ready(function() {
	$('.tooltip').click(function() {
		if ($('.belowpink').is(':visible')) { 
			$('.abovepink').css('background', '#ff3333');
			$('.belowpink').hide();
			setTimeout(function(){
				$('.abovepink .tooltip .tooltiptext').html('show filters');
			}, 1000);
		} else {
			$('.abovepink').css('background', '#ff4d4d');
			$('.belowpink').show();
			setTimeout(function(){
				$('.abovepink .tooltip .tooltiptext').html('hide filters');
			}, 1000);

		}
	});
}); 

$(window).scroll(function() {
	var scrollTop = $(document).scrollTop();
	//var elementHeight = $('#heredown').position().top;
	var elementHeight = $('.fillwindow').height();
	var startheight = $('#hi').position().top;
	var flexibleHeight = elementHeight + startheight;
	var topopacity = ((1 - (flexibleHeight-scrollTop) / flexibleHeight ) * 1.2 ) + 0.0;
	$('.whitebox').css({ opacity: topopacity });

	var browserHeight = flexibleHeight - 100;
	var bottomopacity = (((browserHeight-scrollTop) / browserHeight ) * 1.2) - 0.0;
	$('.explore').css({ opacity: bottomopacity });
	
});