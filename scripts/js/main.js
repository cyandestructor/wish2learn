$(function () {
  "use strict";

  $(".js-menu-toggle").click(function (e) {
    var $this = $(this);

    if ($("body").hasClass("show-sidebar")) {
      $("body").removeClass("show-sidebar");
      $this.removeClass("active");
    } else {
      $("body").addClass("show-sidebar");
      $this.addClass("active");
    }

    e.preventDefault();
  });

  // click outisde offcanvas
  $(document).mouseup(function (e) {
    var container = $(".sidebar");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($("body").hasClass("show-sidebar")) {
        $("body").removeClass("show-sidebar");
        $("body").find(".js-menu-toggle").removeClass("active");
      }
    }
  });
});

function barraprogreso() {
  /*var div1 = document.getElementById("barraprog");
	var vervalor = div1.getAttribute("style");*/

  /*let element = document.getElementById('barraprog');
	let elementStyle = window.getComputedStyle(element);
	let elementWidth = elementStyle.getPropertyValue('width');
	alert(elementWidth); */

  let element = document.getElementById("barraprog");
  let elementStyle = window.getComputedStyle(element);
  let elementWidth = elementStyle.getPropertyValue("width");

  let element3 = document.getElementById("barraprog");
  let element4 = (element3.style.width = "calc(" + elementWidth + " + 50px)");
}
