/* The river in the left gutter.
 *
 * It is drawn at the page's real pixel height — not a stretched viewBox — so
 * the dash maths below maps exactly onto how far down the page you are. The
 * faint bed is the whole river; the blue one fills in as you read.
 *
 * The page is complete without this file: if it never runs, the gutter is
 * simply empty.
 */
(function () {
  var rail = document.querySelector(".rail");
  var svg = rail && rail.querySelector(".rail__river");
  var main = document.getElementById("main");
  if (!svg || !main) return;

  var bed = svg.querySelector(".rail__bed");
  var flow = svg.querySelector(".rail__flow");
  var length = 0;

  /** A meander down a column `w` wide and `h` tall, in page pixels. */
  function meander(w, h) {
    var cx = w / 2;
    var amp = Math.min(w * 0.42, 24);
    var bends = Math.max(1, Math.round(h / 430));
    var step = h / bends;
    var d = "M " + cx + " 0";

    for (var i = 0; i < bends; i++) {
      var dir = i % 2 ? -1 : 1;
      var y = i * step;
      d +=
        " C " +
        (cx + amp * dir) + " " + (y + step * 0.3) + " " +
        (cx - amp * dir) + " " + (y + step * 0.7) + " " +
        cx + " " + (y + step);
    }
    return d;
  }

  function draw() {
    var w = rail.offsetWidth;
    var h = main.offsetHeight;
    // Hidden on small screens, where offsetWidth is 0.
    if (!w || !h) return;

    svg.setAttribute("viewBox", "0 0 " + w + " " + h);
    var d = meander(w, h);
    bed.setAttribute("d", d);
    flow.setAttribute("d", d);

    length = flow.getTotalLength();
    flow.style.strokeDasharray = String(length);
    update();
  }

  function update() {
    if (!length) return;
    var box = main.getBoundingClientRect();
    // The water reaches a little below the middle of the screen, so the line
    // stays ahead of what you are reading rather than trailing it.
    var read = window.innerHeight * 0.62 - box.top;
    var p = Math.max(0, Math.min(1, read / box.height));
    flow.style.strokeDashoffset = String(length * (1 - p));
  }

  var queued = false;
  window.addEventListener(
    "scroll",
    function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        update();
        queued = false;
      });
    },
    { passive: true }
  );

  // The page grows when the Bengali webfonts land, so redraw on any change of
  // height rather than only on resize.
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(draw).observe(main);
  } else {
    window.addEventListener("resize", draw);
  }
  window.addEventListener("load", draw);
  draw();
})();
