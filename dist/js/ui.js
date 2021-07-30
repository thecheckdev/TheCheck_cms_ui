// 하위 브라우저 호환
document.createElement("article");
document.createElement("section");
document.createElement("aside");
document.createElement("nav");
document.createElement("header");
document.createElement("footer");
document.createElement("main");

$(function() {
	$(".ipt_date").datepicker({
		language: "ko",
	});
	$(".ipt_date.s_big").datepicker({
		language: "ko",
		classes: 'datepicker-big',
	});
} );