"use strict";

// 하위 브라우저 호환
document.createElement("article");
document.createElement("section");
document.createElement("aside");
document.createElement("nav");
document.createElement("header");
document.createElement("footer");
document.createElement("main");
var scrollTop = 0;
document.addEventListener("DOMContentLoaded", function () {
  var body = document.getElementsByTagName("body")[0];
  var html = document.getElementsByTagName("html")[0];
  var uanaVigatorOs = navigator.userAgent;
  var AgentUserOs = uanaVigatorOs.replace(/ /g, '');
  AgentUserOs = AgentUserOs.toLowerCase();
  var checkOs = AgentUserOs.indexOf("iphone") == -1 ? -1 : 1;
  checkOs = AgentUserOs.indexOf("ipad") == -1 ? -1 : checkOs;
  checkOs = AgentUserOs.indexOf("mac") == -1 ? -1 : checkOs;

  if (checkOs == -1) {
    // body.classList.add("n_apple"); 
    html.classList.add("n_apple");
  }

  body.classList.remove("no_scroll");
  getInternetExplorerVersion(); //달력
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
  //셀랙트 박스 세팅

  var slct = document.getElementsByClassName("slct");
  [].forEach.call(slct, function (item) {
    var tit = item.getElementsByClassName("slct_tit")[0];
    var select = item.getElementsByClassName("slct_cont")[0].getElementsByClassName("select")[0];
    var li = item.getElementsByClassName("slct_cont")[0].getElementsByTagName("li");
    if (fnTrim(tit.innerText) === "") tit.innerText = select.innerHTML; //클릭 이벤트

    tit.addEventListener("click", function () {
      if (item.classList.contains("on") === true) {
        item.classList.remove("on");
      } else {
        fnRemoveAllClass(slct, "on");
        item.classList.add("on");
      }
    }); //셀렉트 요소 클릭

    [].forEach.call(li, function (temp) {
      temp.addEventListener("click", function () {
        fnRemoveAllClass(li, "select");
        tit.innerText = temp.innerText;
        temp.classList.add("select");
        item.classList.remove("on");
      });
    });
  });
  document.addEventListener("click", function (e) {
    var target = e.target.className !== "" ? slct[0].querySelector("." + e.target.className) : null;
    if (target === null) fnRemoveAllClass(slct, "on");
  }); //메뉴

  var btn_menu = document.getElementsByClassName("btn_menu")[0];
  var wrap_gnb = document.getElementsByClassName("wrap_gnb")[0];
  var btn_close = wrap_gnb.querySelectorAll(".btn_close")[0];
  var menu = wrap_gnb.getElementsByClassName("menu");
  btn_menu.addEventListener("click", function (e) {
    wrap_gnb.classList.add("show");
  });
  btn_close.addEventListener("click", function () {
    return wrap_gnb.classList.remove("show");
  });
  [].forEach.call(menu, function (item) {
    item.addEventListener("click", function () {
      if (item.classList.contains("on") === true) item.classList.remove("on");else {
        fnRemoveAllClass(menu, "on");
        if (item.parentNode.querySelectorAll("ul")[0] === undefined) return;
        item.classList.add("on");
      }
    });
  }); //테이블 셀 크기 세팅

  var wrap_tbl = document.getElementsByClassName("wrap_tbl");
  [].forEach.call(wrap_tbl, function (item) {
    var tbody = item.querySelector(".tbody .tbl");
    var colgroup = item.querySelector(".thead colgroup").cloneNode(true); //자식요소까지 복사

    tbody.insertBefore(colgroup, tbody.firstChild);
  }); // //팝업

  var wrap_pop = document.getElementsByClassName("wrap_pop");
  [].forEach.call(wrap_pop, function (item) {
    var btn_close = item.querySelectorAll(".btn_close")[0];
    btn_close.addEventListener("click", function () {
      body.classList.remove("no_scroll");
      item.classList.remove("show");
      window.scrollTo(0, scrollTop); // item
    });
  });
});

var fnOpenPop = function fnOpenPop(i) {
  var body = document.getElementsByTagName("body")[0];
  var wrap_pop = document.getElementsByClassName("wrap_pop");
  var html = document.getElementsByTagName("html")[0];
  body.classList.add("no_scroll");
  [].forEach.call(wrap_pop, function (item) {
    // console.log(item.getElementsByClassName("bx_pop")[0].innerHeight);
    if (item.dataset.pop == i) {
      item.classList.add("show");
      scrollTop = document.documentElement.scrollTop;
    }
  });
}; //앞뒤 공백 제거


var fnTrim = function fnTrim(target) {
  return target.replace(/(^\s*)|(\s*$)/gi, "");
};

var fnRemoveAllClass = function fnRemoveAllClass(el, nm) {
  [].forEach.call(el, function (item) {
    item.classList.remove(nm);
  });
}; // IE 하위 브라우저


var getInternetExplorerVersion = function getInternetExplorerVersion() {
  var html = document.getElementsByTagName("html")[0];
  var body = document.getElementsByTagName("body")[0];
  var rv = -1; // Return value assumes failure.

  if (navigator.appName != "Microsoft Internet Explorer") {
    return;
  } else {
    var ua = navigator.userAgent;
    var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
  }

  if (rv <= 10) {
    // IE브라우저 8버전 이하 시 ie_old 추가
    rv = 10;
    html.classList.add("ie");
    var newDiv = document.createElement("div");
    newDiv.classList.add("pop_ie");
    newDiv.innerHTML = '<div class="bx_pop alert"><div class="cont">' + '<p>해당 사이트는 최신 버전의<br>OS와 브라우저에 최적화되어 있습니다.<br>' + 'Edge, Crome 등 최신 브라우저를 설치해 주시기 바랍니다.<br><br>' + '<a href="https://www.google.com/intl/ko/chrome/">Crome 설치 페이지로 이동 ▶</a><br>' + '<a href="https://www.microsoft.com/ko-kr/edge/">Edge 설치 페이지로 이동 ▶</a>' + '</p></div></div>';
    body.appendChild(newDiv);
  }
};