var head = document.getElementById("head")
var foot = document.getElementById("foot")

var position = $(window).scrollTop()

$.fn.scrollBottom = function() { 
  return $(document).height() - this.scrollTop() - this.height() 
}

function doWhenScroll() {
	// Display the head and foot when at the top of the page, at the bottom of the page,
	// or scrolling up
	if ($(window).scrollTop() < 50 | $(window).scrollBottom() == 0 | position > $(window).scrollTop()) {
		showHeadAndFoot()
	} else {
		hideHeadAndFoot()
	}
	position = $(window).scrollTop()
}

function showHeadAndFoot() {
	$(head).show()
	$(foot).show()
}

function hideHeadAndFoot() {
	$(head).hide()
	$(foot).hide()
}

// jquery version of {window.onscroll = doWhenScroll}
$(window).scroll(doWhenScroll)
