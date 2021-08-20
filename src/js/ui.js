// 하위 브라우저 호환
document.createElement("article");
document.createElement("section");
document.createElement("aside");
document.createElement("nav");
document.createElement("header");
document.createElement("footer");
document.createElement("main");
let scrollTop = 0;
document.addEventListener("DOMContentLoaded", () => {
	//달력
	// $(".ipt_date").datepicker({
	// 	language: "ko",
	// });
	// $(".ipt_date.big_calendar").datepicker({
	// 	language: "ko",
	// 	classes: 'datepicker-big',
	// });
	// $(".ipt_date").focusout(function(e){
	// 	e.preventDefault();
	// 	$(this).val($.trim($(this).val()));
	// });
	const body = document.getElementsByTagName("body")[0];
	body.classList.remove("no_scroll");

	//셀랙트 박스 세팅
	const slct = document.getElementsByClassName("slct");

	[].forEach.call(slct, item => {
		const tit = item.getElementsByClassName("slct_tit")[0];
		const select = item.getElementsByClassName("slct_cont")[0].getElementsByClassName("select")[0];
		const li = item.getElementsByClassName("slct_cont")[0].getElementsByTagName("li");

		if (fnTrim(tit.innerText) === "") tit.innerText = select.innerHTML;
		
		//클릭 이벤트
		tit.addEventListener("click", () => {
			if (item.classList.contains("on") === true) {
				item.classList.remove("on");
			} else {
				fnRemoveAllClass(slct, "on");
				item.classList.add("on");
			}
		});
		
		//셀렉트 요소 클릭
		[].forEach.call(li, temp => {
			temp.addEventListener("click", () => {
				fnRemoveAllClass(li, "select");
				tit.innerText = temp.innerText;
				temp.classList.add("select");
				item.classList.remove("on");
			});
		});
	});
	document.addEventListener("click", e => {
		const target = e.target.className !== "" ? slct[0].querySelector("." + e.target.className) : null;
		if (target === null) fnRemoveAllClass(slct, "on");
	});
	//메뉴
	const btn_menu = document.getElementsByClassName("btn_menu")[0];
	const wrap_gnb = document.getElementsByClassName("wrap_gnb")[0];
	const btn_close = wrap_gnb.querySelectorAll(".btn_close")[0];
	const menu = wrap_gnb.getElementsByClassName("menu");
	btn_menu.addEventListener("click", e => {
		wrap_gnb.classList.add("show");
	});
	btn_close.addEventListener("click", () => wrap_gnb.classList.remove("show"));

	[].forEach.call(menu, item => {
		item.addEventListener("click", () => {
			if (item.classList.contains("on") === true) item.classList.remove("on");
			else {
				fnRemoveAllClass(menu, "on");
				if (item.parentNode.querySelectorAll("ul")[0] === undefined) return;
				item.classList.add("on");
			}
			
		});
	});
	//테이블 셀 크기 세팅
	const wrap_tbl = document.getElementsByClassName("wrap_tbl");
	[].forEach.call(wrap_tbl, item => {
		const tbody = item.querySelector(".tbody .tbl");
		const colgroup = item.querySelector(".thead colgroup").cloneNode(true); //자식요소까지 복사
		tbody.insertBefore(colgroup, tbody.firstChild);
	});

	// //팝업
	const wrap_pop = document.getElementsByClassName("wrap_pop");
	[].forEach.call(wrap_pop, item => {
		const btn_close = item.querySelectorAll(".btn_close")[0];
		btn_close.addEventListener("click", () => {
			body.classList.remove("no_scroll");
			item.classList.remove("show");
			window.scrollTo(0, scrollTop); 
			// item
		});
	});
});
const fnOpenPop = i =>{
	const body = document.getElementsByTagName("body")[0];
	const wrap_pop = document.getElementsByClassName("wrap_pop");
	const html = document.getElementsByTagName("html")[0];
	body.classList.add("no_scroll");
	[].forEach.call(wrap_pop, item => {
		// console.log(item.getElementsByClassName("bx_pop")[0].innerHeight);
		if(item.dataset.pop == i){
			item.classList.add("show");
			scrollTop = document.documentElement.scrollTop;
		}
	});
}

//앞뒤 공백 제거
const fnTrim = (target) => {
	return target.replace(/(^\s*)|(\s*$)/gi, "");
}
const fnRemoveAllClass = (el, nm) => {
	[].forEach.call(el, item => {
		item.classList.remove(nm);
	});
} 