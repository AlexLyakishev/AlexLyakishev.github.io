/*
PROGRAMMER: Frederick Wachter
DATE CREATED: 2016-04-13
PURPOSE: Engineering Portfolio of Frederick Wachter
CONTACT INFO: wachterfreddy@gmail.com
*/

/* -------------------- ---------------------- -------------------- */
/* -------------------- User Defined Variables -------------------- */
/* -------------------- ---------------------- -------------------- */
var pageNames = ["Home", "Projects", "Work Experience"];

/* -------------------- ---------------- -------------------- */
/* -------------------- Static Variables -------------------- */
/* -------------------- ---------------- -------------------- */
var pageIndex = 0; // indicated the current page of the user
var totalPages = $(".footerButton").length; // indicates the amount of available pages on the webpage
var sidebarDisplayFlag = 1; // indicates if the sidebar should be displayed
var pageTwoScrollFlag = 0; // indicates if the scrollbar is active on the second page
var resumeButtonDisplayFlag = 1; // indicates if the sidebar should be displayed
var sidebarDisplayTolerance = 30; // tolerance to decide to display sidebar or not

var platformIndexAdjust = $("#contentPage1").children().length - $(".platform").length - 1; // Adjustment to platform index
var jobIndexAdjust = $("#contentPage2").children().length - $(".job").length - 1; // Adjustment to job index
var projectIndexAdjust = $("#contentPage3").children().length - $(".project").length - 1; // Adjustment to project index

/* -------------------- ------------- -------------------- */
/* -------------------- Window Resize -------------------- */
/* -------------------- ------------- -------------------- */
windowResize();

$(window).resize(function() {windowResize();});
function windowResize() {
	var windowWidth  = $(window).width();
	var windowHeight = $(window).height();

	$("#intro").css({
		"height":windowHeight + "px"
	});
	$(".page").css({
		"width":windowWidth + "px",
		"height":windowHeight + "px"
	});
	$("#logo").css({
		"top":(windowHeight / 2) + "px",
		"left":(windowWidth / 2) + "px" 
	});

	if ((resumeButtonDisplayFlag) && (windowWidth < 875)) {
		$("#resumeButton").addClass("hidden");
		resumeButtonDisplayFlag = 0;
	} else if ((!resumeButtonDisplayFlag) && windowWidth >= 875) { 
		$("#resumeButton").removeClass("hidden");
		resumeButtonDisplayFlag = 1;	
	}

	if ((windowHeight < 800) && (pageTwoScrollFlag == 0)) {
		$("#tint1").addClass("scroll");
		pageTwoScrollFlag = 1;
	} else if ((windowHeight > 800) && (pageTwoScrollFlag == 1)) {
		$("#tint1").removeClass("scroll");
		pageTwoScrollFlag = 0;
	}

	var lastJob = $(".job").eq($(".job").length-1);
	var jobBottomPosition = lastJob.offset().top + lastJob.height();
	if ((windowHeight - jobBottomPosition - 200) < 0) {
		$("#page2").addClass("scroll");
	}

	// use windowHeight for vertical offset
	offsetPages(pageIndex, windowHeight);
	setIconLocation(null,pageIndex,1);
	adjustVideoSize_Page1(windowWidth);
}

/* -------------------- -------- -------------------- */
/* -------------------- Function -------------------- */
/* -------------------- -------- -------------------- */
function offsetPages(index, windowHeight) {
	var offset = (-index) * windowHeight;
	for (var i = 0; i < totalPages; i++) {
		$(".page").eq(i).css({
			"top": offset + (windowHeight * i) + "px"
		});
	}
}
function setIconLocation(previousIndex,currentIndex,windowResize) {
	var windowHeight = $(window).height();
	if ((windowResize == 1) && (currentIndex > 0)) {
		$("#logo").css({
			"top":windowHeight - 15 + "px"
		});
	} else if ((previousIndex == 0) && (pageIndex > 0)) {
		$("#logo").css({
			"box-shadow":"none",
			"margin-top":"-75px",
			"margin-left":"0px",
			"top":windowHeight - 15 + "px",
			"background-color":"rgba(0,0,0,0)"
		});
		$("#mainLogo").css({
			"width":"80px"
		});
	} else if ((previousIndex > 0) && (pageIndex == 0)) {
		$("#logo").css({
			"top":(windowHeight / 2) + "px",
			"box-shadow":"",
			"margin-top":"",
			"margin-left":"",
			"background-color":""
		});
		$("#mainLogo").css({
			"width":""
		});
	}
}
function toggleActivePage(previousIndex,currentIndex) {
	$(".footerButton").eq(previousIndex).removeClass("active");
	$(".footerButton").eq(previousIndex).addClass("notActive");
	$(".footerButton").eq(previousIndex).addClass("icon");

	$(".footerButton").eq(currentIndex).addClass("active");
	$(".footerButton").eq(currentIndex).removeClass("notActive");
	$(".footerButton").eq(currentIndex).removeClass("icon");

	setIconLocation(previousIndex,currentIndex,0);
}
function adjustVideoSize_Page1(windowWidth) {
	if (windowWidth <= 1000) {
		$(".video").css({
			"height":((windowWidth / 2) / 1.333) + "px"
		});
		$("#videoSpacer").css({
			"height":((windowWidth / 2) / 1.333) + "px"
		});
		$("#showVideo").css({
			"border-radius":"0px"
		});
	} else {
		$(".video").css({
			"height":"375px"
		});
		$("#videoSpacer").css({
			"height":"375px"
		});
		$("#showVideo").css({
			"border-radius":"0px 0px 5px 5px"
		});
	}
}
function toggleSidebarDisplay() {
	if (sidebarDisplayFlag == 0) {
		$("#sidebar").css({
			"right":"-64px"
		});
	} else if (sidebarDisplayFlag == 1) {
		$("#sidebar").css({
			"right":""
		});
	} else {
		alert("Error (3): Flag was set to incorrect value.");
	}
}
function displayPageName(index) {
	var pageName;
	pageName = pageNames[index];
	$("#footerText").text(pageName);
}

/* -------------------- --------------- -------------------- */
/* -------------------- Click Functions -------------------- */
/* -------------------- --------------- -------------------- */
$(".footerButton").click(function() {
	var windowHeight = $(window).height();
	var previousIndex = pageIndex;
	pageIndex = $(this).index();

	if (previousIndex != pageIndex) {
		offsetPages(pageIndex, windowHeight);
		toggleActivePage(previousIndex,pageIndex);

		if (pageIndex != 0) {
			$("#introText").css({
				"opacity":"0"
			});
		} else if (pageIndex == 0) {
			$("#introText").css({
				"opacity":"1"
			});
		} else {
			alert("Error (1): Current page index is incorrect.");
		}
	}

	displayPageName(pageIndex);
});

/* -------------------- --------------- -------------------- */
/* -------------------- Hover Functions -------------------- */
/* -------------------- --------------- -------------------- */
$(".footerButton").hover(
	function() {
		displayPageName($(this).index());
	}, function() {
		displayPageName(pageIndex);
	}
);
$(".platform").hover(
	function() {
		var windowWidth = $(window).width();
		var sidebarWidth = $("#sidebar").width();
		var platformPosition = $(this).position().left + $(this).width();

		if (platformPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
			sidebarDisplayFlag = 0;
			toggleSidebarDisplay();
		}

		var platformIndex = $(this).index() - platformIndexAdjust;
		$(".background").eq(platformIndex).css({
			"opacity":"0.2"
		});
		$(".platformDescription").eq(platformIndex).css({
			"opacity":"1"
		});
	}, function() {
		if (sidebarDisplayFlag == 0) {
			sidebarDisplayFlag = 1;
			toggleSidebarDisplay();
		}

		var platformIndex = $(this).index() - platformIndexAdjust;
		$(".background").eq(platformIndex).css({
			"opacity":""
		});
		$(".platformDescription").eq(platformIndex).css({
			"opacity":""
		});
	}
);
$(".job").hover(
	function() {
		var windowWidth = $(window).width();
		var sidebarWidth = $("#sidebar").width();
		var jobPosition = $(this).position().left + $(this).width();

		if (jobPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
			sidebarDisplayFlag = 0;
			toggleSidebarDisplay();
		}

		var jobIndex = $(this).index() - jobIndexAdjust;
		$(".background").eq(jobIndex + $(".platform").length).css({
			"opacity":"0.2"
		});
		$(".jobDescription").eq(jobIndex).css({
			"opacity":"1"
		});
	}, function() {
		if (sidebarDisplayFlag == 0) {
			sidebarDisplayFlag = 1;
			toggleSidebarDisplay();
		}

		var jobIndex = $(this).index() - jobIndexAdjust;
		$(".background").eq(jobIndex + $(".platform").length).css({
			"opacity":""
		});
		$(".jobDescription").eq(jobIndex).css({
			"opacity":""
		});
	}
);
$(".project").hover(
	function() {
		var windowWidth = $(window).width();
		var sidebarWidth = $("#sidebar").width();
		var projectPosition = $(this).position().left + $(this).width();

		if (projectPosition > (windowWidth - sidebarWidth - sidebarDisplayTolerance)) {
			sidebarDisplayFlag = 0;
			toggleSidebarDisplay();
		}

		var projectIndex = $(this).index() - projectIndexAdjust;
		$(".background").eq(projectIndex + $(".platform").length + $(".job").length).css({
			"opacity":"0.2"
		});
		$(".projectDescription").eq(projectIndex).css({
			"opacity":"1"
		});
	}, function() {
		if (sidebarDisplayFlag == 0) {
			sidebarDisplayFlag = 1;
			toggleSidebarDisplay();
		}

		var projectIndex = $(this).index() - projectIndexAdjust;
		$(".background").eq(projectIndex + $(".platform").length + $(".job").length).css({
			"opacity":""
		});
		$(".projectDescription").eq(projectIndex).css({
			"opacity":""
		});
	}
);

/* -------------------- ---------------- -------------------- */
/* -------------------- Contact Form Submission -------------------- */
/* -------------------- ----------------------- -------------------- */
$("#contentPage3").submit(function(e) {
	e.preventDefault();
	$.ajax({
	    url: "https://formspree.io/f/xyzyyeje", 
	    method: "POST",
	    data: {name: $("#userName").val(), _replyto: $("#userEmail").val(), message: $("#userMessage").val()},
	    dataType: "json"
	});

	setTimeout(function() {
		clearForm();
	}, 1000);
});

function clearForm() {
	var elems = document.getElementsByTagName("input");
	var l = elems.length - 1;
	for (var i = 0; i < l; ++i) {
		elems[i].value = "";
	}
	$("textarea").val("");

	alert("Contact request sent.");
}

/* -------------------- --------------- -------------------- */
/* -------------------- Google Tracking -------------------- */
/* -------------------- --------------- -------------------- */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-69516450-3', 'auto');
ga('send', 'pageview');

/* -------------------- ---------------- -------------------- */
/* -------------------- Scrolling / Touch Handling  -------------------- */
/* -------------------- ---------------- -------------------- */
var scrollLock = false;            // prevent rapid repeated page changes
var scrollDelay = 800;             // ms delay between page changes (match visual transition)
var touchStartY = null;
var touchThreshold = 50;           // px required to consider a swipe

// track scrollable element touched (if any)
var touchScrollableAncestor = null;

// helper: find nearest ancestor (including self) that is vertically scrollable
function findScrollableAncestor(el) {
	while (el && el !== document.body && el !== document.documentElement) {
		if (el.nodeType === 1) {
			var style = window.getComputedStyle(el);
			var overflowY = style.overflowY;
			// treat explicit scroll/auto or elements using .scroll class as scrollable
			if ((overflowY === 'auto' || overflowY === 'scroll' || el.classList.contains('scroll')) && el.scrollHeight > el.clientHeight) {
				return el;
			}
		}
		el = el.parentElement;
	}
	// removed fallback to document.scrollingElement to avoid false positives
	return null;
}

// helper: check if element can scroll further in a given direction
// direction > 0 => scroll down (content moves up), direction < 0 => scroll up
function canScroll(el, direction) {
	if (!el) return false;
	if (direction > 0) {
		// can scroll down if not at bottom
		return el.scrollTop + el.clientHeight < el.scrollHeight - 1;
	} else if (direction < 0) {
		// can scroll up if not at top
		return el.scrollTop > 1;
	}
	return false;
}

function changePage(newIndex) {
	if (newIndex < 0) newIndex = 0;
	if (newIndex >= totalPages) newIndex = totalPages - 1;
	if (newIndex === pageIndex) return;

	var previousIndex = pageIndex;
	pageIndex = newIndex;

	var windowHeight = $(window).height();
	offsetPages(pageIndex, windowHeight);
	toggleActivePage(previousIndex, pageIndex);

	if (pageIndex !== 0) {
		$("#introText").css({"opacity":"0"});
	} else {
		$("#introText").css({"opacity":"1"});
	}

	displayPageName(pageIndex);
}

/* wheel handling — use non-passive listener to allow preventDefault
   Allow native scrolling when the wheel event occurs on a scrollable ancestor
   that can still scroll in the wheel direction. Otherwise treat as page change. */
window.addEventListener('wheel', function(e) {
	var delta = e.deltaY;
	if (Math.abs(delta) < 5) return;

	// find nearest scrollable element from the event target
	var target = e.target;
	var scrollable = findScrollableAncestor(target);

	// if scrollable exists and it can scroll in delta direction, allow native scroll
	if (scrollable && canScroll(scrollable, delta)) {
		// do not interfere with native scrolling
		return;
	}

	// otherwise intercept and navigate pages
	if (scrollLock) { e.preventDefault(); return; }
	e.preventDefault();

	scrollLock = true;
	if (delta > 0) {
		changePage(pageIndex + 1);
	} else {
		changePage(pageIndex - 1);
	}
	setTimeout(function(){ scrollLock = false; }, scrollDelay);
}, {passive: false});

/* touch handling for mobile / touch screens
   Record scrollable ancestor on touchstart. On touchend, if the scrollable
   ancestor can still scroll further in swipe direction, let native scroll (do nothing).
   Otherwise perform page change. */
window.addEventListener('touchstart', function(e) {
	if (e.touches && e.touches.length) {
		touchStartY = e.touches[0].clientY;
		// store nearest scrollable ancestor at the start of the gesture
		touchScrollableAncestor = findScrollableAncestor(e.target);
	}
}, {passive: true});

window.addEventListener('touchend', function(e) {
	if (touchStartY === null) return;
	var touchEndY = (e.changedTouches && e.changedTouches.length) ? e.changedTouches[0].clientY : null;
	if (touchEndY === null) { touchStartY = null; touchScrollableAncestor = null; return; }

	var delta = touchStartY - touchEndY;
	touchStartY = null;

	if (Math.abs(delta) < touchThreshold) { touchScrollableAncestor = null; return; }

	// if we started inside a scrollable element and it can scroll in the swipe direction,
	// let native scrolling handle it (no page change).
	if (touchScrollableAncestor) {
		// Re-check ability to scroll in that direction at touchend (native scroll may have moved)
		if (canScroll(touchScrollableAncestor, delta)) {
			touchScrollableAncestor = null;
			return;
		}
	}

	if (scrollLock) { touchScrollableAncestor = null; return; }

	scrollLock = true;
	if (delta > 0) {
		changePage(pageIndex + 1);
	} else {
		changePage(pageIndex - 1);
	}
	touchScrollableAncestor = null;
	setTimeout(function(){ scrollLock = false; }, scrollDelay);
}, {passive: true});

/* keyboard navigation (up/down arrows, PageUp/PageDown, Home/End) */
$(document).on('keydown', function(e) {
	// when user types into form inputs we should not intercept - ignore if focus is in an input or textarea
	var tag = (document.activeElement && document.activeElement.tagName) ? document.activeElement.tagName.toLowerCase() : null;
	if (tag === 'input' || tag === 'textarea') return;

	if (scrollLock) return;

	if (e.key === "ArrowDown" || e.key === "PageDown") {
		scrollLock = true;
		changePage(pageIndex + 1);
		setTimeout(function(){ scrollLock = false; }, scrollDelay);
		e.preventDefault();
	} else if (e.key === "ArrowUp" || e.key === "PageUp") {
		scrollLock = true;
		changePage(pageIndex - 1);
		setTimeout(function(){ scrollLock = false; }, scrollDelay);
		e.preventDefault();
	} else if (e.key === "Home") {
		scrollLock = true;
		changePage(0);
		setTimeout(function(){ scrollLock = false; }, scrollDelay);
		e.preventDefault();
	} else if (e.key === "End") {
		scrollLock = true;
		changePage(totalPages - 1);
		setTimeout(function(){ scrollLock = false; }, scrollDelay);
		e.preventDefault();
	}
});
