"use strict";

// 하위 브라우저 호환
document.createElement("article");
document.createElement("section");
document.createElement("aside");
document.createElement("nav");
document.createElement("header");
document.createElement("footer");
document.createElement("main");
$(function () {
  $("body").removeClass("no_scroll");
  $(".ipt_date").datepicker({
    language: "ko"
  });
  $(".ipt_date.big_calendar").datepicker({
    language: "ko",
    classes: 'datepicker-big'
  });
  $(".ipt_date").focusout(function (e) {
    e.preventDefault();
    console.log($(this).val());
    $(this).val($.trim($(this).val()));
  }); //셀랙트 박스 세팅

  for (var i = 0; i < $(".slct").length; i++) {
    var target = $(".slct").eq(i);
    if ($.trim(target.find(".slct_tit").text()) === "") target.find(".slct_tit").text(target.find(".slct_cont .select").text());
  }

  $(".slct_tit").click(function () {
    if ($(this).parents(".slct").hasClass("on") === true) {
      $(this).parent().removeClass("on");
    } else {
      $(".slct").removeClass("on");
      $(this).parent().addClass("on");
    }
  });
  $(".slct_cont li").click(function () {
    $(this).parents(".slct").find(".slct_tit").text($(this).text());
    $(this).parent().find("li").removeClass("select");
    $(this).addClass("select");
    $(this).parents(".slct").removeClass("on");
  });
  $(document).click(function (e) {
    if (e.target.className === "slct" || e.target.className === "slct_tit" || e.target.className === "slct_cont") {
      return false;
    }

    $(".slct").removeClass("on");
  }); //메뉴

  $(".btn_menu").click(function () {
    $(".wrap_gnb").addClass("show");
  });
  $(".wrap_gnb .btn_close").click(function () {
    $(".wrap_gnb").removeClass("show");
  });
  $(".wrap_gnb .menu").click(function () {
    if ($(this).hasClass("on") === true) {
      $(this).removeClass("on");
    } else {
      $(".wrap_gnb .menu").removeClass("on");
      $(this).addClass("on");
    }
  }); //테이블 박스 세팅

  for (var i = 0; i < $(".wrap_tbl").length; i++) {
    var target = $(".wrap_tbl").eq(i);
    var colgroup = "<colgroup>" + target.find(".thead colgroup").html() + "</colgroup>";
    $(colgroup).prependTo(target.find(".tbody .tbl"));
  } //팝업


  $(".wrap_pop .btn_close").click(function () {
    $("body").removeClass("no_scroll");
    $(".wrap_pop").removeClass("show");
  });
}); //팝업

function fnOpenPop(i) {
  $("body").addClass("no_scroll");
  $("html").scrollTop(($(window).height() - $(".popup_area").outerHeight()) / 2 + $(window).scrollTop());
  $(".wrap_pop[data-pop=" + i + "]").addClass("show");
}